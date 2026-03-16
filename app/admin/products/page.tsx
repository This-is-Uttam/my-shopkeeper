"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";


const AdminProductPage = () => {
  const router = useRouter();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div onClick={() => router.push("/admin/products/add-product")} className="bg-blue-500 p-2 px-5 cursor-pointer hover:bg-blue-600 text-white rounded-lg font-semibold">Add Product</div>
      </div>

      {/* Page Content */}
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product Image</TableHead>
              <TableHead className="w-[100px]">Product Id</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-right">Product Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProductPage;
