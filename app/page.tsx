"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { IProduct } from "@/lib/models/Products";
import { useAppSelector, useAppDispatch } from "./hook";
import { CartItem, setCart } from "@/features/cart/cartSlice";
import { saveCartToDb } from "./products/[productname]/page";

export default function Home() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const notify = (e: string) => toast(e);
  const userData = useUser();
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setisLoading] = useState(true)

  const dispatch = useAppDispatch();

  // getting cart details
    const getCart = async () => {
    const response = await fetch("/api/cart/sync", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    const { cart } = resData;
    const cartItems: CartItem[] = cart;

    dispatch(setCart(cartItems));
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if(cartItems===undefined) return;
    if (cartItems.length === 0) return;
    saveCartToDb(cartItems);
  }, [cartItems]);


  // getting all products 

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
        className="lg:w-full w-auto object-cover lg:object-fill  h-50"
      />
      <div className="text-xl font-bold mx-5 mt-4">Our Featured Products</div>

      <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-6 lg:gap-5 lg:p-2 py-4">

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
