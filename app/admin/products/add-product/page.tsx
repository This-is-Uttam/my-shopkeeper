"use client";

import { useCallback, useEffect, useState } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import slugify from "slugify";
import { CgAdd } from "react-icons/cg";
import { IProduct } from "@/lib/models/Products";
import { Switch } from "@/components/ui/switch";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
    tags: [] as string[],
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

  const [inputTag, setInputTag] = useState("");

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim() !== "") {
      e.preventDefault();
      const value = inputTag.trim();

    if (!value || formData.tags?.includes(value)) return;
      const tagsArray = [...formData.tags!, inputTag.trim()];
      setFormData((prev) => ({ ...prev, tags: tagsArray }));
      setInputTag("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file: File) => {
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

    return {
      url: data.secure_url as string,
      public_id: data.public_id as string,
    };
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upload images to Cloudinary
    if (isLoading) return;
    setIsLoading(true);

    const uploadedImages = await Promise.all(
      tempImgsFiles.map((imgFile) => uploadToCloudinary(imgFile)),
    );

    const updatedFormData = {
      ...formData,

      images: uploadedImages,
      thumbnail: uploadedImages[0].url,
      slug: createSlug(formData.name || ""),
    };

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

  const removeTag = (tagToRemove: string) => {
    const updatedTags = formData.tags?.filter((tag) => tag !== tagToRemove);
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  }

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

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    required
                    name="tags"
                    placeholder="Enter a tag and press Enter"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />

                  {/* Tags UI */}
                  <div className="flex flex-wrap gap-2 rounded-md p-2">
                    {formData.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-red-500"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                 </div>
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

      <Dialog open={isLoading}>
        <DialogContent className="flex items-center justify-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-black" />
          <p>Submitting product...</p>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default AddProductPage;
