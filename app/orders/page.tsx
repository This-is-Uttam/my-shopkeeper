"use client";
import OrderCard, { OrderItem } from "@/components/OrderCard";
import { IOrder } from "@/lib/models/Orders";
import  { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getAllOrders = async () => {
    // Fetch orders from API (to be implemented)
    const response = await fetch("/api/orders/get-all-orders");
    const resData = await response.json();
    const ordersFromApi: IOrder[] = resData.data;
    setOrders(ordersFromApi);
  };

  useEffect(() => {
    // Fetch all orders on component mount
    getAllOrders();
  }, []);

  return (
    <div className=" lg:mx-24 min-h-screen my-4">
      {/* Header */}
      <div className="w-[85vw] my-1 my-4 flex justify-between  items-baseline">
        <h2 className="text-[24px] mx-4 font-bold text-gray-900">My Orders</h2>
      </div>

      {/* Orders list */}
      {orders.length != 0 ? (
        <div className="flex flex-col-reverse lg:flex md:grid grid-cols-2 gap-3">
          {orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </div>
      ) : (
        <div className="text-2xl font-semibold text-slate-600 flex justify-center m-[35vh]">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default Orders;
