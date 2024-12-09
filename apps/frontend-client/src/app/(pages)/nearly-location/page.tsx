import Image from "next/image";
import banner from "@/images/banner.png";
import Search from "@/components/molecules/Search/Search";
import CartAllowLocation from "@/components/molecules/Cart-allowLoaction/CardAllow";


const page = async () => {


  return (
    <div className="w-full">

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

        {/* Title */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Here is Property Near Your Location</h1>
        </div>

        {/* Line */}
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>
        <div className="absolute left-[13rem] flex items-center justify-center w-full bottom-[-37px] px-2  ">
          <div className="z-10 m-auto lg:w-fit bg-white rounded-[18px] p-5">
            <Search />
          </div>
        </div>
      </header>
      <CartAllowLocation />
    </div>
  );
};

export default page;
