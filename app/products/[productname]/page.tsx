"use client";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { IProduct } from "@/lib/models/Products";
import Image from "next/image";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { addToCart, CartItem } from "@/features/cart/cartSlice";


async function saveCartToDb(cartItems: CartItem[]) {
  const response = await fetch("/api/cart/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtThatTime: item.discountPrice || item.price,
      })),
    }),
  });

  const resData = await response.json();
}

export default function Page({params}: {
  params: Promise<{ productname: string }>;
}) {
  const { productname: slug } = use(params);
  const [product, setProduct] = useState<IProduct>();
  const [imgIndex, setImgIndex] = useState(0);
  const dispach = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const getProductDetail = async (slug: string) => {
    const response = await fetch("/api/product/get-product-by-slug", {
      method: "POST",
      body: JSON.stringify({ slug }),
    });

    const resData = await response.json();
    const product = resData.product;

    setProduct(product);
    // console.log("Productt details", resData);
  };

  useEffect(() => {
    if (!slug) return; // safety guard

    getProductDetail(slug);
  }, [slug]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row my-8">
        {/* Product Image */}
        <div className="prodImage mx-2 p-4 ">
          <div className="w-[400px] h-[410px] mx-2  overflow-hidden flex flex-col lg:flex-row gap-6 items-center">
            {/* Image list */}
            <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
              {product?.images.map((item, index) => {
                const isActive = index === imgIndex;

                return (
                  <div
                    className={`rounded-lg p-[3px] ${
                      isActive
                        ? "border-2 border-blue-600 mb-2"
                        : "border-2 border-transparent"
                    }`}
                  >
                    <Image
                      key={index}
                      onClick={() => {
                        setImgIndex(index);
                      }}
                      width={1980}
                      height={1080}
                      src={item.url || "/placeholder.jpg"}
                      alt=""
                      unoptimized
                      className="w-14 h-12 rounded-lg object-contain cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
            {/* large image */}
            <Image
              width={1980}
              height={1080}
              src={product?.images[imgIndex].url || "/placeholder.jpg"}
              alt="Image"
              unoptimized
              className="w-80 h-80 object-contain rounded-xl order-1 lg:order-2"
            />
          </div>
          {/* buy cart buttons */}
          <div className="flex gap-3 my-2 mt-5">
            <div className="buy bg-green-400 w-full py-3 rounded-3xl font-bold text-center cursor-pointer hover:bg-green-500 ">
              Buy Now
            </div>
            <div
              onClick={async () => {
                dispach(
                  addToCart({
                    productId: `${product?._id}`,
                    name: `${product?.name}`,
                    price: product?.price || 0,
                    discountPrice: product?.discountPrice || 0,
                    image: `${product?.thumbnail}`,
                    quantity: 1,
                  })
                );

                // saving cart to database
                await saveCartToDb(items);
              }}
              className="cart bg-orange-400 w-full py-3 rounded-3xl font-bold text-center cursor-pointer hover:bg-amber-500"
            >
              Add to Cart
            </div>
          </div>
        </div>
        {/* Product details */}
        <div className="prodDetails mx-4 p-4">
          <div className="title text-2xl  font-semibold overflow-hidden line-clamp-2">
            {product?.name}
          </div>
          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <div className="price text-2xl  font-bold my-3 bg-[#0051ff94] w-fit rounded-[10px] text-black p-1 px-3">
              ₹{product?.discountPrice}
            </div>
            <div className="mrp line-through -mb-3 text-xl font-bold text-slate-700">
              ₹{product?.price}
            </div>
          </div>

          <div className="specifications">
            <div className="font-bold text-xl mt-5 mb-3">
              Product Specifications
            </div>
            <div>
              {product?.shortDescription} <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates perferendis, alias consequuntur a odio officia vero
              asperiores, est aspernatur, sunt recusandae exercitationem
              assumenda libero at.
            </div>
            <div className="font-bold text-xl mt-5 mb-3">Product Details</div>
            <div>
              {product?.description}
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates perferendis, alias consequuntur a odio officia vero
              asperiores, est aspernatur, sunt recusandae exercitationem
              assumenda libero at. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptas numquam nihil aperiam impedit odit, eum
              quam commodi iusto quidem blanditiis earum necessitatibus hic
              tenetur cum enim optio fugiat esse non aliquam corporis ex! Nam
              quibusdam pariatur voluptatum, autem quas tenetur ipsum, aliquam,
              ex veniam voluptatem expedita omnis aspernatur vel quis.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
