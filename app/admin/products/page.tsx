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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { IProduct } from "@/lib/models/Products";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

const AdminProductPage = () => {
  const router = useRouter();
  const notify = (e: string) => toast(e);
  const [isLoading, setisLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  // toggle selection
  const toggleSelection = (id: string) => {
    setSelectedItems((itemIds) =>
      itemIds.includes(id)
        ? itemIds.filter((itemId) => itemId != id)
        : [...itemIds, id],
    );
  };

  // select all items
  const selectAllItems = () => {
    if (selectedItems.length == products.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(() => products.map((i) => i._id.toString()));
    }
  };

  const deleteSelectedItems = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch("/api/product/delete-product-for-admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedItems,
        }),
      });
      const resData = await response.json();

      if (resData.status == 200) notify("Products deleted successfully!");
      else notify("Failed to delete products!");
    } catch (error) {
      notify("An error occurred while deleting products!");
      console.error("Error deleting products: ", error);
    } finally {
      setIsDeleting(false);
      setSelectedItems([]);
      getAllProducts();
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size={"lg"}
                disabled={selectedItems.length == 0 || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product(s) from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={deleteSelectedItems}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div
            onClick={() => router.push("/admin/products/add-product")}
            className="bg-blue-500 p-2 px-5 cursor-pointer hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            Add Product
          </div>
        </div>
      </div>

      {/* Page Content */}

      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {products.length > 0 ? (
              // Products Table

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-left text-gray-700 font-bold">
                      <Checkbox
                        checked={
                          selectedItems.length == products.length &&
                          products.length > 0
                        }
                        onCheckedChange={selectAllItems}
                      />
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Product Image
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Product Id
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Product Name
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Product Price
                    </TableHead>
                    <TableHead className="text-left text-gray-700 font-bold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-left text-gray-700 font-bold">
                        <Checkbox
                          checked={selectedItems.includes(
                            product._id.toString(),
                          )}
                          onCheckedChange={() =>
                            toggleSelection(product._id.toString())
                          }
                        />
                      </TableCell>
                      <TableCell className="text-left">
                        {
                          <img
                            src={product.images[0]?.url}
                            alt="Product Image"
                            className="object-contain size-10 "
                          />
                        }
                      </TableCell>
                      <TableCell className="text-left font-bold">
                        {product._id.toString()}
                      </TableCell>
                      <TableCell className="text-left max-w-[150px] truncate ">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-left">
                        {product.discountPrice?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center h-40 w-full">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminProductPage;
