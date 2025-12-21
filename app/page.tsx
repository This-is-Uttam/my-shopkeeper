"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { IProduct } from "@/lib/models/Products";

export default function Home() {
  const notify = (e: string) => toast(e);
  const userData = useUser();
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setisLoading] = useState(true)

  const getAllProducts = async () => {
    const response = await fetch("/api/product/get-all", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setProducts(resJson.products || [])
    setisLoading(false)

  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) {
    return (<LoadingSkeleton />)
  }

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

      <div className="grid grid-cols-6 gap-5 p-2 py-4">

        {products.map((item, i) => ( 
          <ProductCard
            key={i}
            title={item.name}
            price={item.price}
            img={item.thumbnail}
            slug={item.slug}
          />
        ))}
      </div>


    </>
  );
}
