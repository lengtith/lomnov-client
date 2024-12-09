
import configs from "@/src/config";
import { UserRepository } from "@/src/database/repositories/user.repository";
import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
import { NotFoundError, UnauthorizedError } from "@/src/utils/error/customErrors";
import { DeleteProfileImageRequestDTO, GetAllUsersQueryDTO, RequestUserDTO, ResponseAllUserDTO, ResponseUserDTO, ResponseViewUserProfileDTO, UpdateUserDTO, User, ViewUserProfileDTO } from "@/src/utils/types/indext";

import { Types } from "mongoose";
import { HttpPropertyServiceClient } from "./httpPropertyServiceClient";
import { RequestPropertyClientQuery } from "../utils/types/api/property_client";
// import { HttpPropertyServiceClient } from "./httpPropertyServiceClient";


declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // Define the structure of cookies
    }
  }
}

export class UserService {
  private userRepository: UserRepository;
  private httpPropertiesServiceClient: HttpPropertyServiceClient;
  constructor() {
    this.userRepository = new UserRepository();
    this.httpPropertiesServiceClient = new HttpPropertyServiceClient(configs.apiGateWayUrl, configs.propertyServiceEndPiont)
  }

  public async createUser(
    requestBody: RequestUserDTO
  ): Promise<ResponseUserDTO> {
    try {
      return await this.userRepository.create(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers(
    queries: GetAllUsersQueryDTO,
  ): Promise<ResponseAllUserDTO | undefined> {
    try {
      const query = {
        ...(queries.firstName && {
          firstName: { $regex: queries.firstName, $options: "i" },
        }),
        ...(queries.lastName && {
          lastName: { $regex: queries.lastName, $options: "i" },
        }),
        ...(queries.userName && {
          userName: { $regex: queries.userName, $options: "i" },
        }),
        ...(queries.role && { role: queries.role }),
      };
      const skip = (queries.page - 1) * queries.limit;
      const { users, totalUsers } = await this.userRepository.findUsers(
        query,
        skip,
        queries.limit,
      );
      const totalPages = Math.ceil(totalUsers / queries.limit);
      return {
        users,
        pagination: {
          currentPage: queries.page,
          totalPages,
          totalUsers,
        },
      };
    } catch (error) {
      throw error
    }
  }

  public async getMe(request: Express.Request): Promise<ResponseUserDTO | null> {
    try {
      const cognitoSub = request.cookies?.username;
      console.log(cognitoSub)
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      return await this.userRepository.getMet(cognitoSub)
    } catch (error) {
      throw error
    }
  }

  public async usernameExsit(username: string): Promise<ResponseUserDTO | {}> {
    try {
      return await this.userRepository.findUsername(username);
    } catch (error) {
      throw error
    }
  }


  public async updateUser(data: UpdateUserDTO): Promise<ResponseUserDTO | undefined> {
    try {
      const { request, profileFiles = [], backgroundFiles = [], ...updateFields } = data;
      const cognitoSub = request.cookies?.username;
  
      if (!cognitoSub) {
        throw new UnauthorizedError("User is not authenticated.");
      }
  
      const existingUser = await this.userRepository.findByCognitoSub(cognitoSub);
      if (!existingUser) {
        throw new Error("User not found.");
      }
  
      const updateData: Partial<User> = { ...updateFields };
  
      if (profileFiles.length > 0) {
        console.log("Profile files received:", profileFiles);
        const profileUrls = await Promise.all(
          profileFiles.map((file: any) => uploadFileToS3Service.uploadFile(file)),
        );
        updateData.profile = [...new Set([...(existingUser.profile || []), ...profileUrls])];
      }
  
      if (backgroundFiles.length > 0) {
        console.log("Background files received:", backgroundFiles);
        const backgroundUrls = await Promise.all(
          backgroundFiles.map((file: any) => uploadFileToS3Service.uploadFile(file)),
        );
        updateData.background = [...new Set([...(existingUser.background || []), ...backgroundUrls])];
      }
  
      const updatedUser = await this.userRepository.updateUserByCognitoSub(cognitoSub, updateData);
  
      if (!updatedUser) {
        throw new Error("Error updating user.");
      }
  
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  public async deleteProfileImageByIndex(data: DeleteProfileImageRequestDTO): Promise<void> {
    const { profileId, request } = data;
    const cognitoSub = request.cookies?.username;
    if (!cognitoSub) {
      throw new UnauthorizedError();
    }
    const existingUser = await this.userRepository.findByCognitoSub(cognitoSub);
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (!existingUser.profile || profileId < 0 || profileId >= existingUser.profile.length) {
      throw new Error("Invalid index");
    }

    // Get the profile URL at the specified index
    const profileUrl = existingUser.profile[profileId];

    // Extract the S3 key from the profile URL
    const s3Key = profileUrl.split(`${configs.awsS3BucketName}.s3.${configs.awsS3Region}.amazonaws.com/`)[1];

    // Delete the file from S3
    await uploadFileToS3Service.deleteFile(s3Key);

    // Remove the URL from the user's profile array
    const updatedBackground = existingUser.profile.filter((_, i) => i !== profileId);

    // Update the user profile array in the database
    await this.userRepository.updateUserByCognitoSub(cognitoSub, { profile: updatedBackground });
  }

  public async deleteBackgroundImageByIndex(request: Express.Request, index: number): Promise<void> {
    try {

      const cognitoSub = request.cookies?.username;
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      const existingUser = await this.userRepository.findByCognitoSub(cognitoSub);
      console.log(existingUser)
      if (!existingUser) {
        throw new Error("User not found");
      }
      if (!existingUser.background || index < 0 || index >= existingUser.background.length) {
        throw new Error("Invalid index");
      }
      // Get the profile URL at the specified index
      const backgroundUrl = existingUser.background[index];

      // Extract the S3 key from the profile URL
      const s3Key = backgroundUrl.split(`${configs.awsS3BucketName}.s3.${configs.awsS3Region}.amazonaws.com/`)[1];

      // Delete the file from S3
      await uploadFileToS3Service.deleteFile(s3Key);

      // Remove the URL from the user's profile array
      const updatedBackground = existingUser.background.filter((_, i) => i !== index);

      // Update the user profile array in the database
      await this.userRepository.updateUserByCognitoSub(cognitoSub, { background: updatedBackground });
    } catch (error: any) {
      throw error
    }
  }

  public async toggleFavorite(
    request: Express.Request,
    propertyId: Types.ObjectId,
  ): Promise<ResponseUserDTO | null> {
    try {
      const cognitoSub = request.cookies?.username;
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }

      const user = await this.userRepository.findByCognitoSub(cognitoSub);
      if (!user) {
        throw new Error("User not found");
      }

      // Ensure the favorite array is initialized
      user.favorite = user.favorite || [];

      // Check if the propertyId is already in the favorites
      const existingFavoriteIndex = user.favorite.findIndex(fav => fav.propertyId?.equals(propertyId));

      if (existingFavoriteIndex > -1) {
        // Remove the property from favorites if it exists
        user.favorite.splice(existingFavoriteIndex, 1);
      } else {
        // Add the propertyId to the favorite array if it doesn't already exist
        user.favorite.push({ propertyId: propertyId, addedAt: new Date() });
      }

      return this.userRepository.updateUserByCognitoSub(cognitoSub, { favorite: user.favorite });
    } catch (error) {
      throw error;
    }
  }
  public async getUserFavoritesID(request: Express.Request): Promise<string[] | null> {
    try {
      const cognitoSub = request.cookies?.username;
      if (!cognitoSub) {
        throw new UnauthorizedError("User is not logged in.");
      }
      const favorites = await this.userRepository.findUserFavorites(cognitoSub);
      console.log(favorites);

      if (favorites.length === 0) {
        return []; // No favorites found
      }
      const favoritesId = favorites.map(favId => favId.propertyId);
      return favoritesId;
    } catch (error) {
      console.error("Error retrieving user favorites:", error);
      throw error;
    }
  }
  public async getProperyOwnerProfile(congnitoSub: string, queries: RequestPropertyClientQuery)
    : Promise<ResponseViewUserProfileDTO | any> {
    try {
      const existingUser = await this.userRepository.findByCognitoSub(congnitoSub);

      if (!existingUser)
        return new NotFoundError("User not found!")
      const response = {} as ResponseViewUserProfileDTO;
      const profile = await this.userRepository.findViewProfileOfUser(congnitoSub);
      const propertiesResponses = await this.httpPropertiesServiceClient.getPropertyUser(congnitoSub, queries);
      const { properties, totalProperties, totalPages } = propertiesResponses;
      response.properties = properties;
      response.totalProperties = totalProperties!;
      response.totalPages = totalPages!;
      response.user = profile;
      return response;
    } catch (error) {
      throw error;
    }
  }
  public async getProperyOwnerInfo(cognitoSub: string): Promise<ViewUserProfileDTO | null> {
    try {
      const existingUser = await this.userRepository.findByCognitoSub(cognitoSub);
      if (!existingUser){
        return null;
      }
      return await this.userRepository.findViewProfileOfUser(cognitoSub);
    } catch (error) {
      throw error;
    }
  }
}