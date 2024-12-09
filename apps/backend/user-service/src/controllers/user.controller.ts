import {
  Controller,
  Route,
  Post,
  Body,
  Request,
  Get,
  Query,
  Put,
  UploadedFiles,
  FormField,
  Delete,
  Path,
  Tags,
  Queries,
} from "tsoa";
import { Types } from "mongoose";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
  DeleteProfileImageResponseDTO,
  FavoriteResponseDTO,
  ResponseUsernameExist,
  ViewUserProfileDTO,
} from "@/src/utils/types/indext";
import { UserService } from "@/src/services/user.service";
import { UnauthorizedError } from "../utils/error/customErrors";
import { RequestPropertyClientQuery } from "../utils/types/api/property_client";


// =========================================================

@Tags(" User service")
@Route("api/v1/users")
export class UserController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("/")
  public async register(
    @Body() requestBody: RequestUserDTO,
  ): Promise<ResponseUserDTO> {
    try {
      const response = await this.userService.createUser(requestBody);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get("/")
  public async getAllUser(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() firstName?: string,
    @Query() lastName?: string,
    @Query() userName?: string,
    @Query() role?: string,
  ): Promise<ResponseAllUserDTO | undefined> {
    try {
      const queries: GetAllUsersQueryDTO = {
        page,
        limit,
        firstName,
        lastName,
        userName,
        role,
      };
      return await this.userService.getAllUsers(queries);
    } catch (error) {
      throw error;
    }
  }

  @Get("/username/{username}")
  public async findUsernameExite(
    @Path() username: string,
  ): Promise<ResponseUsernameExist> {
    try {
      const response = await this.userService.usernameExsit(username);
      if (response && Object.keys(response).length > 0) {
        return { usernameExist: true };
      }
      return { usernameExist: false };
    } catch (error) {
      throw error;
    }
  }

  @Get("/me")
  public async getMe(
    @Request() request: Express.Request,
  ): Promise<ResponseUserDTO | null> {
    try {
      const response = await this.userService.getMe(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put("/me")
public async updateMe(
  @Request() request: Express.Request,
  @UploadedFiles() profileFiles?: Express.Multer.File[],
  @UploadedFiles() backgroundFiles?: Express.Multer.File[], 
  @FormField() firstName?: string,
  @FormField() lastName?: string,
  @FormField() userName?: string,
  @FormField() phoneNumber?: string,
  @FormField() address?: string,
  @FormField() gender?: string,
  @FormField() dateOfBirth?: string,
  @FormField() location?: string,
): Promise<ResponseUserDTO | undefined> {
  try {
    console.log("Request payload received in updateMe:", {
      firstName,
      lastName,
      userName,
      phoneNumber,
      address,
      gender,
      dateOfBirth,
      location,
    });

    const updateData = {
      firstName,
      lastName,
      userName,
      phoneNumber,
      address,
      location,
      gender,
      dateOfBirth,
      request,
      profileFiles: profileFiles || [],
      backgroundFiles: backgroundFiles || [],
    };

    console.log("Data being sent to updateUser service:", updateData);

    return await this.userService.updateUser(updateData);
  } catch (error) {
    console.error("Error in updateMe controller:", error);
    throw error;
  }
}

  @Delete("/my-profile/{profileId}")
  public async deleteMyProfile(
    @Path() profileId: number,
    @Request() request: Express.Request,
  ): Promise<DeleteProfileImageResponseDTO> {
    try {
      const requestDTO = {
        request, // Replace this with actual logic to get cognitoSub
        profileId,
      };
      await this.userService.deleteProfileImageByIndex(requestDTO);
      return { message: "Profile image deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  @Delete("/my-background/{backgroundId}")
  public async deleteMyBackground(
    @Path() backgroundId: number,
    @Request() request: Express.Request,
  ): Promise<{ message: string }> {
    try {
      await this.userService.deleteBackgroundImageByIndex(
        request,
        backgroundId,
      );
      return { message: "Background image deleted successfully" };
    } catch (error) {
      console.error("Error deleting background image:", error);
      throw error;
    }
  }



  @Put("/favorite/{propertyId}")
  public async toggleFavorite(
    @Path() propertyId: Types.ObjectId,
    @Request() request: Express.Request,
  ): Promise<FavoriteResponseDTO | null> {
    try {
      const updatedUser = await this.userService.toggleFavorite(request, propertyId);
      const action = updatedUser?.favorite?.some(fav => fav.propertyId?.equals(propertyId))
        ? "added to"
        : "removed from";
      return { message: `Property ${action} favorites`, user: updatedUser };
    } catch (error) {
      throw error;
    }
  }
  @Get("/me/favorites")
  public async getUserFavorites(@Request() request: Express.Request): Promise<any> {
    try {

      const cognitoSub = request?.cookies.username!
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      const favoritesId = await this.userService.getUserFavoritesID(request);
      console.log(favoritesId);

      return {
        message: "Favorite properties retrieved successfully",
        favoritesId: favoritesId
      };
    } catch (error) {
      console.error("Error fetching user's favorite properties:", error);
      throw error;
    }
  }
  /**
   * 
   */
  @Get("/profile-user/{cognitoSub}")
  public async getProfileUser(@Path() cognitoSub: string, @Queries() queries: RequestPropertyClientQuery): Promise<ResponseUserDTO | null> {
    try {
      const responses = await this.userService.getProperyOwnerProfile(cognitoSub, queries);
      console.log(responses);

      return responses
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
  @Get("/profile-info/{cognitoSub}")
  public async getPropertyOwnerInfo(@Path() cognitoSub: string): Promise<ViewUserProfileDTO | null> {
    try {
      const res = await this.userService.getProperyOwnerInfo(cognitoSub);

      if (!res) {
        console.log("controller: ", res);
        return null;
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  // @Post("me/favorite")
  // public async addFavorite(
  //   @Request() request: Express.Request,
  //   @Body() body: {propertyId: string}
  // ): Promise<FavoriteResponseDTO>{
  //    try {
  //       const userId = request.cookies['user_id'];
  //       const {propertyId} = body;

  //       const  response = await UserService.addFavorite(userId,propertyId);

  //       return sendRespone<IUser>({
  //          message: "Favarite added successfully",
  //          data: response,
  //       });
  //    } catch (error) {
  //       console.error(
  //          `UserController - addFavorite() method error`,
  //          prettyObject(error as {})
  //       );
  //       throw error;

  //    }
  // }

  // @Delete("/me/favorite")
  // public async getFavorite(
  //   @Request() request: ExpressRequest
  // ): Promise<{message: String; data: string[]}>{
  //    try {
  //     const userId = request.cookies["user_id"];
  //     const favorites await UserService.getUserFavorite(userId);

  //     return sendRespone<string[]>({message: "Successs", data : favarite});

  //    } catch (error) {
  //       console.error(
  //         `UserController - getFavorite() method error` ,
  //         prettyObject(error as {})
  //       );
  //       throw error;

  //    }
  // }

}
