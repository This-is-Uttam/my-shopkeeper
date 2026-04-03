"use client"

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/lib/models/Products";

const Products = () => {
  // getting all products

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setisLoading] = useState(true);

  const getAllProducts = async () => {
    const response = await fetch("/api/product/get-all", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setProducts(resJson.products || []);
    setisLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-xl font-bold mx-5 mt-4">All Products</div>
      {/* <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Jesal Self Design Men Muffler (Pack of 3)"
          price={217}
          img="/winterclothes.webp"
        />
      </div> */}

      {/* <div className="text-xl font-bold mx-5 mt-4">Latest Phones</div> */}
      {/* <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Apple iPhone 16 Plus (Ultramarine, 128 GB)"
          price={55999}
          img="/iphone.webp"
        />
      </div> */}

      {/* <div className="text-xl font-bold mx-5 mt-4">Shirtings & Suitings</div> */}
      {/* <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Men Stylus T-Shirt Slim-fit (Brown)"
          price={55999}
          img="/shirt.webp"
        />
      </div> */}

      {/* //////////////////////// */}

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
    </div>
  );
};

export default Products;
