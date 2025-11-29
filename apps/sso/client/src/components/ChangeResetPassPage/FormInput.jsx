import React from "react";

function FormInput({ title, type, name, onChange, icon }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-sm font-semibold text-gray-700">{title}</label>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
        <div className="flex items-center justify-center bg-gray-200 h-10 w-10 text-gray-600">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          onChange={onChange}
          placeholder={title}
          className="flex-1 h-10 px-3 text-sm text-gray-800 bg-white outline-none"
        />
      </div>
    </div>
  );
}

export default FormInput;
