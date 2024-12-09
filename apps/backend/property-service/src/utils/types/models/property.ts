// src/utils/types/models/property.ts
import { Types } from "mongoose";


export interface LocalizedContent {
  content: string;
  language: string;
}


export interface IProperty {
  _id: Types.ObjectId;
  coordinate: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  cognitoSub?: string;
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail?: string;
  images?: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location?: LocalizedContent[];
  price?: number;
  category?: LocalizedContent[];
  transition?: LocalizedContent[];
  detail?: Record<string, any>;
  status?: boolean;
  
}



export interface Property {
 
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
  sortBy?: string;       // Add sortBy
  sortOrder?: 'asc' | 'desc'; // Add sortOrder
}


