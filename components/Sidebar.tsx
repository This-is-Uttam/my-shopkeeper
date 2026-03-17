"use client";

import Link from "next/link";
import {usePathname} from 'next/navigation'
import {
  Home,
  MenuIcon,
  Package,
  Settings,
  ShoppingBagIcon,
  User2,
} from "lucide-react";

const Sidebar = () => {
  // const [isSidebarOpen, setisSidebarOpen] = useState(true).
  const pathname = usePathname();

  const activeClass = (path: string) =>
    `flex mx-2 p-2 rounded-md font-semibold ${
      pathname === path
        ? "bg-blue-200 text-gray-900"
        : "text-gray-700 hover:text-gray-900"
    }`;

  return (
    <div className="">
      <nav className="max-w-64 bg-white flex items-center p-4 ">
        <MenuIcon className="w-4.5  mx-1" />
        <h2 className="text-xl font-semibold hidden lg:inline-block ml-2 w-[180px]">
          Admin Panel
        </h2>
      </nav>
      <ul className=" flex flex-col items-start">
        <li className="">
          <Link
            href="/admin"
            className={activeClass("/admin")}
          >
            <Home className="w-4.5 mx-1" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">
              Dashboard
            </span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/products"
            className={activeClass("/admin/products")}
          >
            <Package className="w-5 mx-1" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">
              Products
            </span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/orders"
            className={activeClass("/admin/orders")}
          >
            <ShoppingBagIcon className="w-4.5 mx-1" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">
              Orders
            </span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/admin/users"
            className={activeClass("/admin/users")}
          >
            <User2 className="w-4.5 mx-1" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">Users</span>
          </Link>
        </li>

        <li className="w-full flex items-center">
          <Link
            href="/admin/settings"
            className={activeClass("/admin/settings")}
          >
            <Settings className="w-5 mx-1" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">
              Settings
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
