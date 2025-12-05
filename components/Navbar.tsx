"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="shadow-md sticky top-0 left-0 w-full bg-white z-50">
      <div className="max-w-8xl mx-auto px-4 py-1.5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          My Shopkeeper
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 font-medium text-gray-700">
          <li>
            <Link href="/" className="hover:text-blue-600  ">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-blue-600  ">
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600 ">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600 ">
              Contact
            </Link>
          </li>
        </ul>

        {/* Cart Button */}

        <Link
          href="/cart"
          className="hidden md:block px-8 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Cart
        </Link>

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
              className="px-4 py-3 w-fit rounded-md bg-blue-600 text-white hover:bg-blue-700"
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
