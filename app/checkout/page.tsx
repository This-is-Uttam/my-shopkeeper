"use client";

import { CartItem } from "@/features/cart/cartSlice";
import { IAddress } from "@/lib/models/Address";
import { IOrderItem } from "@/lib/models/Orders";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { clearCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/app/hook";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [address, setAddress] = useState<IAddress>({
    clerkId: "",
    fullName: "______ _______",
    addressLine1: "_________________________",
    addressLine2: "_________________________",
    city: "_______",
    state: "_______",
    pincode: "_____",
    phone: "____________",
    landmark: "",
    isDefault: false,
  });

  const [disableBtn, setDisableBtn] = useState(false)

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [ordersItems, setOrdersItems] = useState<IOrderItem[]>([]);
  const deliveryCharge = 40;

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<Number>();

  const [isAddressChange, setIsAddressChange] = useState(false);

  const [addresses, setaddresses] = useState<IAddress[]>([]);

  // Get default address from database
  const getDefaultAddress = async () => {
    const response = await fetch("/api/address/default", {
      method: "GET",
      credentials: "include",
    });
    const resJson = await response.json();
    setAddress(resJson.data[0]);
  };

  // get available addresses from database
  const changeAddress = async () => {
    // fetch address from database or allow user to change
    const response = await fetch("/api/address/get-addresses", {
      method: "GET",
      credentials: "include",
    });
    const resJson = await response.json();
    setaddresses(resJson.data || []);
    setIsAddressChange(!isAddressChange);
  };

  // Get all cart items from database
  const getCart = async () => {
    const response = await fetch("/api/cart/sync", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    const { cart } = resData;
    // console.log("resData cart updated: ", JSON.stringify(cart));

    const ordersItems = cart.map((item: CartItem) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      priceAtThatTime: item.discountPrice,
    }));
    setOrdersItems(ordersItems);
  };

  const addAddress = () => {
    router.push("/addresses/add");
  }

  // place order logic
  const handlePlaceOrder = async () => {
    // disable the place order button
    setDisableBtn(true)
    // call the api to place order
    const response = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: ordersItems,
        address,
        totalAmount: payableAmount,
        paymentMethod: "COD",
        orderStatus: "PLACED",
      }),
    });

    const resJson = await response.json();
    // enable the place order button
    setDisableBtn(false)

    if (resJson.status == 201) {
      // order placed successfully

      // clear cart in database
      const response = await fetch("/api/cart/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      console.log("Cart cleared: ", resData);
      // clear the cart in redux store
      dispatch(clearCart());
      // redirect to order confirmation / order details page
      router.push(`/order-success?orderId=${resJson.orderId}`);
    }
  };

  const totalItems = ordersItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = ordersItems.reduce((acc, curr) => {
    return acc + curr.priceAtThatTime * curr.quantity;
  }, 0);

  const payableAmount = totalPrice + deliveryCharge;

  useEffect(() => {
    getDefaultAddress();
    getCart();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address */}
          <div className="border  rounded-lg p-5">
            {isAddressChange ? (
              addresses.map((item, i) => (
                <div key={i} className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="address"
                      id={`address-${i}`}
                      className="cursor-pointer my-1"
                      value={i}
                      checked={selectedAddressIndex === i}
                      onChange={(e) =>
                        setSelectedAddressIndex(Number(e.target.value))
                      }
                    />
                    <label
                      htmlFor={`address-${i}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      <strong>{item.fullName}</strong>
                      <br />
                      {item.addressLine1} {item.addressLine2}
                      <br />
                      {item.city}, {item.state} – {item.pincode}
                      <br />
                      Phone: {item.phone}
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold mb-3">Delivery Address</h2>
                  {address && (
                    <p className="text-sm text-gray-700">
                      <strong>{address?.fullName}</strong>
                      <br />
                      {address?.addressLine1} {address?.addressLine2}
                      <br />
                      {address?.city}, {address?.state} – {address?.pincode}
                      <br />
                      Phone: {address?.phone}
                    </p>
                  )}
                </div>
                <button
                  onClick={address ? changeAddress : addAddress}
                  className="text-blue-600 cursor-pointer text-sm font-medium"
                >
                  {address ? "Change" : "Add Address"}
                </button>
              </div>
            )}

            {isAddressChange && (
              <button
                onClick={() => {
                  addresses[selectedAddressIndex as number];
                  setAddress(addresses[selectedAddressIndex as number]);
                  setIsAddressChange(false);
                }}
                className="text-white p-2 px-4 rounded-4xl  bg-blue-600 text-sm font-medium mx-4 cursor-pointer hover:bg-blue-700"
              >
                Select Address
              </button>
            )}
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg p-5">
            <h2 className="font-bold mb-4">Payment Methods</h2>

            <label className="flex items-center gap-2 text-sm">
              <input type="radio" checked readOnly />
              Cash on Delivery
            </label>
          </div>

          {/* productDetails */}
          <div className=" flex flex-col gap-3  border rounded-lg p-5">
            <h2 className="font-bold mb-4">Products</h2>

            {ordersItems.map((item, index) => (
              <div className=" border rounded-2xl px-4 py-3 productDetails p-2 flex  gap-5">
                {/* Product Image and quantity */}
                <div className="productImage">
                  <Image
                    // onClick={() => { setImgIndex(index) }}
                    width={1980}
                    height={1080}
                    src={item.image}
                    alt=""
                    unoptimized
                    className="w-28 m-auto rounded-[8px] mb-2"
                  />
                </div>

                <div className="w-full">
                  {/* Product Name and Remove icon*/}
                  <div className=" font-semibold flex justify-between">
                    {item.name}

                    <div className="font-bold text-gray-800 ">
                      ₹{item.priceAtThatTime}
                    </div>
                  </div>
                  {/* Delivery */}
                  <div className="text-gray-600 text-sm">
                    Delivered in{" "}
                    <strong className="text-black">4 - 6 days</strong> , Thu 4
                    Dec
                  </div>
                  {/* Product Price */}
                  <div>
                    {/* Quantity */}
                    <div className="flex gap-2 h-auto">
                      Qty: <b>{item.quantity}</b>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="font-semibold mb-4">Price Details</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Price ({totalItems} items)</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <div>TDS</div>
              <div>₹0</div>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <hr />

            <div className="flex justify-between text-base text-[18px] font-bold">
              <span>Amount Payable</span>
              <span>₹{payableAmount}</span>
            </div>
          </div>

          {/* Place Order */}
          <button disabled={disableBtn || ordersItems.length === 0 || !address}
            onClick={handlePlaceOrder}
            className="w-full mt-6 cursor-pointer bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 "
          >
            Place Order
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            By placing your order, you agree to MyShopkeeper’s terms.
          </p>
        </div>
      </div>
    </div>
  );
}
