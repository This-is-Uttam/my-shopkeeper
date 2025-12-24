"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { IAddress } from "@/lib/models/Address";

type AddressFormProps = {
  onSubmit: (data: any) => void;
  editData?: IAddress;
};

export default function AddressForm({ onSubmit, editData }: AddressFormProps) {
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  // editData && setData({...editData})

  useEffect(() => {
    if (editData) {
      setData({ ...editData });
    }
  }, [editData]);

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="max-w-lg mx-auto bg-white border rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Address</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.fullName}
            required
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Phone Number"
            value={data.phone}
            required
            onChange={(e) => handleChange("phone", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="House / Flat / Building (optional)"
            value={data.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Area / Colony / Locality"
            value={data.addressLine1}
            required
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Landmark (optional)"
            value={data.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="City"
            value={data.city}
            required
            onChange={(e) => handleChange("city", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="State"
            value={data.state}
            required
            onChange={(e) => handleChange("state", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Pincode"
            value={data.pincode}
            required
            onChange={(e) => handleChange("pincode", e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full text-center cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white py-3 my-4 rounded-md font-medium"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
