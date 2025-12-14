import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { productname: string };
}) {
  const n = (await params).productname;

  
  return (
    <div>
      <div className="flex my-8">
        {/* Product Image */}
        <div className="prodImage mx-2 p-4">
          <div className="w-[400px] h-100 mx-2  overflow-hidden flex gap-6 items-center">
            {/* Image list */}
            <div className="flex flex-col gap-2">
              <Image
                width={1980}
                height={1080}
                src={"/earbuds.webp"}
                alt=""
                unoptimized
                className="w-12 object-cover"
              />
              <Image
                width={1980}
                height={1080}
                src={"/earbuds.webp"}
                alt=""
                unoptimized
                className="w-12 object-cover"
              />
              <Image
                width={1980}
                height={1080}
                src={"/earbuds.webp"}
                alt=""
                unoptimized
                className="w-12 object-cover"
              />
              <Image
                width={1980}
                height={1080}
                src={"/earbuds.webp"}
                alt=""
                unoptimized
                className="w-12 object-cover"
              />
              <Image
                width={1980}
                height={1080}
                src={"/earbuds.webp"}
                alt=""
                unoptimized
                className="w-12 object-cover"
              />
            </div>
            {/* large image */}
            <Image
              width={1980}
              height={1080}
              src={"/earbuds.webp"}
              alt=""
              unoptimized
              className="w-80 object-cover"
            />
          </div>
          {/* buy cart buttons */}
          <div className="flex gap-3 my-2 mt-5">
            <div className="buy bg-green-400 w-full py-3 rounded-3xl font-bold text-center cursor-pointer hover:bg-green-500 ">Buy Now</div>
            <div className="cart bg-amber-300 w-full py-3 rounded-3xl font-bold text-center cursor-pointer hover:bg-amber-500">Add to Cart</div>
          </div>
        </div>
        {/* Product details */}
        <div className="prodDetails mx-4 p-4">
          <div className="title text-2xl  font-semibold overflow-hidden line-clamp-2">
            Apple iPhone 16 Plus (Ultramarine, 128 GB)
          </div>
          <div className="price text-2xl  font-bold my-3 bg-[#0051ff94] w-fit rounded-[10px] text-black p-1 px-3">
            ₹49999
          </div>
          <div className="specifications">
            <div className="font-bold text-xl mt-5 mb-3">
              Product Specifications
            </div>
            <div>
              With Mic:Yes BEAST Mode: Experience lag-free high-quality gaming
              with low latency of up to 50 ms. Visuals align with impactful
              audio for realistic action. 35 HRS Playback & ASAP Charge:
              Airdopes Alpha TWS Earbuds offer up to 35 hours of playtime,
              giving you plenty of time to listen to your preferred tunes. 10
              minutes of charging yields about 120 minutes of seamless
              performance. boAt Signature Sound: Powered by dual 13 mm drivers,
              these earbuds deliver matchless boAt Signature sound with superior
              bass. ENx Tech for Clear Voice Calls: To offer unparalleled sound
              clarity, the dual mics of these earbuds are enhanced with ENxTM
              tech that wards off background noise. IPX5 Resistance: You can
              attend outdoor events while wearing these earbuds as they sport an
              IPX5-rated build.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
