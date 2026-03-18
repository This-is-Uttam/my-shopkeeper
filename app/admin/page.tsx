"use client";

import { Spinner } from "@/components/ui/spinner";
import { IOrder } from "@/lib/models/Orders";
import { IProduct } from "@/lib/models/Products";
import { IUser } from "@/lib/models/User";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/utils/helper2";

export default function AdminDashboardPage() {
  // TEMP dummy stats (will come from API later)

  const [isLoading, setisLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  // get all orders
  const getAllOrders = async () => {
    const response = await fetch("/api/orders/get-orders-for-admin", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setOrders(resJson.data || []);
  };

  // get all products
  const getAllProducts = async () => {
    const response = await fetch("/api/product/get-product-for-admin", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setProducts(resJson.products || []);
  };

  // get all users
  const getAllUsers = async () => {
    const response = await fetch("/api/user/get-users-for-admin", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setUsers(resJson.users || []);
  };

  const getOrdersCount = () => {
    return orders.length;
  };

  const getRevenue = () => {
    const total = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0,
    );
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const getUsersCount = () => {
    return users.length;
  };

  const getTodayOrdersCount = () => {
    const today = new Date();
    const count = orders.filter((order) => {
      const orderDate = new Date(order.orderedAt);
      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }).length;
    return count;
  };

  const stats = [
    { title: "Total Orders", value: getOrdersCount() },
    { title: "Total Revenue", value: getRevenue() },
    { title: "Users", value: getUsersCount() },
    { title: "Orders Today", value: getTodayOrdersCount() },
  ];

  const fetchDashboardData = async () => {
    setisLoading(true);

    try {
      await Promise.all([getAllOrders(), getAllProducts(), getAllUsers()]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of MyShopkeeper activity</p>
      </div>

      {/* Page Content */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white border rounded-lg p-5 shadow-sm"
              >
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          {/* Quick Actions */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/admin/orders"
                className="px-5 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              >
                View Orders
              </Link>

              <Link
                href="/admin/products"
                className="px-5 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900"
              >
                Manage Products
              </Link>

              <Link
                href="/admin/products/add-product"
                className="px-5 py-3 border border-black rounded-md font-medium hover:bg-gray-100"
              >
                Add New Product
              </Link>
            </div>
          </div>
          {/* Recent Orders Preview */}
          <div className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <a
                href="/admin/orders"
                className="text-sm text-blue-600 hover:underline"
              >
                View all
              </a>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-left text-gray-700 font-bold">
                      Order ID
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      User Id
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Order Amount
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Order Date
                    </TableHead>
                    <TableHead className="text-center text-gray-700 font-bold">
                      Order Status
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={0}>
                    <TableCell className="text-left font-bold">
                      {orders[0]?._id.toString()}
                    </TableCell>
                    <TableCell className="text-left">{orders[0]?.userId}</TableCell>
                    <TableCell className="text-left">
                      {orders[0]?.totalAmount?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </TableCell>
                    <TableCell className="text-left">
                      {formatDate(new Date(orders[0]?.orderedAt.toString()))}
                    </TableCell>

                    <TableCell className={`flex justify-center`}>
                      <span
                        className={`px-2 py-1 text-xs ${orders[1]?.orderStatus === "DELIVERED" ? "bg-green-200 border border-green-400 text-green-400 font-semibold" : " bg-yellow-200 border border-yellow-400 font-semibold text-yellow-600 rounded"}`}
                      >
                        {orders[0]?.orderStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                  {/* --- */}
                  <TableRow key={1}>
                    <TableCell className="text-left font-bold">
                      {orders[1]?._id.toString()}
                    </TableCell>
                    <TableCell className="text-left">{orders[1]?.userId}</TableCell>
                    <TableCell className="text-left">
                      {orders[1]?.totalAmount?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </TableCell>
                    <TableCell className="text-left">
                      {formatDate(new Date(orders[1]?.orderedAt.toString()))}
                    </TableCell>

                    <TableCell className={`flex justify-center`}>
                      <span
                        className={`px-2 py-1 text-xs ${orders[1]?.orderStatus === "DELIVERED" ? "bg-green-200 border border-green-400 text-green-400 font-semibold" : " bg-yellow-200 border border-yellow-400 font-semibold text-yellow-600 rounded"}`}
                      >
                        {orders[1]?.orderStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
