// import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import ItemCardPopularLocationList from "@/components/molecules/item-card-popular-location-list/ItemCardPopularLocationList";
import bannerNearlyLocation from "@/images/banner-nearly-location.jpeg"
import HeroSection from "@/components/organisms/hero-section/HeroSection";
import Image from "next/image";
import logSkyBar from "@/images/banner-sky-bar.jpg";
import Slider from "@/components/molecules/slider/Slider";
import Link from "next/link";
import ItemCardNearlyLocationList from "@/components/molecules/item-card-nearly-location-list/ItemCardNearlyLocationList";
import LocationAccess from "@/components/organisms/location-access/LocationAccess";


export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <section className="w-full xl:w-[1300px] m-auto py-10 px-2 xl:px-0 flex flex-col justify-center items-center">

        <ItemCardPopularLocationList />

      </section>
      <section className="w-full  bg-gray-500 h-[1200px] lg:h-[720px] relative ">
        <Image
          src={bannerNearlyLocation}
          alt="nearly-location images"
          height={"400"}
          className=" absolute left-0 top-0 w-full h-full object-cover"
        />
        <div className="bg-[#0000002e] absolute left-0 top-0 w-full h-full ">
          <div className="w-full h-full xl:w-[1300px] px-2 xl:px-0 flex flex-col justify-evenly items-center lg:flex-row gap-10 ">
            <div className="w-full lg:w-[30%] h-full py-32 ">
              <ItemCardNearlyLocationList />
            </div>
            <div className=" lg:w-[30%] h-full  py-10 flex flex-col items-center ">
              <div className=" flex flex-col items-center justify-center mb-40">
                <h1 className=" text-white font-[600]  text-[30px]">
                  Nearly Location
                </h1>
                <p className=" text-white">
                  Discover the best properties near you. Find your dream home
                  from our exclusive listings
                </p>
              </div>
              <Link
                href={"/nearly-location"}
                className="px-10 py-2 rounded-md border-[1px] border-white text-white text-[26px] font-[500]
                  transition-all duration-150 ease-in-out
                  bg-transparent  hover:text-white hover:border-white hover:scale-105
                  active:scale-95  active:text-white"
              >
                View ALL
              </Link>

            </div>
          </div>
        </div>
      </section>
      {/* <ExclusiveHomesSlider /> */}
      <section className=" xl:w-[1300px] m-auto h-[500px] b px-2 xl:px-0">
        <Slider />
      </section>
      <div className=" flex flex-col lg:flex-row justify-between gap-20 xl:w-[1300px] m-auto py-20 lg:py-40 px-2 lg:px-20">
        <div>
          <h2 className=" text-[28px] font-[600] text-olive-drab">
            Unleash Your Creativity at Home
          </h2>
          <p className=" text-olive-drab">
            Your home is a canvas waiting for your unique touch. Explore the
            endless possibilities with our expertly curated properties, each
            offering a perfect blend of style and functionality. Whether you
            dream of a cozy reading nook, an elegant home office, or a vibrant
            playroom, we have the spaces that inspire. Let us help you create a
            home that reflects your personality and lifestyle. Start your
            journey with us and transform your living space into a masterpiece.
          </p>
        </div>
        <div className=" flex justify-end">
          <div className="w-[300px] h-[200px] rounded-2xl overflow-hidden">
            <Image src={logSkyBar} alt="" />
          </div>
        </div>
      </div>
      <section></section>

      {/* feed on sell */}
      {/* <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-row justify-between items-center">
            <h1 className=" text-[18px] lg:text-[26px] font-[600] ">
              Feed on sale
            </h1>
            <Link
              href={"/buy"}
              className="text-blue-500  lg:text-[18px] font-[500]"
            >
              View All
            </Link>
          </div>
          <ItemCardList />
        </div> */}
      {/* Popular location */}
      {/* feed on rent */}
      {/* <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-row justify-between items-center">
            <h1 className=" text-[18px] lg:text-[26px] font-[600] ">
              Feed on Rent
            </h1>
            <Link
              href={"/buy"}
              className="text-blue-500  lg:text-[18px] font-[500]"
            >
              View All
            </Link>
          </div>
          <ItemCardList />
        </div> */}
      {/* our service */}
      {/* <ServiceCardList /> */}
    </main>
  );
}
