'use client'
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import banner from "@/images/banner.png";
import PostPropertiesTitle from '@/components/atoms/post-title/PostPropertiesTitle';
import PostRichEditor from '@/components/atoms/post-rich-editor/PostRichEditor';
import PostSelectTransition from '@/components/atoms/post-select-transition/PostSelectTransition';
import PostInputField from '@/components/atoms/post-input-field/PostInputField';
import PostSelectField from '@/components/atoms/post-select-field/PostSelectField';
import PostAtttributes from '@/components/atoms/post-attributes/PostAtttributes';
import PostUploadImages from '@/components/atoms/post-images-upload/PostUploadImages';
import { extractLatLngFromUrl } from '@/libs/functions/extractLatLngFromUrl';
import PostToggleButton from '@/components/atoms/post-toggle-button/PostToggleButton';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
import { categories } from '@/libs/const/category';
import { locations } from "@/libs/const/location"
import { IPostPropertiesType } from '@/libs/types/api-properties/property-request';
const defaultCategory = { name: "Select" };
import { generateSlug } from "@/libs/functions/generateSlug"
import axios from 'axios';

import dynamic from "next/dynamic";
const PostMap = dynamic(() => import('@/components/atoms/post-map/PostMap'), {
  ssr: false
});
export default function Page() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<IPostPropertiesType>({
    title: [{ content: '', language: 'en' }],
    slug: [{ content: '', language: 'en' }],
    description: [{ content: '', language: 'en' }],
    price: 0,
    category: [{ content: '', language: 'en' }],
    location: [{ content: '', language: 'en' }],
    detail: [
      {
        content: {
          bedrooms: '',
          bathrooms: '',
          size: '',
          parking: ''
        },
        language: 'en'
      }
    ],
    urlmap: '',
    transition: [{ content: '', language: 'en' }],
    status: false,
    thumbnail: '',
    images: [''],  // Corrected here
    coordinate: [{ types: '', coordinates: [0] }],
    address: [{ content: '', language: 'en' }]
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formState, setFormState] = useState<any>();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      const selectedFiles = Array.from(files);
      // Store actual files for the form submission
      //@ts-ignore
      setFormData(prevState => ({
        ...prevState,
        images: selectedFiles,  // Store file objects here
        thumbnail: selectedFiles[0]  // Store the first image as the thumbnail
      }));
      // Generate preview URLs for image display (optional)
      const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(imageUrls);  // Used for preview
    }
  };

  /** Handle input changes dynamically */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [arrayName, index, key, subkey] = name.split(".");
      if (arrayName === "detail") {
        const idx = parseInt(index, 10);
        setFormData(prevState => {
          const updatedDetails = [...prevState.detail!];
          updatedDetails[idx] = {
            ...updatedDetails[idx],
            content: {
              ...updatedDetails[idx].content,
              [subkey]: value, // Update the subkey dynamically
            }
          };
          return { ...prevState, detail: updatedDetails };
        });
      } else if (arrayName === 'title') {
        // auot update slug base on title
        const newSlug = generateSlug(value);
        setFormData(prevState => ({
          ...prevState,
          title: [{ content: value, language: 'en' }],
          slug: [{ content: newSlug, language: 'en' }] // Set the generated slug
        }));
      } else {
        const indexNum = parseInt(index, 10);
        setFormData(prevState => {
          const updatedArray = [...prevState[arrayName as keyof IPostPropertiesType] as any];
          updatedArray[indexNum] = { ...updatedArray[indexNum], [key]: value };
          return { ...prevState, [arrayName]: updatedArray };
        });
      }
    } else {
      if (name === 'urlmap') {
        const result = extractLatLngFromUrl(value);
        setFormData(prevState => ({
          ...prevState,
          urlmap: value,
          coordinate: [{ types: "Point", coordinates: result }] as IPostPropertiesType | any
        }));
      } else {
        setFormData(prevState => ({ ...prevState, [name]: value })); // Update non-nested fields
      }
    }
  };

  let flags: any
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform validation
    // Create a new object where all fields are converted to boolean
    flags = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof IPostPropertiesType];
      // Handle arrays, objects, strings, numbers, booleans, etc.
      if (Array.isArray(value)) {
        // @ts-ignore
        const [{ content, language }] = value;
        acc[key] = content?.length > 0;
      } else {
        if (typeof value === 'boolean') {
          acc[key] = value;
        } else if (typeof value === 'number') {
          acc[key] = value !== 0;
        } else if (typeof value === 'string') {
          acc[key] = value.trim().length > 0;
        } else {
          acc[key] = Boolean(value);
        }
      }

      return acc;
    }, {} as { [key: string]: boolean });

    console.log("Flags result:", flags);
    setFormState(flags);
    const form = new FormData();
    // Append images (actual file objects)
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach(image => {
        form.append('images', image);  // Append each image file (not URL)
      });
    }

    // Append the thumbnail (first image as thumbnail)
    if (formData.thumbnail) {
      form.append('thumbnail', formData.thumbnail);  // Append the actual file for thumbnail
    }
    // Append other form fields
    form.append('title', JSON.stringify(formData.title));
    form.append('description', JSON.stringify(formData.description));
    form.append('urlmap', formData.urlmap || "");
    form.append('address', JSON.stringify(formData.address));
    form.append('location', JSON.stringify(formData.location));
    form.append('price', formData?.price.toString());
    form.append('category', JSON.stringify(formData.category));
    form.append('transition', JSON.stringify(formData.transition));
    form.append('detail', JSON.stringify(formData.detail));
    try {
      const { thumbnail, title, description, urlmap, address, location, price, category, transition } = formState;
      if (thumbnail && title && description && urlmap && address && location && price && category && transition) {
        console.log("let's go...");

        const response = await axiosInstance.post(`${API_ENDPOINTS.PROPERTIES}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          /** Go alert to user then clear the state! */
          // Reset form data
          setFormData({
            title: [{ content: '', language: 'en' }],
            slug: [{ content: '', language: 'en' }],
            description: [{ content: '', language: 'en' }],
            price: 0,
            category: [{ content: '', language: 'en' }],
            location: [{ content: '', language: 'en' }],
            detail: [
              {
                content: {
                  bedrooms: '',
                  bathrooms: '',
                  size: '',
                  parking: ''
                },
                language: 'en'
              }
            ],
            urlmap: '',
            transition: [{ content: '', language: 'en' }],
            status: false,
            thumbnail: '',
            images: [''],
            coordinate: [{ types: '', coordinates: [0] }],
            address: [{ content: '', language: 'en' }]
          });
          // Optionally, reset image previews and other state values
          setImagePreviews([]);
          setIsChecked(false);

        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.status === 500) {
        console.log("Internal Server Error!");
        throw error;
      }
      console.error(error);
    }
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setFormData(prev => ({ ...prev, status: e.target.checked }))
  };
  return (
    <main className='w-full bg-[#E6E6E6]'>
      {/* banner */}
      <header className="relative w-full h-[300px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      </header>
      {/* form  */}
      <div className='w-full h-full'>
        <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
          <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Create properties</h1>
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleFormSubmit(e)} className='w-full h-full p-2' action="">
            <div className='w-full block justify-between flex-row mt-2 gap-1'>
              {/* row 1 */}
              <PostPropertiesTitle errorMsg={formState?.title} onChange={handleInputChange} title={formData.title} slug={formData.slug} />
              {/* rich editor */}
              <PostRichEditor errorMsg={formState?.description} title='Detail*' name='description.0.content' values={formData.description[0].content} onChange={handleInputChange} />
              {/* transition sale & rent  */}
              <h1 className='font-[600] leading-[5px] text-[25px] font-helvetica text-helvetica-paragraph mt-10 tracking-widest '>Type*</h1>
              <PostSelectTransition onChange={handleInputChange} transitionValue={formData.transition[0].content} />
              {/* row 2 */}
              <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                <PostInputField onChange={handleInputChange} errorMsg={formState?.price} title='Price*' name='price' types='number' placeholder='Properties price' />
                {/* Category Dropdown (div-based) */}
                <PostSelectField
                  options={categories}
                  onChange={handleInputChange}
                  errorMsg={formState?.category}
                  name='category.0.content'
                  title='Category'
                  zIndex='20'
                  defaultOption={defaultCategory} // Pass the default option
                />

              </div>
              <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1'>
                <PostInputField onChange={handleInputChange} errorMsg={formState?.address} title='Address*' name='address.0.content' placeholder='Properties address' />
                {/* Category Dropdown (div-based) */}
                <PostSelectField onChange={handleInputChange} defaultOption={defaultCategory} options={locations} errorMsg={formState?.location} name='location.0.content' title='Location*' />
              </div>
              {/* properties att */}
              <div className='w-full mt-5'>
                <PostAtttributes onChange={handleInputChange} />
              </div>
              {/* Images Upload  */}
              <div className="w-full mt-5">
                <PostUploadImages errMsg={formState?.thumbnail} OnImageChange={handleImageChange} imagePreviews={imagePreviews} />
              </div>
              <div className="w-full mt-5">
                <PostMap onChange={handleInputChange} values={formData && formData.urlmap || ''} />
              </div>
              <div className="w-full mt-5">
                <PostToggleButton isChecked={isChecked} onChecked={handleStatusChange} />
              </div>
              <div className='w-full h-full flex justify-end items-center py-2'>
                <div>
                  <button className='px-4 py-2 rounded-md m-2 font-medium text-slate-800 bg-slate-300'>Cancel</button>
                  <button type='submit' className='px-4 py-2 text-white font-medium rounded-md cursor-pointer bg-blue-700'>Create</button>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
    </main >
  );
}
