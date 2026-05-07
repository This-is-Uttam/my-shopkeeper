"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  CartItem,
  setCart,
} from "@/features/cart/cartSlice";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";



const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const deliveryCharges = 40;
  const dispatch = useAppDispatch();
  const router = useRouter();

  // console.log("cart Items: ", cartItems);

  const totalItems = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const totalDiscountedPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.discountPrice * curr.quantity;
  }, 0);

  const payableAmount = totalDiscountedPrice + deliveryCharges;

  // getting cart details
  const syncCart = async (cartItems: CartItem[]) => {

    const response = await fetch("/api/cart/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtThatTime: item.discountPrice || item.price,
        })),
      }),
    });

    const resData = await response.json();
    const { cart } = resData;
    // const cart: CartItem[] = cart;

    dispatch(setCart(cart));
  };

  

  useEffect(() => {
    if (cartItems.length === 0) return;
    syncCart(cartItems);
  }, [cartItems]);


  return (
    <div className="w-fit m-auto mb-4 p-4">
      {/* Header */}
      <div className="w-[85vw] md:px-12 md:my-1 md:mb-8 mb-3 flex justify-between  items-baseline">
        <h2 className="text-[24px] font-bold text-gray-900">My Cart</h2>


      </div>

      {/* main */}
      <div className=" flex justify-center lg:flex-row flex-col gap-8">
        {/* productDetails */}
        <div className=" flex flex-col gap-3">
          {cartItems.map((item, index) => (
            <div className="lg:w-[50vw]  w-full border-2 rounded-2xl md:px-4 py-3 productDetails p-2 flex  gap-5">
              {/* Product Image and quantity */}
              <div className="productImage">
                <Image
                  width={1980}
                  height={1080}
                  src={item.image}
                  alt=""
                  unoptimized
                  className="w-28 h-24 m-auto rounded-[8px] mb-2 object-contain"
                />

                {/* Quantity */}
                <div className="flex gap-2 h-auto">
                  <button
                    disabled={item.quantity == 1}
                    onClick={async () => {
                      dispatch(decreaseQuantity(item.productId));
                    }}
                    className="bg-blue-500 w-6.5 pb-0.5 cursor-pointer font-bold text-white text-center rounded-2xl disabled:bg-blue-300"
                  >
                    -
                  </button>
                  Qty: <b>{item.quantity}</b>
                  <button
                    onClick={async () => {

                      dispatch(increaseQuantity(item.productId));
                      console.log("cartitem incart: ", cartItems);
                    }}
                    className="bg-blue-500 w-6.5 pb-0.5 cursor-pointer font-bold text-white text-center rounded-2xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Product Name and Remove icon*/}
              <div className="w-full">
                <div className="lg:text-xl font-semibold flex justify-between">
                  {item.name}
                  <MdClose
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="border-2 cursor-pointer size-8 hover:bg-red-400 rounded-2xl p-1"
                  />
                </div>
                {/* Delivery */}
                <div className="text-gray-600 text-sm md:text-lg">
                  Delivered in <strong className="text-black">4 - 6 days</strong> ,
                  Thu 4 Dec
                </div>
                {/* Product Price */}
                <div>
                  <div className="text-xl font-bold text-gray-800 mt-4">
                    ₹{item.discountPrice}
                  </div>
                  <div className="line-through font-semibold text-gray-600">
                    ₹{item.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* priceDetails */}
        {cartItems.length != 0 ? (
          <div className="priceDetails lg:w-[25vw] w-full  h-fit border-slate-300  lg:mx-8 px-4 py-3   border rounded-lg p-5">
            <div className="text-[18px] font-semibold m-auto w-fit">
              Price Details
            </div>
            <div className="my-4x" >
              <div className="flex justify-between">
                <div>Total Price [Items: {totalItems}]</div>
                <div className="font-semibold">₹{totalPrice}</div>
              </div>

              <div className="flex justify-between">
                <div>Discounted Price</div>
                <div className="text-green-600 font-semibold">₹{totalDiscountedPrice}</div>
              </div>

              <div className="flex justify-between">
                <div>TDS</div>
                <div className="font-semibold">₹0</div>
              </div>

              <div className="flex justify-between">
                <div>Delivery Charges</div>
                <div className="font-semibold">₹40</div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-[18px]">
                <div>Amount Payable</div>
                <div>₹{payableAmount}</div>
              </div>

              {/* Place order button */}

              <div onClick={() => router.push("/checkout")} className="bg-blue-500 hover:scale-[1.02] text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-600 cursor-pointer my-5 transition">
                Checkout
              </div>
            </div>
          </div>
        ) : (
          <div className="w-fit m-auto mb-10">
            <Image
              // onClick={() => { setImgIndex(index) }}
              width={1980}
              height={1080}
              src={"/empty_cart.svg"}
              alt=""
              unoptimized
              className="w-80 rounded-[8px] py-2"
            />
            <div className="text-2xl text-slate-600 font-bold text-center">
              cart is empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
