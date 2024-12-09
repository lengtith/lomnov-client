// UserRequest.ts
import { Types } from "mongoose";
export interface FavoriteItem {
  propertyId: Types.ObjectId | undefined ;
  addedAt: Date | undefined;
}

export interface User {
  cognitoSub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  phoneNumber?: string;
  location?: string;
  address?: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  profile?: string[];
  background?: string[];
  favorite?: FavoriteItem[] | undefined;
  role?: string;
}
