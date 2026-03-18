"use client"

import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/lib/models/Orders";
import { formatDate } from "@/utils/helper2";
import { useEffect, useState } from "react";

const AdminOrderPage = () => {
  const [isLoading, setisLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getAllOrders = async () => {
    const response = await fetch("/api/orders/get-orders-for-admin", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setOrders(resJson.data || []);
    setisLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
      </div>

      {/* Page Content */}

        <div>
              {isLoading ? (
                <Spinner />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-left text-gray-700 font-bold">Order ID</TableHead>
                      <TableHead className="text-left text-gray-700 font-bold">User Id</TableHead>
                      <TableHead className="text-left text-gray-700 font-bold">Order Amount</TableHead>
                      <TableHead className="text-left text-gray-700 font-bold">Order Date</TableHead>
                      <TableHead className="text-center text-gray-700 font-bold">Order Status</TableHead>
                      <TableHead className="text-left text-gray-700 font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-left font-bold">{order._id.toString()}</TableCell>
                          <TableCell className="text-left">{order.userId}</TableCell>
                          <TableCell className="text-left">{order.totalAmount?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</TableCell>
                          <TableCell className="text-left">{formatDate(new Date(order.orderedAt.toString()))}</TableCell>
                          
                          <TableCell className={`flex justify-center`}>
                            <span className={`px-2 py-1 text-xs ${orders[1]?.orderStatus === "DELIVERED" ? "bg-green-200 border border-green-400 text-green-400 font-semibold" : " bg-yellow-200 border border-yellow-400 font-semibold text-yellow-600 rounded"}`}>
                            {order.orderStatus}
                            </span>
                            </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
    </div>
  );
};

export default AdminOrderPage;
