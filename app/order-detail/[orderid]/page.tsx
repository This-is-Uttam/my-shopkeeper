"use client";
import { statusColorMap } from "@/components/OrderCard";
import { IOrder } from "@/lib/models/Orders";
import { formatDate } from "@/utils/helper2";
import Image from "next/image";
import { use, useEffect, useState } from "react";



// const formatDate = (date: string) =>
//   new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

export default function Page({
  params,
}: {
  params: Promise<{ orderid: string }>;
}) {
  const { orderid: slug } = use(params);

  const [order, setOrder] = useState<IOrder>();

  const deliveryCharge = 40; // Fixed delivery charge for demonstration

  // Fetch orders from API (to be implemented)
  const getOrderDetails = async () => {
    const response = await fetch("/api/orders/order-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: slug }),
    });
    const resData = await response.json();
    console.log("Order Details: ", JSON.stringify(resData));
    if (resData.status === 201) {
      const orderFromApi: IOrder = resData.data;
      setOrder(orderFromApi);
    } else {
      console.log("Failed to fetch order details");
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {!order ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading order details...</p>
        </div>
      ) : (
        <>
          {/* 🔹 Header */}
          <div className="bg-white border rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Order Id: #{order?._id?.toString()}
                </h1>
                <p className="text-sm text-gray-500">
                  Ordered on {formatDate(new Date(order.orderedAt.toString()))}
                </p>
              </div>

              <span
                className={`px-3 py-1 w-fit rounded-full text-xs font-semibold ${
                  statusColorMap[order.orderStatus]
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* 🔹 Status Timeline */}
          {/* <div className="bg-white border rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Order Status</h2>

            <div className="flex items-center justify-between">
              {["PLACED", "SHIPPED", "DELIVERED"].map((step, index) => {
                const active =
                  ["PLACED", "SHIPPED", "DELIVERED"].indexOf(
                    order.orderStatus
                  ) >= index;

                return (
                  <div key={step} className="flex-1 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    active
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                    >
                      {index + 1} 
                    </div>

                    {index < 2 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded
                    ${active ? "bg-green-500" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div> */}

          {/* 🔹 Items List */}
          <div className="bg-white border rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Items</h2>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b last:border-b-0 pb-3"
                >
                  <div className="flex">
                    <Image
                            width={1980}
                            height={1080}
                            src={item.image}
                            unoptimized
                            alt=""
                            className="w-24 h-20 object-contain mr-4"
                          />
                  <div className="mt-4">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  </div>

                  <p className="font-semibold text-gray-900">
                    ₹{item.priceAtThatTime * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Price Summary */}
          <div className="bg-white border rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Price Details</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  ₹
                  {order.items.reduce(
                    (sum, item) => sum + item.priceAtThatTime * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>₹{deliveryCharge}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="font-bold">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* 🔹 Delivery Address */}
          <div className="bg-white border rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-3">
              Delivery Address
            </h2>

            <p className="font-medium">{order.address.fullName}</p>
            <p className="text-sm text-gray-600">
              {order.address.addressLine1},{order.address.addressLine2},{" "}
              {order.address.city}
            </p>
            <p className="text-sm text-gray-600">
              {order.address.state} - {order.address.pincode}
            </p>
            <p className="text-sm text-gray-600">
              Phone: {order.address.phone}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
