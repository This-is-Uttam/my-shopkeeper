"use client";

import { IOrder } from "@/lib/models/Orders";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type OrderItem = {
  _id: string;
  orderId: string;
  date: string;
  totalItems: number;
  totalAmount: number;
  status: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
};

export const statusColorMap: Record<OrderItem["status"], string> = {
  PLACED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-yellow-100 text-yellow-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrderCard({ order }: { order: IOrder }) {
  const router = useRouter()

  const handleOrderClick = () => {
    // Handle order click logic here
    console.log("order clicked", order._id);
    router.push(`/order-detail/${order._id}`);
  };


  return (
    <div
      onClick={handleOrderClick}
      className="bg-white mx-4 cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-5"
    >
      {
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold text-gray-800">
              #{order._id.toString()}
            </p>
          </div>
          <p className="text-lg font-bold text-gray-900">
            ₹{order.totalAmount}
          </p>
          <p>
            <span className="font-medium text-gray-800">
              {order.items.length}
            </span>{" "}
            items
          </p>
          <span
            className={`px-3 py-1 w-fit rounded-full text-xs font-semibold ${
              statusColorMap[order.orderStatus]
            }`}
          >
            {order.orderStatus}
          </span>
          <p>
            {new Date(order.orderedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          {/* {const formattedDate = ;} */}
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View Details →
          </button>
        </div>
      }
    </div>
  );
}
