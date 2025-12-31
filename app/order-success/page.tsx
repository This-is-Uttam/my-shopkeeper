"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

function OrderSuccessInner({
  onOrderId,
}: {
  onOrderId: (id: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    onOrderId(orderId);
  }, [orderId, onOrderId]);

  return null;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  const [orderDetails, setOrderDetails] = useState<{
    totalAmount: string;
    paymentMethod: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
  } | null>(null);

  const getOrderDetails = async () => {
    if (!orderId) return;

    const response = await fetch(`/api/orders/get-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    const resData = await response.json();

    const {
      totalAmount,
      paymentMethod,
      address: { addressLine1, addressLine2, city, state, pincode },
    } = resData.data;

    setOrderDetails({
      totalAmount,
      paymentMethod,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
    });
  };

  useEffect(() => {
    if (orderId) {
      getOrderDetails();
    }
  }, [orderId]);

  return (
    <>
      <Suspense fallback={null}>
        <OrderSuccessInner onOrderId={setOrderId} />
      </Suspense>

      <div className="min-h-[70vh] flex items-center justify-center px-4 my-6">
        <div className="max-w-lg w-full bg-white border rounded-xl p-8 text-center shadow-sm">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mt-2">
            Thank you for shopping with <strong>MyShopkeeper</strong>.
            <br />
            Your order has been confirmed.
          </p>

          <div className="mt-6 border rounded-lg p-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Amount</span>
              <span className="font-medium">₹{orderDetails?.totalAmount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">Cash On Delivery</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">4–6 days</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivering to</span>
              <span className="w-[50%] text-right font-medium">
                {orderDetails?.addressLine1}, {orderDetails?.addressLine2},{" "}
                {orderDetails?.city}, {orderDetails?.state} -{" "}
                {orderDetails?.pincode}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => router.push("/orders")}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              View Order
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full border py-3 rounded-md font-semibold hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-5">
            You’ll receive order updates via SMS & email.
          </p>
        </div>
      </div>
    </>
  );
}
