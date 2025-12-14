"use client";

type AddressCardProps = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function AddressCard({
  fullName,
  phone,
  addressLine1,
  addressLine2,
  landmark,
  city,
  state,
  pincode,
  isDefault,
  onSelect,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900">{fullName}</h3>

        {isDefault && (
          <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white">
            Default
          </span>
        )}
      </div>

      <p className="text-gray-700 mt-1">{phone}</p>

      <p className="text-gray-600 mt-3 leading-6">
        {addressLine1}
        {addressLine2 && <>, {addressLine2}</>}
        {landmark && <>, {landmark}</>}
        <br />
        {city}, {state} - {pincode}
      </p>

      <div className="flex gap-3 mt-5 ">
        {onSelect && (
          <button
            onClick={onSelect}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Deliver Here
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-200 cursor-pointer"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md border border-red-400 text-red-600 hover:bg-red-100 cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
