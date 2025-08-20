"use client";

import React, { useState } from "react";
import Image from "next/image";

const GstInputFields = () => {
  const [hasGst, setHasGst] = useState<boolean | null>(null);
  const [gstin, setGstin] = useState("");

  const normalizedGstin = gstin.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const isValidGstin = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
    normalizedGstin
  );

  return (
    <>
      <div>
        <div className="flex flex-col p-4">
          Do you have GST?
          <div className="flex p-2 gap-3 ">
            <button
              type="button"
              onClick={() => setHasGst(true)}
              className={`cursor-pointer w-[140px] h-[42px] border-2 rounded-full transition-colors ${
                hasGst === true
                  ? "bg-[#0F172A] text-white border-[#0F172A]"
                  : "bg-white text-[#0F172A] border-[#B7B9BF] hover:border-[#0F172A]"
              }`}
              aria-pressed={hasGst === true}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setHasGst(false)}
              className={`cursor-pointer w-[140px] h-[42px] border-2 rounded-full transition-colors ${
                hasGst === false
                  ? "bg-[#0F172A] text-white border-[#0F172A]"
                  : "bg-white text-[#0F172A] border-[#B7B9BF] hover:border-[#0F172A]"
              }`}
              aria-pressed={hasGst === false}
            >
              No
            </button>
          </div>
        </div>
      </div>
      {hasGst && (
        <>
          <div className="flex flex-col w-full max-w-[450px]">
            {/* GST Number */}
            <div className="relative mt-4">
              <input
                id="gstNumber"
                type="text"
                placeholder="e.g., 27ABCDE1234F1Z5"
                value={normalizedGstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                maxLength={15}
                className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <label
                htmlFor="gstNumber"
                className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
              >
                GST Number <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
          {/* Verify Button */}
          <div className="justify-end flex">
            <button
              type="button"
              disabled={!isValidGstin}
              className={`mt-6 w-[140px] h-[42px] rounded-full text-sm font-medium transition-colors ${
                isValidGstin
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Verify
            </button>
          </div>
        </>
      )}
      {hasGst === false && (
        <div className=" p-2 rounded-2xl gap-3 flex">
          <p className="text-center pl-3">Upload GST Declaration Certificate </p>
          <input
            id="gstDeclaration"
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
          />
          <label
            htmlFor="gstDeclaration"
            className="flex justify-center items-center cursor-pointer"
          >
            <Image
              src="/images/FileUploadIcon.png"
              alt="uploadFile"
              width={28}
              height={28}
            />
          </label>
        </div>
      )}
    </>
  );
};

export default GstInputFields;
