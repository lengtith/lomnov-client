import { Types } from "mongoose";
export interface LocalizedContent {
    content: string;
    language: string;
  }
export interface RequestPropertyClientQuery{
    page?:number | undefined;
    limit?:string | undefined;
    language?:string | undefined;
}
export interface ResponsePropertyDTO {
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
export interface ReponsePaginationProperyDTO{
    properties: ResponsePropertyDTO[]; 
    totalPages: number; 
    totalProperties: number 
}