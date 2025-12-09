import React from "react";
import Link from "next/link";
import type { LucideProps } from "lucide-react";
import { Heart } from "lucide-react";

type card = {
  link: string;
  title: string;
  desc: string;
};

const Card = (params: card) => {
  return (
    <Link
      href={params.link}
      className="border rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition cursor-pointer bg-white flex items-center gap-4"
    >
      {/* Information */}
      <div>
        <div className="flex gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {params.title}
          </h3>
        </div>
        <p className="text-sm text-gray-600">{params.desc}</p>
      </div>
    </Link>
  );
};

export default Card;
