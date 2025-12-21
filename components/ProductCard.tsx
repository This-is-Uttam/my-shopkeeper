"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  title: string;
  price: number;
  img: string;
  slug: string
};

const ProductCard = ({ title, price, img, slug }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = (title: string, price: number, img: string) => {
    router.push(`products/${slug}`);
  };

  return (
    <div
      onClick={() => {
        handleClick(title, price, img);
      }}
      className="w-[190px] p-2 px-4 cursor-pointer rounded-2xl hover:scale-[1.02] hover:shadow-lg transition"
    >
      <div className="h-55 overflow-hidden flex items-center">
        <Image
          width={1980}
          height={1080}
          src={img}
          alt=""
          unoptimized
          className="w-50 rounded-2xl"
        />
      </div>
      <div className="title font-semibold overflow-hidden line-clamp-2 text-center">
        {title}
      </div>
      <div className="price font-bold text-center text-[18px]">₹{price}</div>
    </div>
  );
};

export default ProductCard;
