"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";
import { IOrder } from "@/lib/models/Orders";
import { set } from "mongoose";
import { formatDate } from "@/utils/helper2";
import { IUser } from "@/lib/models/User";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);

  const [orderData, setOrderData] = useState<IOrder>();
  const [userData, setUserData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderShipped, setIsOrderShipped] = useState(false);

  const getOrderDetails = async (orderId: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/orders/get-order-by-id-for-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      const resData = await response.json();

      if (resData.success) {
        setOrderData(resData.data);
      } else {
        console.error(resData.message);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/get-user-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      const resData = await response.json();
      console.log("User details fetched from backend:", resData);

      if (resData.success) {
        setUserData(resData.userData);
      } else console.error("Failed to fetch user details:", resData.message);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsShipped = async () => {
    setIsLoading(true);

    try { 
      const response = await fetch("/api/orders/update-order-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData?._id,
          newStatus: "SHIPPED",
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        // Refresh order details to get the updated status
        setIsOrderShipped(true);
        getOrderDetails(orderId);
      } else {
        console.error("Failed to update order status:", resData.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }

  };

  // useEffect(() => {
  //   if (!orderId) return;
  //     orderData?.orderStatus === "SHIPPED" && setIsOrderShipped(true);
  // }, []);

  useEffect(() => {
    if (!orderId) return;

    getOrderDetails(orderId);
  }, [orderId]);

  useEffect(() => {
    if (orderData?.userId) {
      orderData?.orderStatus === "SHIPPED" && setIsOrderShipped(true);
      getUserDetails(orderData.userId);
    }
  }, [orderData?.userId]);

  // if (isLoading) {
  //   return <div></div>;
  // }

  // if (!orderData) {
  //   return <div className="p-6">No data found</div>;
  // }

  return (
    <div className="space-y-6 p-6">
      {/* Order Summary */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Order ID: {orderData?._id.toString()}</CardTitle>
          <div className="font-semibold">
            Order Status : <Badge>{orderData && `${orderData?.orderStatus}`}</Badge>
          </div>
        </CardHeader>

        <CardContent className="flex justify-between text-sm">
          <p>Placed on {formatDate(orderData?.orderedAt!)}</p>
          <p className="text-lg font-semibold">₹{orderData?.totalAmount}</p>
        </CardContent>
      </Card>

      {/* Customer + Shipping */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>

          <CardContent className="space-y-1 text-sm">
            <p>
              <b>Name:</b> {userData?.fullName}
            </p>
            <p>
              <b>Email:</b> {userData?.email}
            </p>
            <p>
              <b>Phone:</b> {userData?.phone}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>

          <CardContent className="text-sm space-y-1">
            <p>
              {orderData?.address.addressLine2 +
                ", " +
                orderData?.address.addressLine1}
            </p>
            <p>{orderData?.address.city}</p>
            <p>{orderData?.address.state}</p>
            <p>{orderData?.address.pincode}</p>
          </CardContent>
        </Card>
      </div>

      {/* Ordered Items */}
      <Card>
        <CardHeader>
          <CardTitle>Ordered Items</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-2">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {orderData?.items.map((item) => (
                <tr key={item.productId.toString()} className="border-b">
                  <td className="flex items-center gap-3 py-3">
                    <img
                      src={item.image}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    {item.name}
                  </td>

                  <td>₹{item.priceAtThatTime}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.priceAtThatTime * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-2 text-sm">
          <p>
            <b>Payment Method:</b> {orderData?.paymentMethod}
          </p>
          {/* <p>
            <b>Payment ID:</b> {order.payment.paymentId}
          </p>
          <p>
            <b>Status:</b> {order.payment.status}
          </p>
          <p>
            <b>Paid On:</b> {order.payment.date}
          </p> */}
        </CardContent>
      </Card>

      {/* Order Timeline 
       <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {order.timeline.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-black" />

              <div>
                <p className="text-sm font-medium">{step.status}</p>
                <p className="text-xs text-gray-500">{step.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card> 
      */}

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-3">
          <Button disabled={isOrderShipped} onClick={markAsShipped}>
            {isOrderShipped ? `Order Shipped` : `Mark as Shipped`}
          </Button>
          <Button variant="secondary">Add Tracking</Button>
          <Button variant="destructive">Cancel Order</Button>
        </CardContent>
      </Card>
    

    {/* Loading Dialog */}

    <Dialog open={isLoading}>
        <DialogContent className="flex items-center justify-center gap-3">
          <DialogTitle/>
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-black" />
          <p>Loading, Please wait...</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
