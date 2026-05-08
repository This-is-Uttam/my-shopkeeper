"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Boxes, ShoppingCart } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BsHeart } from "react-icons/bs";
import { CgMore } from "react-icons/cg";
import { FcAbout } from "react-icons/fc";
import { FaHome, FaPhone } from "react-icons/fa";
import { useAppSelector } from "@/app/hook";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const items = useAppSelector((state) => state.cart.items);
  const currentUser = useUser()
  let totalCartItems: number = 0;

  console.log("is user signedin: ",currentUser.isSignedIn," loaded: ", currentUser.isLoaded )

  if (currentUser.isLoaded && currentUser.isSignedIn) {
    totalCartItems = items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  }

  return (
    <nav className="shadow-md sticky top-0 left-0 w-full backdrop-blur-sm z-50">
      <div className="max-w-8xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold flex text-blue-600 gap-1 items-center"
        >
          <Image
            width={1980}
            height={1080}
            src="/logo.png"
            unoptimized
            alt=""
            className="w-10"
          />
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-3 font-medium text-gray-700">
          <li>
            <Link
              href="/"
              className="hover:text-blue-600  font-bold flex gap-1 items-center  px-2 py-1 border-white  rounded-[8px]"
            >
              <FaHome className="w-[16px] text-blue-600 " />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-blue-600  font-bold  flex gap-1 items-center  px-2 py-1 border-white  rounded-[8px]"
            >
              <Boxes className="w-[16px] text-blue-600 " />
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-blue-600  font-bold  flex gap-1 items-center  px-2 py-1 border-white  rounded-[8px]"
            >
              <FcAbout className="w-[16px] text-blue-600 " />
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-blue-600  font-bold  flex gap-1 items-center  px-2 py-1 border-white  rounded-[8px]"
            >
              <FaPhone className="w-[12px] text-blue-600 rotate-90" />
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex gap-4 items-center">
          {/* Cart Button */}
          <div
            onClick={() => {
              router.push("/cart");
            }}
            className="relative hidden md:block text font-semibold border-2 outline-1 outline-white  rounded-4xl px-4 py-1.5 text-white bg-blue-700 cursor-pointer hover:bg-blue-500 transition"
          >
            <div className="flex gap-1 font-semibold">
              <ShoppingCart />
              Cart
            </div>
            {totalCartItems != 0 && (
              <div className="absolute -top-2 -right-2.5 bg-orange-400 rounded-2xl w-6 text-black text-center">
                {totalCartItems}
              </div>
            )}
          </div>

          {/* Login */}
          <SignedIn>
            <div className="relative hidden h-fit ring-4 ring-blue-200 w-fit md:flex items-center justify-center rounded-[50px] ">
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Wishlist"
                    labelIcon={<BsHeart />}
                    onClick={() => router.push("/wishlist")}
                  />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="More"
                    labelIcon={<CgMore />}
                    onClick={() => router.push("/more")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
            {/* <SignOutButton /> */}
          </SignedIn>
          <SignedOut>
            <div className="text font-semibold border-2 outline-1 outline-white  rounded-4xl px-6 py-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-500 transition">
              <SignInButton />
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden text-gray-700 text-xl"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col gap-4 px-6 py-5 font-medium text-gray-700">
            <div className="flex justify-between">
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="px-6 py-1 w-fit rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Cart
              </Link>

              {/* Login */}
              <SignedIn>
                <div className="relative  h-fit  ring-blue-200 w-fit md:flex items-center justify-center rounded-[50px] ">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="Wishlist"
                        labelIcon={<BsHeart />}
                        onClick={() => router.push("/wishlist")}
                      />
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="More"
                        labelIcon={<CgMore />}
                        onClick={() => router.push("/more")}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
                {/* <SignOutButton /> */}
              </SignedIn>
              <SignedOut>
                <div className="text font-semibold border-2 outline-1 outline-white  rounded-4xl px-6 py-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-500 transition">
                  <SignInButton />
                </div>
              </SignedOut>
            </div>

            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={() => setOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
