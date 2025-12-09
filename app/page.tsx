"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useRouter } from "next/router";
import { useUser,  } from "@clerk/nextjs";

export default function Home() {
  const notify = (e: string) => toast(e);
  const userData = useUser()
  console.log(`Is User Signed In: ${userData.isSignedIn}`)
  console.log(`Is User loaded: ${userData.isLoaded}`)
  console.log(`User Data : ${userData.user?.fullName}`)
  // console.log(`User Data : ${userData.user?.username}`)
  console.log(`User Data : ${userData.user?.emailAddresses[0]}`)
  console.log(`User Data : ${userData.user?.imageUrl}`)
  console.log(`User Data : ${userData.user?.lastSignInAt}`)
  console.log(`User Data : ${userData.user?.id}`)
  console.log(`User Data : ${userData.user?.phoneNumbers}`)
  return (
    <>
      <Image
        width={1980}
        height={1080}
        src="/image.png?v=2"
        unoptimized
        alt=""
        className="w-full h-50"
      />
      <div className="text-xl font-bold mx-5 mt-4">Our Featured Products</div>
      
      <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Apple iPhone 16 Plus (Ultramarine, 128 GB)"
          price={55999}
          img="/iphone.webp"
        />
        <ProductCard
          title="boAt Airdopes Alpha,35H Battery, 13mm Drivers,ENx, Stream Ad Free Music via App Bluetooth  (Deep Blue, In the Ear)"
          price={749}
          img="/earbuds.webp"
        />
        <ProductCard
          title="BESTON 80 cm (32 inch) HD Ready LED Smart Android TV 2025 Edition"
          price={6999}
          img="/tv.webp"
        />
        <ProductCard
          title="FURIONE Analog 30 cm X 30 cm Wall Clock  (Black, With Glass, Standard)"
          price={602}
          img="/clock.webp"
        />
        <ProductCard
          title="COGNANT SPORT & FITNESS PVC Dumbbell Set + FITNESS Grip - Best Home Exercise KIT Fitness Accessory Kit Kit"
          price={646}
          img="/dumbell.webp"
        />
        <ProductCard
          title="BESTON 80 cm (32 inch) HD Ready LED Smart Android TV 2025 Edition"
          price={6999}
          img="/tv.webp"
        />
        <ProductCard
          title="FURIONE Analog 30 cm X 30 cm Wall Clock  (Black, With Glass, Standard)"
          price={602}
          img="/clock.webp"
        />
        <ProductCard
          title="COGNANT SPORT & FITNESS PVC Dumbbell Set + FITNESS Grip - Best Home Exercise KIT Fitness Accessory Kit Kit"
          price={646}
          img="/dumbell.webp"
        />
        <ProductCard
          title="BESTON 80 cm (32 inch) HD Ready LED Smart Android TV 2025 Edition"
          price={6999}
          img="/tv.webp"
        />
        <ProductCard
          title="FURIONE Analog 30 cm X 30 cm Wall Clock  (Black, With Glass, Standard)"
          price={602}
          img="/clock.webp"
        />
        <ProductCard
          title="COGNANT SPORT & FITNESS PVC Dumbbell Set + FITNESS Grip - Best Home Exercise KIT Fitness Accessory Kit Kit"
          price={646}
          img="/dumbell.webp"
        />
      </div>

      {/* <LoadingSkeleton/> */}
    </>
  );
}
