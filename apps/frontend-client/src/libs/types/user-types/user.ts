import { RealEstateItem } from "../api-properties/property-response";

export interface User {
  _id: string // or maybe propertyId
  user: string;
  [x: string]: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  location: string;
  address: string;
  phone: string;
  
}
export interface VisitUserProfileType{
  _id: string;
  cognitoSub:string;
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
  createdAt: string;
  updatedAt:string;
}
export interface VisitProfileHeaderProps {
  user?:VisitUserProfileType;
  properties?:RealEstateItem[];
  totalPages?: number; 
  totalProperties?: number 
}