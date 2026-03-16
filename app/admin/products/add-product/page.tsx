"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ImageDropzone from "@/components/ImageDropzone";
import slugify from "slugify";
import { CgAdd } from "react-icons/cg";
import { IProduct } from "@/lib/models/Products";
import { Switch } from "@/components/ui/switch";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";

const AddProductPage = () => {
  const [formData, setFormData] = useState<Partial<IProduct>>({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: 0,
    discountPrice: 0,
    currency: "INR",
    images: [],
    thumbnail: "",
    category: "",
    subCategory: "",
    tags: [],
    stock: 0,
    brand: "",
    isFeatured: false,
    createdBy: "",
  });

  const [tempImgsFiles, setTempImgsFiles] = useState<File[]>([]);

  const notify = (e: string) => toast(e);

  const createSlug = (productName: string) => {
    const baseSlug = slugify(productName, {
      lower: true,
      strict: true,
    });
    return `${baseSlug}-${nanoid(6)}`;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleImagesChange = useCallback((imageFiles: File[]) => {
    setTempImgsFiles(imageFiles);

  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    // if input is tags
    if (name === "tags") {
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      setFormData((prev) => ({
        ...prev,
        tags: tagsArray,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const uploadToCloudinary = async (file: File) => {
    console.log("upLoading started....", file.name);

    const formDataCloudinary = new FormData();
    formDataCloudinary.append("file", file);
    formDataCloudinary.append("upload_preset", "product_uploads");
    formDataCloudinary.append(
      "cloud_name",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formDataCloudinary,
      },
    );

    const data = await res.json();

    return data.secure_url as string;
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    // Upload images to Cloudinary
    if (isLoading) return;
    setIsLoading(true);

    const uploadedImageUrls: string[] = await Promise.all(
      tempImgsFiles.map((imgFile) => uploadToCloudinary(imgFile)),
    );

    const updatedFormData = {
      ...formData,
      
      images: uploadedImageUrls,
      thumbnail: uploadedImageUrls[0],
      slug: createSlug(formData.name || ""),
    };

    console.log("Updated FormData:", updatedFormData);

    // Send form data to the API route
    const response = await fetch("/api/product/add-product", {
      method: "POST",
      body: JSON.stringify(updatedFormData),
    });

    const resData = await response.json();
    if (resData.status === 201) notify("Product added successfully!");
    else notify("Failed to add product.");

    setIsLoading(false);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add Your Product</h1>
        <button
          type="submit"
          form="productForm"
          className={`bg-blue-500 p-2 px-5 cursor-pointer hover:bg-blue-600 text-white rounded-lg font-semibold ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <CgAdd className="inline mr-1 text-lg mb-1" />
          Add Product
        </button>
      </div>

      {/* Page Content */}
      <div>
        {/* Add product form components here */}
        <form
          id="productForm"
          onSubmit={handleAddProduct}
          className="bg-white rounded-lg shadow-md p-8 w-full  m-auto"
        >
          <div className="space-y-6 flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 my-2">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="Enter Product name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 my-2">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  name="shortDescription"
                  placeholder="Product Short Description"
                  value={formData?.shortDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  placeholder="Product Long Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    DiscountPrice
                  </label>
                  <input
                    type="number"
                    required
                    name="discountPrice"
                    placeholder="0.00"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option>Select a category</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    required
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option>Select a category</option>
                    <option>Phones</option>
                    <option>TVs</option>
                    <option>Washing Machines</option>
                  </select>
                </div>
              </div>

              {/* Stock and Featured Product */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    name="stock"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    required
                    name="tags"
                    placeholder="book, cloth, phone"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    required
                    name="brand"
                    placeholder="Apple, Samsung, Nike"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Featured Product */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Featured Product
                  </label>
                  <Switch
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isFeatured: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                Product Images
              </label>

              <ImageDropzone onImagesChange={handleImagesChange} />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductPage;
