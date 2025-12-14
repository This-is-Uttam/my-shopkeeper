"use client";

import { useEffect, useState } from "react";
import AddressCard from "@/components/AddressCard";
import { useRouter } from "next/navigation";
import { IAddress } from "@/lib/models/Address";
import { ToastContainer, toast } from "react-toastify";
import { useLargeDataStore } from "@/store/useLargeDataStore";

export default function AddressPage() {
  const notify = (e: string) => toast(e);
  const router = useRouter();
  const setData = useLargeDataStore((state) => state.setData);
  const [addresses, setaddresses] = useState<IAddress[]>([]);
  const [addArr, setaddArr] = useState([]);

  const getAddresses = async () => {
    const response = await fetch("/api/address/get-addresses", {
      method: "GET",
      credentials: "include",
    });

    const resJson = await response.json();
    setaddresses(resJson.data || []);
    setaddArr(resJson.data || []);
    console.log(resJson.data);
  };

  useEffect(() => {
    getAddresses();
  }, []); // empty dependency array = run once

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>

        <button
          onClick={() => router.push("/addresses/add")}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add New Address
        </button>
      </div>

      {addresses.length == 0 && (
        <div className="w-fit h-[60vh] flex items-center m-auto my-10 text-center text-gray-600 ">
          No Address found!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {addresses.map((item, i) => (
          <AddressCard
            key={i}
            {...item}
            onSelect={() => console.log("Deliver Here")}
            onEdit={() => {
              setData({ ...item }); //passing the data to edit it
              router.push(`/addresses/add`);
            }}
            onDelete={async () => {
              const item = addArr.at(i);

              if (item != undefined) {
                const isDelete = confirm("Are you sure want to delete?");

                if (isDelete) {
                  const response = await fetch("/api/address/create", {
                    method: "DELETE",
                    body: JSON.stringify(item),
                  });

                  const resData = await response.json();
                  console.log(JSON.stringify(resData));

                  if (resData.status == 200) {
                    // Deleted successfully
                    await getAddresses();
                    notify("Address deleted successfully!");
                  } else {
                    notify("Internal server error!");
                  }
                }
              }
            }}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
