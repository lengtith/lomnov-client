import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Image from "next/image";
import PropertyTypeInfo from "../../../../components/organisms/property-type-info/PropertyTypeInfo";
import PropertyDescription from "../../../../components/organisms/property-description/PropertyDescription";
import Map from "../../../../components/molecules/map/Map";
import RecommendedProperties from "@/components/molecules/RecommendedProperties/RecommendedProperties";
// import UserListed from "@/components/organisms/user-listed-property/UserListed";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

// Fetch property data
async function fetchProperty(id: string): Promise<RealEstateItem> {
  try {
    // Increment view count
    // await axiosInstance.put(`${API_ENDPOINTS.PROPERTIES}/${id}/views`);

    const res = await axiosInstance.get(`${API_ENDPOINTS.GET_PROPERTY_BY_ID}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// Server component to fetch property data
const page = async ({ params }: { params: { id: string } }) => {
  // Fetch the property details
  const property = await fetchProperty(params.id);

  return (
    <>
      {
        property
          ? (<div className="w-full mb-[50px] mx-auto relative">
            <div className="w-full relative bg-grayish-white h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] xl:h-[700px] 2xl:h-[850px] overflow-hidden text-olive-green">
              {/* IMAGE THUMBNAIL */}
              <Image
                className="top-0 left-0 w-full h-full object-cover"
                src={property.thumbnail}
                alt={property.title?.[0].content}
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="absolute top-[290px] sm:top-[385px] md:top-[435px] lg:top-[575px] xl:top-[628px] 2xl:top-[778px] w-full flex justify-center items-center">
              <div className="relative w-full xl:w-[1300px]">
                {/* VECTOR SVG LEFT */}
                <Image
                  className="absolute hidden xl:block -left-5 bottom-[75px] transform translate-y-1/2 w-5 h-5"
                  alt="vector5"
                  src="/vector-5.svg"
                  width={5}
                  height={5}
                />
                <div className="rounded-[10px] sm:rounded-[15px] md:rounded-xl lg:rounded-[25px] bg-grayish-white overflow-hidden flex flex-col items-start justify-start py-[10px] px-[10px] box-border">
                  <div className="self-stretch rounded-[10px] sm:rounded-[15px] md:rounded-xl lg:rounded-[25px] bg-neutral overflow-hidden flex flex-col items-center justify-center py-[10px] px-[10px]">
                    <div className="flex justify-evenly w-full mx-auto">
                      {/* Properties Listing */}
                      <div className="grid grid-cols-3 lg:grid-cols-6 w-full items-center justify-center mx-auto gap-[10px] lg:gap-[20px] mr-[10px] lg:mr-[20px]">
                        <PropertyTypeInfo property={property} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* VECTOR SVG RIGHT */}
                <Image
                  className="absolute hidden xl:block -right-5 bottom-[75px] transform translate-y-1/2 w-5 h-5"
                  alt="vector4"
                  src="/vector-4.svg"
                  width={5}
                  height={5}
                />
              </div>
            </div>

            <div className="w-full mt-[200px] sm:mt-[190px] md:mt-[220px] lg:mt-[170px] xl:mt-[100px]">
              <div className="max-w-[1300px] mx-auto flex justify-between">
                <PropertyDescription property={property} />
                {/* <UserListed property={property} /> */}
              </div>
              <Map property={property.urlmap} />
            </div>

            {/* Recommend Properties */}
            <div className="w-full mt-[50px]">
              <RecommendedProperties
                category={property?.category[0]?.content}
                address={property?.address[0]?.content}
              />
            </div>
          </div>)
          : <div>Not found</div>
      }

    </>
  );
};

// This function gets called at build time
// export async function generateStaticParams() {
//   const id = ["1", "2", "3"]; // Example IDs
//   return id.map((id) => ({
//     id,
//   }));
// }

export default page;

