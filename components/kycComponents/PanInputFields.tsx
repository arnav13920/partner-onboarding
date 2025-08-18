"use client";
import React, { useState } from "react";

const PanInputFields = () => {
  const [pan, setPan] = useState("");

  // PAN validation (10 chars, alphanumeric uppercase)
  const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  return (
    <>
    <div className="flex flex-col w-full max-w-[450px]">
      {/* Input wrapper with floating label */}
      <div className="relative mt-4">
        <input
          id="pan"
          type="text"
          placeholder=" PAN"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
          maxLength={10}
          className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
        {/* Floating label inside input */}
        <label
          htmlFor="pan"
          className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
        >
          PAN <span className="text-red-500">*</span>
        </label>
      </div>

    </div>
      {/* Verify Button */}
      <div className="justify-end flex">
        <button
          type="button"
          disabled={!isValidPan}
          className={`mt-6 w-[140px] h-[42px] rounded-full text-sm font-medium transition-colors ${
            isValidPan
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Verify
        </button>
      </div>
      </>
  );
};

export default PanInputFields;
