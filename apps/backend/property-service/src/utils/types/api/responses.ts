import { LocalizedContent , IProperty  } from "../indext";
import { Types } from "mongoose";

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProperty: number;
}




export interface ResponsePropertyDTO {
  _id: Types.ObjectId;
  cognitoSub: string;
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[];
  price?: number;
  category: LocalizedContent[];
  transition: LocalizedContent[];
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;
  condanate?: IProperty[];
}
export interface ResponseCategoriesDTO{
  category:LocalizedContent[]
}
export interface ResponseFPropertiesByLanguageDTO {
  _id: Types.ObjectId
  cognitoSub: string
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



export interface ResponseCreatePropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
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
  condanate?: IProperty[];
}

export interface ResponseGetPropertyMeDTO {
  _id: Types.ObjectId
  cognitoSub: string
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
  faveMe?: ResponsePropertyDTO[]
}

export interface ResponseFindPropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
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


export interface ResponseUpdatePropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
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


export interface ResponseAllPropertyDTO {
  properties: ResponseCreatePropertyDTO[];
  pagination: Pagination;
}


export interface ResponseAllPropertyMeDTO {
  properties: ResponseCreatePropertyDTO[];
  favoritesMe:ResponsePropertyDTO[],
  pagination: Pagination;
}
export interface ResponsePropertyOwner{
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
export interface ResponsePropertyByID{
  _id: Types.ObjectId
  cognitoSub: string
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
  propertyOwner: ResponsePropertyOwner | null;
}

