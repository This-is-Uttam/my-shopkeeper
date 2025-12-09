"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#04456d] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">{process.env.NEXT_PUBLIC_APP_NAME}</h2>
          <p className="text-sm leading-6">
           <b>{process.env.NEXT_PUBLIC_APP_NAME}</b> is your trusted online marketplace.  
            Get quality products at best prices with fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Help & Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
            <li><Link href="/returns" className="hover:text-white">Returns & Refunds</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <Link href="#">
              <FaFacebook className="hover:text-white" />
            </Link>
            <Link href="#">
              <FaInstagram className="hover:text-white" />
            </Link>
            <Link href="#">
              <FaTwitter className="hover:text-white" />
            </Link>
            <Link href="#">
              <FaGithub className="hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-10" />

      {/* Bottom Line */}
      <p className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
