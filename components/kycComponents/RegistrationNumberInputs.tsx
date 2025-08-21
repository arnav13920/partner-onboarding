"use client";

import React, { useState } from "react";

type RegistrationNumberInputsProps = {
  verifySrnAction: (formData: FormData) => Promise<any>;
  isVerified?: boolean;
  onVerified?: () => void;
};

const RegistrationNumberInputs: React.FC<RegistrationNumberInputsProps> = ({
  verifySrnAction,
  isVerified,
  onVerified,
}) => {
  const [registrationNumber, setRegistrationNumber] = useState("");

  // Simple validation: 5-30 uppercase letters/digits and allowed separators
  const normalized = registrationNumber.toUpperCase();
  const isValid = /^[A-Z0-9\-\/]{5,30}$/.test(normalized);

  return (
    <>
      <div className="flex flex-col w-full max-w-[450px]">
        <div className="relative mt-4">
          <input
            id="registrationNumber"
            type="text"
            placeholder="Enter Registration Number"
            value={normalized}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            maxLength={30}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <label
            htmlFor="registrationNumber"
            className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
          >
            SRN <span className="text-red-500">*</span>
          </label>
        </div>
      </div>
      <div className="justify-end flex mb-2">
        <form
          action={async (fd: FormData) => {
            if (!isValid) return;
            fd.set("srn_number", normalized);
            await verifySrnAction(fd);
            onVerified?.();
          }}
        >
          <button
            type="submit"
            disabled={!isValid || isVerified}
            className={`mt-6  w-[140px] h-[42px] cursor-pointer rounded-full text-sm font-medium transition-colors ${
              isVerified
                ? "bg-green-600 text-white"
                : isValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isVerified ? "Verified" : "Verify"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationNumberInputs;
