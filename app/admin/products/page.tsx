"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/lib/models/Products";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AdminProductPage = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  const getAllProducts = async () => {
    const response = await fetch("/api/product/get-product-for-admin", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setProducts(resJson.products || []);
    setisLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div
          onClick={() => router.push("/admin/products/add-product")}
          className="bg-blue-500 p-2 px-5 cursor-pointer hover:bg-blue-600 text-white rounded-lg font-semibold"
        >
          Add Product
        </div>
      </div>

      {/* Page Content */}

      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-left text-gray-700 font-bold">Product Image</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">Product Id</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">Product Name</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">Product Price</TableHead>
                <TableHead className="text-left text-gray-700 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left">
                      {
                        <img
                          src={product.images[0]}
                          alt="Product Image"
                          className="object-contain size-10 "
                        />
                      }
                    </TableCell>
                    <TableCell className="text-left font-bold">{product._id.toString()}</TableCell>
                    <TableCell className="text-left">{product.name}</TableCell>
                    <TableCell className="text-left">₹{product.discountPrice?.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-left py-10">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminProductPage;
