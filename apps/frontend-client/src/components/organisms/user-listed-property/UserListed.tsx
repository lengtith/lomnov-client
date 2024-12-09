// "use client";
// import React from "react";
// import { FacebookF, Telegram, TellPhone, Share } from "@/icons";
// import Link from "next/link";
// import Image from "next/image";
// import { RealEstateItem } from "@/libs/types/api-properties/property-response";

// const UserListed = ({ property }: { property: RealEstateItem }) => {
//   const handleShareClick = () => {
//     window.open(
//       `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
//       "_blank",
//     );
//   };
//   return (
//     <div className="w-[40%] h-[50%] mx-auto p-[10px]">
//       <div className="w-full h-full border border-neutral p-0 lg:p-[10px] rounded-[10px] ">
//         <div className="flex flex-wrap-reverse p-[10px] lg:p-0  items-center justify-between">
//           <div className="flex mt-[6px] lg:mt-0  flex-col w-full lg:w-auto flex-grow font-helvetica text-helvetica-paragraph text-charcoal">
//             <span className="font-bold">{property.user}</span>
//             <span className="break-words">loremipsum123@gmail.com</span>
//           </div>
//           <Link href={`/view-profile/${property.user}`}>
//             <div className="w-full lg:w-auto flex items-center">
//               <Image
//                 src="/mask-group@2x.png"
//                 alt="user"
//                 width={50}
//                 height={50}
//                 className="object-cover w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
//               />
//             </div>
//           </Link>
//         </div>

//         <div className="flex-grow h-px bg-neutral mt-1"></div>
//         <div className="mt-0 lg:mt-[15px] font-helvetica text-helvetica-paragraph text-charcoal p-[10px] lg:p-0">
//           <span className="font-bold">Address</span>
//           <p>{property.address[0].content}</p>
//         </div>
//         <div className="mt-0 lg:mt-[15px] p-[10px] lg:p-0 font-helvetica text-helvetica-paragraph text-charcoal">
//           <span className="font-bold">Contact</span>
//           <div className="flex text-olive-green">
//             <Link href={"https://www.facebook.com/"}>
//               <FacebookF props="w-[25px] h-[25px] mr-[10px]" />
//             </Link>
//             <Link href={"https://web.telegram.org/a/"}>
//               <Telegram props="w-[25px] h-[25px]" />
//             </Link>
//           </div>
//         </div>
        
//         <div className="flex-grow h-px bg-neutral mt-[15px]"></div>
//         <div className="mt-0 lg:mt-[15px]  p-[10px] lg:p-0 flex w-full flex-wrap justify-between">
//           <button className="flex items-center  font-helvetica text-helvetica-paragraph text-center text-charcoal">
//             Save
//           </button>
//           <a
//             href={`tel:${property.user}`}
//             className="flex items-center font-helvetica text-helvetica-paragraph text-center text-charcoal"
//           >
//             <TellPhone props="w-[20px] h-[20px] mr-[5px] text-olive-green" />
//             Call Now
//           </a>
//           <button
//             className="flex items-center font-helvetica text-helvetica-paragraph text-center text-charcoal"
//             onClick={handleShareClick}
//           >
//             <Share props="w-[20px] h-[20px] mr-[5px] text-olive-green" />
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserListed;
