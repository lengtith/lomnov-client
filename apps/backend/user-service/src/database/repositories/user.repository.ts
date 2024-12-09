import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/src/utils/error/customErrors";
import {
  RequestUserDTO,
  ResponseFindUserBySubDTO,
  ResponseFindUserDTO,
  ResponseUpdateUserDTO,
  ResponseUserDTO,
  User,
  ViewUserProfileDTO,
} from "@/src/utils/types/indext";
import { UserModel } from "../models/user.model";
// =========================================================================


export class UserRepository {

  public async create(requestBody: RequestUserDTO): Promise<ResponseUserDTO> {
    try {
      const { cognitoSub, email, userName,profile,role } = requestBody;
      const usernameExist = await UserModel.find({ userName: userName });
      if (usernameExist.length > 0) {
        throw new ValidationError(" Username already existed");
      }
      // console.log("the best result" + req.user);
      if (!cognitoSub ||  !email || !userName|| !role) {
        throw new ValidationError(
          " CognitoSub , firstname, lastname and username are required!",
        );
      }
      const data = { cognitoSub, email,userName,profile,role };
      const response = await UserModel.create(data);
      return response;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new InternalServerError(error.message);
      }
    }
  }

  public async getMet(cognitoSub: string): Promise<ResponseUserDTO | null> {
    try {
      console.log(cognitoSub);
      const response = await UserModel.findOne({ cognitoSub: cognitoSub });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findUsername(username: string): Promise<ResponseUserDTO | {}> {
    try {
      const response = await UserModel.find({ userName: username });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findUsers(
    query: any,
    skip: number,
    limit: number,
  ): Promise<ResponseFindUserDTO> {
    try {
      const [users, totalUsers] = await Promise.all([
        UserModel.find(query).skip(skip).limit(limit).lean(), // Use lean for performance improvement
        UserModel.countDocuments(query),
      ]);

      if (!users || !totalUsers) {
        throw new NotFoundError("Users not found");
      }
      return { users, totalUsers };
    } catch (error: any) {
      throw error;
    }
  }

  public async findByCognitoSub(
    cognitoSub: string,
  ): Promise<ResponseFindUserBySubDTO | null> {
    try {
      const findUser = UserModel.findOne({ cognitoSub: cognitoSub }).exec();
      console.log("FindUser:: ", findUser);
      
      if(!findUser){
        return null;
      }
      return findUser;
    } catch (error) {
      throw error;
    }
  }

  public async updateUserByCognitoSub(
    cognitoSub: string,
    updateData: Partial<User>,
  ): Promise<ResponseUpdateUserDTO | null> {
    try {
      console.log("Updating user with cognitoSub:", cognitoSub);
      console.log("Update data:", updateData);
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { cognitoSub },
        { $set: updateData },
        { new: true },
      ).exec();
  
      if (!updatedUser) {
        throw new NotFoundError("User not found for update.");
      }
  
      console.log("Database successfully updated user:", updatedUser);
  
      return updatedUser;
    } catch (error) {
      console.error("Error in updateUserByCognitoSub:", error);
      throw error;
    }
  }  

  public async findUserFavorites(cognitoSub: string): Promise<any[]> {
    try {
      const user = await UserModel.findOne({ cognitoSub }).select("favorite").lean();
      if (!user || !user.favorite) {
        return [];
      }
      return user.favorite;
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      throw error;
    }
  }
  public async findViewProfileOfUser(cognitoSub: string): Promise<ViewUserProfileDTO>{
    try {
      const user = await UserModel.findOne({cognitoSub:cognitoSub}).select('-favorite -role');
      if(!user)
        throw new NotFoundError("Users not found");
      return user!;
    } catch (error) {
      throw error;
    }
  }
}
