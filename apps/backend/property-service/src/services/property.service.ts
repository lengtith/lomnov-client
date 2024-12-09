

import {
  RequestFPropertiesByLanguageDTO,
  RequestPropertyDTO,
  RequestQueryPropertyDTO,
  RequestUpdatePropertyDTO,
  ResponseAllPropertyDTO,
  ResponseCreatePropertyDTO,
  ResponseFPropertiesByLanguageDTO,
  ResponseUpdatePropertyDTO,
  RequestQueryPropertyMeDTO,
  ResponseAllPropertyMeDTO,
  ResponsePropertyDTO,
  ResponsePropertyByID,
  ResponseCategoriesDTO,
} from "@/src/utils/types/indext";
import { PropertyRepository } from "../database/repositories/property.repository";
import { NotFoundError, UnauthorizedError } from "../utils/error/customErrors";
import { UserServiceClient } from "./userServiceClient";
import { IProperty } from "@/src/utils/types/indext";
// ===============================================================================

export class PropertyService {
  private propertyRepository: PropertyRepository;
  private userServiceClient: UserServiceClient;
  constructor() {
    this.propertyRepository = new PropertyRepository();
    this.userServiceClient = new UserServiceClient();
  }

  public async createProperty(
    propertyData: RequestPropertyDTO,
    files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] }
  ): Promise<ResponseCreatePropertyDTO> {
    console.log("create properties service");
    try {
      return await this.propertyRepository.create(propertyData, files);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getProperties(
    queries: RequestQueryPropertyDTO
  ): Promise<ResponseAllPropertyDTO> {
    const { language, page = 1, limit = 12 } = queries;
    const skip = (page - 1) * limit;
    const filters = this.buildFilters(queries);

    const [properties, totalProperty] = await Promise.all([
      this.propertyRepository.findPropertiesMe(filters, skip, limit),
      this.propertyRepository.countPropertiesMe(filters),
    ]);

    const filteredProperties = language
      ? this.filterPropertiesByLanguage(properties, language)
      : properties;
    const totalPages = Math.ceil(totalProperty / limit);

    return {
      properties: filteredProperties,
      pagination: {
        currentPage: page,
        totalPages,
        totalProperty,
      },
    };
  }

  public async getPropertiesMe(
    queries: RequestQueryPropertyMeDTO
  ): Promise<ResponseAllPropertyMeDTO> {
    const { cognitoSub, language, page = 1, limit = 12, fav_me} = queries;

    if (!cognitoSub) {
      throw new UnauthorizedError();
    }

    const propertyFavouriteMe = await this.propertyRepository.findFavouritePropertyMe(fav_me);

    const skip = (page - 1) * limit;
    const filters = this.buildFilters(queries);
    // console.log("helo"+{...filters, cognitoSub})
    // Fetch data and count total properties
    const [properties, totalProperty] = await Promise.all([
      this.propertyRepository.findPropertiesMe(
        { ...filters, cognitoSub },
        skip,
        limit
      ),
      this.propertyRepository.countPropertiesMe({ ...filters, cognitoSub }),
    ]);

    const filteredProperties = language
      ? this.filterPropertiesByLanguage(properties, language)
      : properties;
    const totalPages = Math.ceil(totalProperty / limit);

    return {
      properties: filteredProperties,
      favoritesMe: propertyFavouriteMe,
      pagination: {
        currentPage: page,
        totalPages,
        totalProperty,
      },
    };
  }

  private buildFilters(
    queries: RequestQueryPropertyDTO
  ): Promise<ResponseAllPropertyDTO> {
    try {
      const {
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
      } = queries;
      const filters: any = {};

      if (
        cognitoSub ||
        title ||
        description ||
        address ||
        location ||
        category ||
        transition
      ) {
        if (typeof cognitoSub === "string") {
          filters["cognitoSub"] = cognitoSub;
        }
        if (typeof title === "string") {
          filters["title.content"] = { $regex: title, $options: "i" };
        }
        if (typeof description === "string") {
          filters["description.content"] = {
            $regex: description,
            $options: "i",
          };
        }
        if (typeof address === "string") {
          filters["address.content"] = { $regex: address, $options: "i" };
        }
        if (typeof location === "string") {
          filters["location.content"] = { $regex: location, $options: "i" };
        }
        if (typeof category === "string") {
          filters["category.content"] = { $regex: category, $options: "i" };
        }
        if (typeof transition === "string") {
          filters["transition.content"] = { $regex: transition, $options: "i" };
        }
      }

      if (price) {
        filters.price = price;
      } else {
        if (price_gte !== undefined) {
          filters.price = { ...filters.price, $gte: price_gte };
        }
        if (price_lte !== undefined) {
          filters.price = { ...filters.price, $lte: price_lte };
        }
      }
      if (language) {
        filters["title.language"] = language;
        filters["description.language"] = language;
        filters["address.language"] = language;
        filters["detail"] = {
          $elemMatch: {
            language: language,
          },
        };
      }
      return filters;
    } catch (error) {
      throw error;
    }
  }

  private filterPropertiesByLanguage(
    properties: RequestFPropertiesByLanguageDTO[],
    language: string
  ): ResponseFPropertiesByLanguageDTO[] {
    try {
      return properties.map((property) => ({
        ...property,
        title:
          property.title?.filter((t: any) => t.language === language) || [],
        description:
          property.description?.filter((d: any) => d.language === language) ||
          [],
        address:
          property.address?.filter((a: any) => a.language === language) || [],
        location:
          property.location?.filter((a: any) => a.language === language) || [],
        category:
          property.category?.filter((a: any) => a.language === language) || [],
        detail:
          property.detail?.filter(
            (detail: any) => detail.language === language
          ) || [],
        coordinate:
          property.coordinate
      }));
    } catch (error) {
      throw error;
    }
  }

  public async updateProperty(
    propertyId: string,
    propertyData: Partial<RequestUpdatePropertyDTO>,
    files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] },
    cognitoSub: string
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      const updatedProperty = await this.propertyRepository.update(
        propertyId,
        propertyData,
        files,
        cognitoSub
      );
      return updatedProperty;
    } catch (error) {
      console.error("Error in PropertyService.updateProperty:", error);
      throw new Error("Failed to update property");
    }
  }

  public async deleteProperty(
    propertyId: string,
    cognitoSub: string | undefined
  ): Promise<boolean> {
    try {
      return await this.propertyRepository.delete(propertyId, cognitoSub || "");
    } catch (error) {
      console.error("Error in PropertyService.deleteProperty:", error);
      throw new Error("Failed to delete property");
    }
  }

  // public async getPropertyByID(id: string): Promise<ResponsePropertyByID> {
  //   try {
  //     // Fetch property details
  //     const property = (await this.propertyRepository.findPropertyByID(
  //       id
  //     )) as ResponsePropertyDTO;
  //     //@ts-ignore
  //     //console.log({...property._doc});

  //     if (!property) {
  //       throw new Error(`Property with ID ${id} not found.`);
  //     }
  //     console.log("your property : " , property)

  //     // Fetch property owner details
  //     const propertyOwner = await this.userServiceClient.propertyOwnerInfo(
  //       property.cognitoSub as string
  //     );
  //     // Construct the response object
  //     const responses: ResponsePropertyByID = {
  //       //@ts-ignore
  //       ...property,
  //       propertyOwner,
  //     };
  //     console.log("Response Data:: ", responses)
  //     return responses;
  //   } catch (error) {
  //     console.error(`Error fetching property by ID ${id}:`, error);
  //     throw new Error(`Failed to fetch property with ID ${id}`);
  //   }
  // }
  public async getPropertyByID(id: string): Promise<ResponsePropertyByID> {
    try {
      // Fetch property details
      const property = await this.propertyRepository.findPropertyByID(id) as ResponsePropertyDTO;
  
      if (!property) {
        throw new Error(`Property with ID ${id} not found.`);
      }
      console.log("Fetched property:", property);
  
      // Fetch property owner details
      const propertyOwner = await this.userServiceClient.propertyOwnerInfo(property.cognitoSub as string);
  
      // Safely map the `detail` field if it exists
      const detailedContent = property.detail
        ? property.detail.map((detail : any) => ({
            language: detail.language,
            size: detail.content?.size ?? null,
            bedrooms: detail.content?.bedrooms ?? null,
            bathrooms: detail.content?.bathrooms ?? null,
          }))
        : [];
  
      // Construct the response object
      const response: ResponsePropertyByID = {
        ...property,
        detail: detailedContent, // Replace detail with mapped data (or empty array if undefined)
        propertyOwner,
      };
  
      console.log("Response Data:", response);
      return response;
    } catch (error) {
      console.error(`Error fetching property by ID ${id}:`, error);
  
      // Re-throw the error with more context
      throw new Error(`Failed to fetch property with ID ${id}`);
    }
  }
  

  public async getPropertyUser(
    cognitoSub: string,
    queries: RequestQueryPropertyDTO
  ): Promise<{
    properties: ResponsePropertyDTO[];
    totalPages: number;
    totalProperties: number;
  }> {
    try {
      console.log(cognitoSub);
      console.log(queries);

      // Retrieve user properties by cognitoSub
      const propertiesUser =
        await this.propertyRepository.findPropertyUserByCognitoSub(cognitoSub);

      if (!propertiesUser) {
        throw new NotFoundError(
          `No properties found for user with cognitoSub: ${cognitoSub}`
        );
      }

      // Extract pagination and filtering parameters
      const { language, page = 1, limit = 10 } = queries;
      const skip = (page - 1) * limit;

      const filters = {
        cognitoSub, // Restrict to the specific user
        ...this.buildFilters(queries), // Add other filters from the query
      };
      // Fetch paginated results and count total properties
      const [properties, totalProperties] = await Promise.all([
        this.propertyRepository.findPropertiesMe(filters, skip, limit),
        this.propertyRepository.countPropertiesMe(filters),
      ]);

      if (!properties.length) {
        throw new NotFoundError(
          "No properties found matching the provided criteria."
        );
      }

      // Apply language-specific filtering if necessary
      const filteredProperties = language
        ? this.filterPropertiesByLanguage(properties, language)
        : properties;

      // Calculate total pages
      const totalPages = Math.ceil(totalProperties / limit);

      // Return the paginated result
      return {
        properties: filteredProperties,
        totalPages,
        totalProperties,
      };
    } catch (error) {
      console.error(
        `Error retrieving properties for user with cognitoSub: ${cognitoSub}`,
        error
      );
      throw error;
    }
  }

  //==========this is get view==================

  // Method to increment the views of a property
  public async incrementPropertyViews(
    propertyId: string
  ): Promise<ResponsePropertyDTO> {
    try {
      // Call repository method to increment views
      const updatedProperty =
        await this.propertyRepository.incrementPropertyViews(propertyId);

      return updatedProperty;
    } catch (error) {
      // Handle error if property not found or other issues
      if (error instanceof NotFoundError) {
        throw new NotFoundError("Property not found");
      }
      throw error;
    }
  }

  // Method to get the total number of views for a property
  public async getPropertyViews(propertyId: string): Promise<number> {
    try {
      // Call repository method to get views count
      const views = await this.propertyRepository.getPropertyViews(propertyId);

      return views;
    } catch (error) {
      // Handle error if property not found or other issues
      if (error instanceof NotFoundError) {
        throw new NotFoundError("Property not found");
      }
      throw error;
    }
  }

 // Method to find nearby properties
 public async findNearbyProperties(
  coordinates: { lat: number; lng: number },
  maxDistance: number,
  limit: number = 10
): Promise<IProperty[]> {
  try {
    // Build geospatial filter
    const locationFilter = {
      coordinate: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat], // Longitude, Latitude
          },
          $maxDistance: maxDistance, // Maximum distance in meters
        },
      },
    };

    // Query repository for nearby properties
    const properties = await this.propertyRepository.findNearbyProperties(
      locationFilter,
      limit
    );

    return properties;
  } catch (error) {
    console.error("Error finding nearby properties:", error);
    throw new Error("Failed to fetch nearby properties");
  }
}

// Method to add coordinates to a property
public async addCoordinatesToProperty(
  propertyId: string,
  coordinates: { lat: number; lng: number }
): Promise<ResponsePropertyDTO | null> {
  try {
    const updatedProperty = await this.propertyRepository.addCoordinates(
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

  

  public async getCategories(): Promise <ResponseCategoriesDTO[]>{
    try {
      return await this.propertyRepository.getCategories();
    } catch (error) {
      throw error;
    }
  }
}
