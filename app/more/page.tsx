import React from "react";
import Image from "next/image";
import Card from "@/components/Card";

const profile = () => {
  return (
    <div className="m-auto w-fit">

   
    <div className=" flex m-4 p-4 mx-10">
      <div className="profileInfo ">
        {/* Profile Image  */}
        <div className="border-4 border-blue-400 rounded-[140px] p-2 mx-6">
          <Image
            width={1980}
            height={1080}
            src={"/person.jpg"}
            alt=""
            unoptimized
            className="w-60 h-60 object-cover rounded-[120px]"
          />
        </div>
        {/* User Info */}
        <div className="text-center p-2">
          <div className="name text-[24px] font-bold">Uttam Sharma</div>
          <div className="username ">
            Username: <span className="font-semibold italic"> uttam1102</span>
          </div>
          <div className="email">
            Email: <span className="font-semibold">uttam@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="otherDetails grid grid-cols-2 gap-3 mx-4 bg-gradient-to-r from-blue-600 to-blue-400 p-8 rounded-xl text-white shadow-lg">
        <Card link={"/orders"} title={"Orders"} desc={"You can check all your orders till now."}/>
        <Card link={"/wishlist"} title={"Wishlist"} desc={"Here is the list of all your wished products."}/>
        <Card link={"/addresses"} title={"Addresses"} desc={"All your saved addresses are here."}/>
        <Card link={"/logout"} title={"Logout"} desc={"Sign Out from your account."}/>
        <Card link={"/delete-accout"} title={"Delete Accout"} desc={"Delete your account completly from our server."}/>
      </div>
    </div>
     </div>
  );
};

export default profile;
