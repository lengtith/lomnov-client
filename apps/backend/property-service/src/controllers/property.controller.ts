import {
  Controller,
  Post,
  Delete,
  Route,
  UploadedFile,
  UploadedFiles,
  FormField,
  Get,
  Query,
  Body,
  Put,
  Path,
  Tags,
  Request,
  Queries,
} from "tsoa";
import { IProperty } from "@/src/utils/types/indext";
import { PropertyService } from "@/src/services/property.service";
import { RequestPropertyDTO, RequestQueryPropertyDTO, RequestUpdatePropertyDTO, ResponseAllPropertyDTO, ResponseCreatePropertyDTO, ResponsePropertyDTO, ResponseUpdatePropertyDTO } from "@/src/utils/types/indext";
import { Request as Express } from "express";

import { NotFoundError, UnauthorizedError } from "@/src/utils/error/customErrors";
// ====================================================================

declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // Define the structure of cookies
    }
  }
}

@Tags("Property Service")
@Route("api/v1")
export class PropertyController extends Controller {

  private propertyService: PropertyService;
  constructor() {
    super();
    this.propertyService = new PropertyService();
  }

  @Post("/properties")
  public async createProperty(
    @UploadedFile() thumbnail: Express.Multer.File,
    @UploadedFiles() images: Express.Multer.File[],
    @FormField() title: string,
    @FormField() description: string,
    @FormField() urlmap?: string,
    @FormField() address?: string,
    @FormField() location?: string,
    @FormField() price?: number,
    @FormField() category?: string,
    @FormField() transition?: string,
    @FormField() detail?: string,
    @Request() request?: Express.Request
  ): Promise<ResponseCreatePropertyDTO> {
    console.log('Thumbnail:', thumbnail);  // Add a log to check if the file is received
    console.log('Images:', images);        // Log images array
    console.log('description:', description);        // Log images array
    console.log('location:', location);        // Log images array
    console.log("Price::", price);

    try {

      const cognitoSub = request?.cookies.username!;
      console.log(cognitoSub);

      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      const propertyData: RequestPropertyDTO = {
        cognitoSub,
        title: JSON.parse(title),
        description: JSON.parse(description),
        thumbnail: "",
        images: [],
        urlmap,
        location: location ? JSON.parse(location) : [],
        address: address ? JSON.parse(address) : [],
        price,
        category: category ? JSON.parse(category) : [],
        transition: transition ? JSON.parse(transition) : [],
        detail: detail ? JSON.parse(detail) : [],
      };
      return await this.propertyService.createProperty(propertyData, {
        thumbnail,
        images,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  @Get("/properties")
  public async getProperty(
    @Query() cognitoSub?: string,
    @Query() title?: string,
    @Query() description?: string,
    @Query() address?: string,
    @Query() location?: string,
    @Query() category?: string,
    @Query() transition?: string,
    @Query() price?: number,
    @Query() language?: string,
    @Query() price_gte?: number,
    @Query() price_lte?: number,
    @Query() page: number = 1,
    @Query() limit: number = 12,
    // @Request() request?: Express.Request
  ): Promise<ResponseAllPropertyDTO> {
    try {
      // const cognitoSub = request?.cookies.username!
      const queries = {
        cognitoSub,
        title,
        description,
        address,
        location,
        category,
        transition,
        price,
        language,
        price_gte,
        price_lte,
        page,
        limit,
      };
      return await this.propertyService.getProperties(queries);
    } catch (error) {
      throw error
    }
  }
  // Get Detail
  // Controller get single
  @Get("/properties/get/{propertyId}")
  public async fetchPropertyByID(@Path() propertyId: string): Promise<ResponsePropertyDTO> {
    try {
      const data = await this.propertyService.getPropertyByID(propertyId);
      console.log("This is Your Data : " ,data.detail)
      return data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

//  @Get("/properties/get/{proertyIdDetail}")
//  public async fetchPropertyByIDdetail(@Path() propertyId : string): Promise<ResponsePropertyDTO> {
//   try {
//     const data = await this.propertyService.getPropertyByID(propertyId);
//     console.log("This is Your Data : " ,data.detail)
//     return data.detail;
//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
//  }


  @Get("/properties/me")
  public async getPropertyMe(
    @Query() title?: string,
    @Query() description?: string,
    @Query() address?: string,
    @Query() location?: string,
    @Query() category?: string,
    @Query() transition?: string,
    @Query() price?: number,
    @Query() language?: string,
    @Query() price_gte?: number,
    @Query() price_lte?: number,
    @Query() page: number = 1,
    @Query() limit: number = 12,
    @Query() fav_me?: string,
    @Request() request?: Express.Request,
  ): Promise<ResponseAllPropertyDTO> {
    try {
      const cognitoSub = request?.cookies.username!
      if (!cognitoSub) {
        throw new UnauthorizedError()
      }
      const queries = {
        cognitoSub,
        title,
        description,
        address,
        location,
        category,
        transition,
        price,
        language,
        price_gte,
        price_lte,
        page,
        limit,
        fav_me
      };

      return await this.propertyService.getPropertiesMe(queries);
    } catch (error) {
      throw error
    }
  }

  @Put("/properties/me/{propertyId}")
  public async updateProperty(
    @Path() propertyId: string,
    @UploadedFile() thumbnail?: Express.Multer.File,
    @UploadedFiles() images?: Express.Multer.File[],
    @FormField() title?: string, // Assuming these are passed as JSON strings
    @FormField() description?: string,
    @FormField() urlmap?: string,
    @FormField() address?: string,
    @FormField() location?: string,
    @FormField() category?: string,
    @FormField() transition?: string,
    @FormField() price?: number,
    @FormField() detail?: string,
    @FormField() status?: boolean,
    @Request() request?: Express.Request,
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      const cognitoSub = request?.cookies.username!
      if (!cognitoSub) {
        throw new UnauthorizedError()
      }
      // Parsing JSON strings to objects
      const parsedTitle = title ? JSON.parse(title) : undefined;
      const parsedDescription = description
        ? JSON.parse(description)
        : undefined;
      const parseLocation = location ? JSON.parse(location) : undefined;
      const parseCategory = category ? JSON.parse(category) : undefined;
      const parseTransition = transition ? JSON.parse(transition) : undefined;
      const parsedDetail = detail ? JSON.parse(detail) : undefined;
      const parsedAddress = address ? JSON.parse(address) : undefined;

      // Construct property data object
      const propertyData: Partial<RequestUpdatePropertyDTO> = {
        title: parsedTitle,
        description: parsedDescription,
        urlmap,
        address: parsedAddress,
        location: parseLocation,
        price,
        category: parseCategory,
        transition: parseTransition,
        detail: parsedDetail,
        status,
      };

      return await this.propertyService.updateProperty(
        propertyId,
        propertyData,
        { thumbnail, images },
        cognitoSub
      );
    } catch (error) {
      throw error
    }
  }

  @Delete("/properties/me/{propertyId}")
  public async deleteProperty(
    @Path() propertyId: string,
    @Request() request?: Express.Request
  ): Promise<{ message: string }> {
    try {
      const cognitoSub = request?.cookies.username;
      const result = await this.propertyService.deleteProperty(propertyId, cognitoSub);
      return { message: result ? "Delete successfully" : "Property not found" };
    } catch (error) {
      console.error("Error in deleteProperty:", error);
      this.setStatus(500);
      throw new Error("Failed to delete property");
    }
  }

  //this method for post view user 

  @Put("/properties/{propertyId}/views")
  public async incrementPropertyViews(@Path() propertyId: string): Promise<ResponsePropertyDTO> {
    console.log("Incrementing views for property ID:", propertyId); // Debugging line
    try {
      return await this.propertyService.incrementPropertyViews(propertyId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.setStatus(404);
      } else {
        this.setStatus(500);
      }
      throw error;
    }
  }


  @Get("/properties/{propertyId}/views")
  public async getPropertyViews(
    @Path() propertyId: string
  ): Promise<{ views: number }> {
    try {
      const views = await this.propertyService.getPropertyViews(propertyId);
      return { views };
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.setStatus(404);
      } else {
        this.setStatus(500);
      }
      throw error;
    }
  }

  @Get("/properties/user/{cognitoSub}")
  public async getPropertyUser(@Path() cognitoSub: string, @Queries() queries: RequestQueryPropertyDTO): Promise<{ properties: ResponsePropertyDTO[]; totalPages: number; totalProperties: number }> {
    try {
      return await this.propertyService.getPropertyUser(cognitoSub, queries);
    } catch (error) {
      throw error;
    }
  }

  //endpoint for find nearly location
  @Post("/properties/{propertyId}/coordinates")
  public async addCoordinatesToProperty(
    @Path() propertyId: string,
    @Body() coordinates: { lat: number; lng: number }
  ): Promise<ResponsePropertyDTO> {
    try {
      const updatedProperty = await this.propertyService.addCoordinatesToProperty(
        propertyId,
        coordinates
      );

      if (!updatedProperty) {
        throw new NotFoundError("Property not found");
      }

      return updatedProperty;
    } catch (error) {
      console.error("Error adding coordinates to property:", error);
      throw error;
    }
  }



  @Get("/properties/nearby")
  public async findNearbyProperties(
    @Query() lat: number = 0,
    @Query() lng: number = 0,
    @Query() maxDistance: number = 1000, // Default 1km
    @Query() limit: number = 10 // Default limit
  ): Promise<ResponsePropertyDTO[]> {
    try {
      if (lat === 0 || lng === 0) {
        throw new Error("Invalid latitude or longitude. Both 'lat' and 'lng' must be provided.");
      }

      const nearbyProperties: IProperty[] = await this.propertyService.findNearbyProperties(
        { lat, lng },
        maxDistance,
        limit
      );

      console.log("Raw Nearby Properties:", nearbyProperties);

      const responseProperties: ResponsePropertyDTO[] = nearbyProperties.map((property) => ({
        _id: property._id,
        cognitoSub: property.cognitoSub || "",
        title: property.title || [],
        description: property.description || [],
        thumbnail: property.thumbnail || "",
        images: property.images || [],
        urlmap: property.urlmap || "",
        address: property.address || [],
        location: property.location || [],
        price: property.price,
        category: property.category || [],
        transition: property.transition || [],
        detail: property.detail || {},
        status: property.status,

      }));

      return responseProperties;
    } catch (error) {
      console.error("Error finding nearby properties:");
      throw new Error("Failed to fetch nearby properties. Please try again.");
    }
  }

  /**
   * This method use for responses only category 
   */
  @Get("/properties/category")
  public async getCategories() {
    try {
      return await this.propertyService.getCategories();
    } catch (error) {
      throw error;
    }
  }
}
