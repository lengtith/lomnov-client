import axios from "axios";
import { ReponsePaginationProperyDTO, RequestPropertyClientQuery} from "../utils/types/api/property_client";
export class HttpPropertyServiceClient {
  private gateWayBaseUrl: string;
  private propertyServiceEndPoint:string;
  constructor(gateWayBaseUrl:string,propertyServiceEndPoint:string) {
    this.gateWayBaseUrl = gateWayBaseUrl
    this.propertyServiceEndPoint = propertyServiceEndPoint;
  }
  public async getPropertyUser(
    cognitoSub:string,
    queries: RequestPropertyClientQuery):
      Promise<ReponsePaginationProperyDTO>{
    try {
        const {page,limit} = queries;
        const response = await axios.get(`${this.gateWayBaseUrl}/${this.propertyServiceEndPoint}/user/${cognitoSub}`,{params:{page,limit}})
        return response.data! as ReponsePaginationProperyDTO;
    } catch (error) {
       // Handle Axios errors
       if (axios.isAxiosError(error)) {
        console.error("Axios error:", {
          message: error.message,
          response: error.response?.data,
        });
        throw new Error(`Failed to fetch property user data: ${error.message}`);
      } else {
        // Re-throw other errors
        throw error;
      }
    }
  }
}
