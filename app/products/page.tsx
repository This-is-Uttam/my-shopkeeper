import React from "react";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="text-xl font-bold mx-5 mt-4">Winter Exclusives</div>
      {/* <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Jesal Self Design Men Muffler (Pack of 3)"
          price={217}
          img="/winterclothes.webp"
        />
      </div> */}

      <div className="text-xl font-bold mx-5 mt-4">Latest Phones</div>
      {/* <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Apple iPhone 16 Plus (Ultramarine, 128 GB)"
          price={55999}
          img="/iphone.webp"
        />
      </div> */}


      <div className="text-xl font-bold mx-5 mt-4">Shirtings & Suitings</div>
      {/* <div className="grid grid-cols-6 gap-5 p-2">
        <ProductCard
          title="Men Stylus T-Shirt Slim-fit (Brown)"
          price={55999}
          img="/shirt.webp"
        />
      </div> */}



        
    </div>
  );
};

export default Products;
