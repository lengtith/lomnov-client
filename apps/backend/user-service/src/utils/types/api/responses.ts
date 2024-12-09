import { Types } from "mongoose";
import { FavoriteItem } from "../indext";
import {ResponsePropertyDTO } from "./property_client";
export interface ResponseUserDTO {
  _id: Types.ObjectId;
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
  favorite?: FavoriteItem[];
  role?: string;
}

export interface ResponseFindUserBySubDTO {
  _id: Types.ObjectId;
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
  favorite?: FavoriteItem[];
  role?: string;
}

export interface ResponseUpdateUserDTO {
  _id: Types.ObjectId;
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
  favorite?: FavoriteItem[];
  role?: string;
}

interface PaginationDTO {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export interface ResponseAllUserDTO {
  users: ResponseUserDTO[];
  pagination: PaginationDTO;
}

export interface ResponseFindUserDTO {
  users: ResponseUserDTO[];
  totalUsers: number;
}

export interface UpdateUserDTO {
  request: Express.Request;
  profileFiles?: Express.Multer.File[];
  backgroundFiles?: Express.Multer.File[];
  firstName?: string;
  lastName?: string;
  userName?: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
}

// Response DTO
export interface DeleteProfileImageResponseDTO {
  message: string;
}

export interface FavoriteResponseDTO {
  message: string;
  user: ResponseUserDTO | null;
}

export interface ResponseUsernameExist {
  usernameExist: boolean;
}
export interface ViewUserProfileDTO {
  _id: Types.ObjectId;
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
}
export interface LocalizedContent {
  content: string;
  language: string;
}

export interface ViewUserPropertiesDTO {
  cognitoSub: string,
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;
}
export interface ResponseViewUserProfileDTO {
  user: ViewUserProfileDTO;
  properties: ResponsePropertyDTO[]; 
  totalPages: number; 
  totalProperties: number 
}