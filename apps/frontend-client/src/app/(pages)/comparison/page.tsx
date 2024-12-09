import Image from "next/image";
import banner from "@/images/banner.png";

import ComparisonPage from "@/components/molecules/comparison-page/ComparisonPage";
import { Suspense } from "react";

// ===================================================================
function page() {
  return (
    //* New */
    <main className="w-full ">
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />

        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
        <div className="absolute left-[24%] bottom-[150px] font-helvetica text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property</h1>
        </div>
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[550px] h-px bg-white"></div>
      </header>

      <div className="w-full lg:w-[1300px] m-auto  mt-20 px-2 lg:px-0">

        {/* <PropertyList /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <ComparisonPage />
        </Suspense>

      </div>
    </main>
  );
}

export default page;
