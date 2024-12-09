import e from "express";
import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";

const InformationProperty = forwardRef((props: any, ref) => {
  const [formData, setFormData] = useState<any>({
    thumbnail: "",
    propertyImages: "",
    video: "",
    price: "",
    bedroom: "",
    bathroom: "",
    livingRoom: "",
    landArea: "",
    priceDiscount: "",
    floor: "",
    kitchen: "",
    parking: "",
    moreDetails: "",
  });

  const [errors, setErrors] = useState<any>({});

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const propertyImagesRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const bedroomRef = useRef<HTMLInputElement>(null);
  const bathroomRef = useRef<HTMLInputElement>(null);
  const livingRoomRef = useRef<HTMLInputElement>(null);
  const landAreaRef = useRef<HTMLInputElement>(null);
  const priceDiscountRef = useRef<HTMLInputElement>(null);
  const floorRef = useRef<HTMLInputElement>(null);
  const kitchenRef = useRef<HTMLInputElement>(null);
  const parkingRef = useRef<HTMLInputElement>(null);
  const moreDetailsRef = useRef<HTMLInputElement>(null);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData: any) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));

  //   // Validate the field on change
  //   validateField(name, value);
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, files } = e.target;
  //   if (files && files.length > 0) {
  //     setFormData((prevData: any) => ({
  //       ...prevData,
  //       [name]: files[0],
  //     }));

  //     // Clear the error for the specific file field
  //     setErrors((prevErrors: any) => ({
  //       ...prevErrors,
  //       [name]: undefined,
  //     }));
  //   }
  // };

  // Validation for individual fields
  const validateField = (name: string, value: string) => {
    if (!value) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: "This field is required.",
      }));
    } else {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: any = {};
    let isValid = true;

    const requiredFields = [
      "thumbnail",
      "propertyImages",
      "video",
      "price",
      "bedroom",
      "bathroom",
      "livingRoom",
      "landArea",
      "priceDiscount",
      "floor",
      "kitchen",
      "parking",
      "moreDetails",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, formData };
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    nextRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      nextRef.current?.focus();
    }
  };




  useImperativeHandle(ref, () => ({
    validate,
    clearErrors,
    clear() {
      setFormData({
        thumbnail: "",
        propertyImages: "",
        video: "",
        price: "",
        bedroom: "",
        bathroom: "",
        livingRoom: "",
        landArea: "",
        priceDiscount: "",
        floor: "",
        kitchen: "",
        parking: "",
        moreDetails: "",
      });


      // Clear file input references as well to reset files
    if (thumbnailRef.current) thumbnailRef.current.value = "";
    if (propertyImagesRef.current) propertyImagesRef.current.value = "";
    if(videoRef.current) videoRef.current.value = "";


      setErrors({});
    },
  }));

  return (
    <div>
      <div className="mt-10">
        <div className="mt-10 flex items-center space-x-3">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-red-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
            />
          </svg>

          <span className="text-lg font-bold text-gray-900">
            Information your property
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Thumbnail */}
          <div>
            <label className="font-medium mb-8">
              Thumbnail Image: <span className="text-red-500">*</span>
            </label>
            <div className={`flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg   ${
                  errors.thumbnail ? "border-red-400" : "border-dashed border-gray-400"
                }`}>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                // className="hidden"
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files ? e.target.files[0] : "" })}
                // value={formData.thumbnail}
                ref={thumbnailRef}
                onKeyDown={(e) => handleKeyDown(e, propertyImagesRef)}
              />
              <label className="cursor-pointer flex flex-col items-center">
                <svg
                  className={`w-10 h-10 text-gray-800 dark:text-gray-500 ${
                    errors.thumbnail ? "dark:text-red-400" : "text-gray-800"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className={`mt-2 text-gray-600 ${errors.thumbnail ? "text-red-400" : "text-gray-600"}`}>Drop your image here</p>
              </label>
            </div>
            {errors.thumbnail && (
              <p className="text-red-400 text-xs mt-1">{errors.thumbnail}</p>
            )}
          </div>

          {/* Property Images */}
          <div>
            <label className="font-medium mb-8">
              Property Images: <span className="text-red-500">*</span>
            </label>
            <div className={`flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg   ${
                  errors.propertyImages ? "border-red-400" : "border-dashed border-gray-400"
                }`}>
              <input
                type="file"
                name="propertyImages"
                accept="image/*"
                multiple
                // className="hidden"
                ref={propertyImagesRef}
                onChange={(e) => setFormData({ ...formData, propertyImages: e.target.files ? e.target.files[0] : "" })}
                // value={formData.propertyImages}
                onKeyDown={(e) => handleKeyDown(e, videoRef)}
              />
              <label className="cursor-pointer flex flex-col items-center">
                <svg
                  className={`w-10 h-10 text-gray-800 dark:text-gray-500 ${
                    errors.propertyImages ? "dark:text-red-400" : "text-gray-800"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className= {`mt-2 text-gray-600 ${errors.propertyImages ? "text-red-400" : "text-gray-600"}`}>Drop property images here</p>
              </label>
            </div>
            {errors.propertyImages && (
              <p className="text-red-400 text-xs mt-1">
                {errors.propertyImages}
              </p>
            )}
          </div>
        </div>

        {/* Video */}
        <div className="mt-5">
          <label className="font-medium">
            Video: <span className="text-red-500">*</span>
          </label>
         <div className="flex justify-center items-center p-6 border-2 bg-white rounded-lg">

          <input
            type="file"
            name="video"
            accept="video/*"
            className={`border-[2px] hover:border-blue-500 active:border-blue-500 transition-transform duration-150 rounded-lg w-[97%] px-5 py-3 mt-2 ${errors.video ? "border-red-400 shadow-outline" : " border-gray-400" }`}
            onChange={(e) => setFormData({ ...formData, video: e.target.files ? e.target.files[0] : "" })}
            // value={formData.video}
            ref={videoRef}
            onKeyDown={(e) => handleKeyDown(e, priceRef)}
          />
          </div>
          {errors.video && (
            <p className="text-red-400 text-xs mt-1">{errors.video}</p>
          )}
        </div>

        {/* Additional Inputs */}
        <div className="grid grid-cols-2 gap-5 mt-8">
          <div>
            <label className="font-medium">
              Price: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.price ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, price: Number(e.target.value)})} // Update formData.price directly with Number(e.target.value) onChange={handleChange}
              ref={priceRef}
              value={formData.price}
              onKeyDown={(e) => handleKeyDown(e, bedroomRef)}
            />
            {errors.price && (
              <p className="text-red-400 text-xs mt-1">{errors.price}</p>
            )}

            <label className="font-medium">
              Bedroom: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="bedroom"
              placeholder="Enter bedroom count"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.bedroom ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, bedroom: Number(e.target.value)})}
              value={formData.bedroom}
              ref={bedroomRef}
              onKeyDown={(e) => handleKeyDown(e, bathroomRef)}
            />
            {errors.bedroom && (
              <p className="text-red-400 text-xs mt-1">{errors.bedroom}</p>
            )}

            <label htmlFor="" className="font-medium">
              Bathroom: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="bathroom"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.bathroom ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, bathroom: Number(e.target.value)})}

              value={formData.bathroom}
              ref={bathroomRef}
              onKeyDown={(e) => handleKeyDown(e, livingRoomRef)}
            />

            {errors.bathroom && (
              <p className="text-red-400 text-xs mt-1">{errors.bathroom}</p>
            )}

            <label htmlFor="" className="font-medium">
              Living room: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="livingRoom"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.livingRoom ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, livingRoom: Number(e.target.value)})}
              value={formData.livingRoom}
              ref={livingRoomRef}
              onKeyDown={(e) => handleKeyDown(e, landAreaRef)}
            />
            {errors.livingRoom && (
              <p className="text-red-500 text-xs mt-1">{errors.livingRoom}</p>
            )}

            <label htmlFor="" className="font-medium">
              Land Area: <span className="text-red-500">*</span>
            </label>
            <div className="relative ">
              <input
                type="number"
                name="landArea"
                placeholder="Enter a number"
                className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.landArea ? "border-red-400 shadow-outline" : " border-gray-400" }`}
                onChange={(e)=>setFormData({...formData, landArea: Number(e.target.value)})}
                value={formData.landArea}
                ref={landAreaRef}
                onKeyDown={(e) => handleKeyDown(e, priceDiscountRef)}
/>
              <span className=" right-3 top-1/2 transform -translate-y-1/2  text-gray-600 text-lg">
                m<sup>2</sup>
              </span>
              {/* Positioning m² */}

              {errors.landArea && (
                <p className="text-red-400 text-xs mt-1">{errors.landArea}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="" className="font-medium">
              Price discount:
            </label>
            <input
              type="number"
              name="priceDiscount"
              placeholder="Enter your price discount"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.priceDiscount ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, priceDiscount: Number(e.target.value)})}
              value={formData.priceDiscount}
              ref={priceDiscountRef}
              onKeyDown={(e) => handleKeyDown(e, floorRef)}
            />
            {/* <label htmlFor="">$</label> */}
            {errors.priceDiscount && (
              <p className="text-red-400 text-xs mt-1">
                {errors.priceDiscount}
              </p>
            )}

            <label htmlFor="" className="font-medium">
              Floor: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="floor"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.floor ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, floor: Number(e.target.value)})}
              value={formData.floor}
              ref={floorRef}
              onKeyDown={(e) => handleKeyDown(e, kitchenRef)}
            />
            {errors.floor && (
              <p className="text-red-400 text-xs mt-1">{errors.floor}</p>
            )}

            <label htmlFor="" className="font-medium">
              Kitchen: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="kitchen"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.kitchen ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, kitchen: Number(e.target.value)})}
              value={formData.kitchen}
              ref={kitchenRef}
              onKeyDown={(e) => handleKeyDown(e, parkingRef)}
            />
            {errors.kitchen && (
              <p className="text-red-400 text-xs mt-1">
                {errors.priceDiscount}
              </p>
            )}

            <label htmlFor="" className="font-medium">
              Parking : <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="parking"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.parking ? "border-red-400 shadow-outline" : " border-gray-400" }`}
              onChange={(e)=>setFormData({...formData, parking: Number(e.target.value)})}
              value={formData.parking}
              ref={parkingRef}
              onKeyDown={(e) => handleKeyDown(e, moreDetailsRef)}
            />

            {errors.parking && (
              <p className="text-red-400 text-xs mt-1">{errors.parking}</p>
            )}
          </div>
        </div>
        <label htmlFor="" className="text-[25px] font-bold mt-5">
          Add more details
        </label>
        <input
          type="text"
          name="moreDetails"
          placeholder="Enter your more property details"
          onChange={(e)=>setFormData({...formData, moreDetails: e.target.value})}
          value={formData.moreDetails}
          ref={moreDetailsRef}
          className={`border-[2px] border-gray-400 rounded-lg w-[97%] h-[250px] px-5 py-3 mt-2 ${errors.moreDetails ? "border-red-400 shadow-outline" : " border-gray-400" }`}
          onKeyDown={(e) => handleKeyDown(e, moreDetailsRef)}
          />
        {errors.moreDetails && (
          <p className="text-red-400 text-xs mt-1">{errors.moreDetails}</p>
        )}
      </div>
    </div>
  );

});



InformationProperty.displayName = "InformationProperty"; // Required for forwardRef components
export default InformationProperty;
