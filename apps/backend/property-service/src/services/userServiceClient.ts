import configs from "../config";
import axios from "axios"
import { ResponsePropertyOwner } from "../utils/types/indext";
export class UserServiceClient{
    private ownerRequestEndpiont(cognitoSub:string){
        return `${configs.userServiceUrl}/profile-info/${cognitoSub}`;
    }
    async propertyOwnerInfo(cognitoSub:string): Promise<ResponsePropertyOwner | null>{
        try {
            const responsePropertyOwner = (await axios.get(this.ownerRequestEndpiont(cognitoSub)));
            //console.log("responsePropertyOwner:: ", responsePropertyOwner);
            if(responsePropertyOwner.status === 204){
                return null;
            }
            return responsePropertyOwner.data;
            
        } catch (error) {
            console.log("User service client:: ",error);
            
            throw error;
        }
    }
}