import Link from "next/link";
import {
  Home,
  MenuIcon,
  Package,
  Settings,
  ShoppingBagIcon,
  User2,
} from "lucide-react";

const Sidebar = () => {
  // const [isSidebarOpen, setisSidebarOpen] = useState(true)

  return (
    <div className="">
      <nav className="max-w-64 bg-white flex items-center p-4 ">
        <MenuIcon className="w-4.5  mr-2" />
        <h2 className="text-xl font-semibold hidden lg:inline-block ml-2 w-[180px]">
          Admin Panel
        </h2>
      </nav>
      <ul className=" flex flex-col items-start">
        <li className="">
          <Link
            href="/admin"
            className="text-gray-700 hover:text-gray-900 flex my-1 mx-2 p-2 px-3 bg-blue-200 rounded-lg font-semibold"
          >
            <Home className="w-4.5 " />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px] ml-2 w-[180px]">
              Dashboard
            </span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/products"
            className="text-gray-700 hover:text-gray-900 flex mx-2 p-2 rounded-md font-semibold"
          >
            <Package className="w-5 mr-2" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">
              Products
            </span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/admin/orders"
            className="text-gray-700 hover:text-gray-900 flex mx-2 p-2 rounded-md font-semibold"
          >
            <ShoppingBagIcon className="w-4.5 mr-2" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">
              Orders
            </span>
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/admin/users"
            className="text-gray-700 hover:text-gray-900 flex mx-2 p-2 rounded-md font-semibold"
          >
            <User2 className="w-4.5 mr-2" />{" "}
            <span className="hidden lg:inline-block ml-2 w-[180px]">Users</span>
          </Link>
        </li>

        <li className="w-full flex items-center">
          <Link
            href="/admin/settings"
            className="text-gray-700 hover:text-gray-900 flex  mx-2 p-2 rounded-md font-semibold"
          >
            <Settings className="w-5 mr-2" />{" "}
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
