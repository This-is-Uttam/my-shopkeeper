"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Boxes, BubblesIcon, Home, MessageCircle, MessageCircleCode, Phone, ShoppingCart } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BsHeart } from "react-icons/bs";
import { CgMore } from "react-icons/cg";
import { FcAbout } from "react-icons/fc";
import { LuContact } from "react-icons/lu";
import { FaHeadphones, FaHome, FaPhone } from "react-icons/fa";
import { FaMessage, FaPerson, FaRegMessage } from "react-icons/fa6";
import { TbMessageCircleCode } from "react-icons/tb";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const signup = () => {
    console.log("signup User");
  };

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
            <Link href="/" className="hover:text-blue-600  font-bold flex gap-1 items-center border px-2 py-1 border-white hover:border-gray-300 rounded-[8px]">
              <FaHome className="w-[16px] text-blue-600 "/>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-blue-600  font-bold  flex gap-1 items-center border px-2 py-1 border-white hover:border-gray-300 rounded-[8px]">
            <Boxes className="w-[16px] text-blue-600 "/>
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600  font-bold  flex gap-1 items-center border px-2 py-1 border-white hover:border-gray-300 rounded-[8px]">
            <FcAbout className="w-[16px] text-blue-600 "/>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600  font-bold  flex gap-1 items-center border px-2 py-1 border-white hover:border-gray-300 rounded-[8px]">
            <FaPhone className="w-[16px] text-blue-600 rotate-90"/>
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
            className="hidden md:block text font-semibold border-2 outline-1 outline-white  rounded-4xl px-4 py-1.5 text-white bg-blue-700 cursor-pointer hover:bg-blue-500 transition"
          >
            <div className="flex gap-1 font-semibold">
              <ShoppingCart />
              Cart
            </div>
          </div>

          {/* Login */}

          {/* <div className="flex items-center ">
            <div
              onClick={() => signup()}
              className="text font-semibold border-2 outline-1 outline-white  rounded-4xl px-4 py-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-500 flex items-center gap-2"
            >
              <LogInIcon />
              Login
            </div>
          </div> */}

          <SignedIn>
            <div className="h-fit ring-4 ring-blue-200  w-fit flex items-center justify-center rounded-[50px] ">
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

          {/* profile */}
          {/* <ProfileCard/> */}

          {/* <div className="h-9 overflow-hidden flex items-center rounded-4xl outline-3 outline-blue-500 cursor-pointer">
            <Image
              width={1980}
              height={1080}
              src="/person.jpg"
              alt=""
              unoptimized
              className="w-9  rounded-4xl ring-4"
            />
          </div> */}
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

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="px-4 py-0 w-fit rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Cart
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
