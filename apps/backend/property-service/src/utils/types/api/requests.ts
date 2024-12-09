import { LocalizedContent , IProperty} from "../indext";
import {Types} from "mongoose"

export interface RequestPropertyDTO {
  cognitoSub: string,
  title: Array<{ content: string; language: string }>;
  description: Array<{ content: string; language: string }>;
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address: Array<{ content: string; language: string }>;
  location: Array<{ content: string; language: string }>;
  price?: number;
  category: Array<{ content: string; language: string }>,
  transition: Array<{ content: string; language: string }>,
  detail?: Array<{ language: string; content: { [key: string]: string } }>,
  status?: boolean | string;
  coordinate?:Array<{types: string; coordinates: number[]}>;

}

export interface RequestQueryPropertyDTO {
  cognitoSub: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  address?: string;
  location?: string;
  category?: string;
  transition?: string;
  price?: number | undefined;
  language?: string | undefined;
  price_gte?: number | undefined;
  price_lte?: number | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface RequestQueryPropertyMeDTO {
  cognitoSub: string;
  title?: string | undefined;
  description?: string | undefined;
  address?: string;
  location?: string;
  category?: string;
  transition?: string;
  price?: number | undefined;
  language?: string | undefined;
  price_gte?: number | undefined;
  price_lte?: number | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  fav_me?: string | undefined;
}

export interface RequestUpdatePropertyDTO {
  title?: Array<{ content: string; language: string }>;
  description?: Array<{ content: string; language: string }>;
  thumbnail?: string;
  images?: string[];
  urlmap?: string;
  address?: Array<{ content: string; language: string }>;
  location?: Array<{ content: string; language: string }>;
  price?: number;
  category?: Array<{ content: string; language: string }>,
  transition?: Array<{ content: string; language: string }>,
  detail?: Array<{ language: string; content: { [key: string]: string } }>,
  status?: boolean;
  coordinate?:Array<{type: string; coordinates: number[]}>;
}
export interface RequestFPropertiesByLanguageDTO {
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
  coordinate?: IProperty[];
}
