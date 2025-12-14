import React from "react";

type ButtonProp = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProp) => {
  return (
    <div
      className="w-full text-center cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white py-3 my-4 rounded-md font-medium"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
