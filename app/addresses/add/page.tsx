"use client";

import AddressForm from "@/components/AddressForm";
import { IAddress } from "@/lib/models/Address";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useLargeDataStore } from "@/store/useLargeDataStore";

export default function AddAddressPage() {
  const notify = (e: string) => toast(e);
  const router = useRouter();
  const editedData = useLargeDataStore((state) => state.data);



  const handleAddressSubmit = async (data: any) => {
    console.log(`editedData: ${editedData}`)
    if (editedData != null) {
      // edit the address
      const response = await fetch("/api/address/edit", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (resData.status === 200) notify("Address updated successfully.");
      else notify("Internal server error.");

    } else {
      // create new address
      // here you will send to API
      const response = await fetch("/api/address/create", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (resData.status === 201) notify("Address added successfully.");
      else notify("Internal server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <AddressForm
        editData={editedData}
        onSubmit={async (data) => {
          await handleAddressSubmit(data);
        }}
      />

      <ToastContainer />
    </div>
  );
}
