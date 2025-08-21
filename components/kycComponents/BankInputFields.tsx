"use client";

import React, { useState } from "react";

type BankInputFieldsProps = {
  verifyBankAction: (formData: FormData) => Promise<any>;
  isVerified?: boolean;
  onVerified?: () => void;
};

const BankInputFields: React.FC<BankInputFieldsProps> = ({
  verifyBankAction,
  isVerified,
  onVerified,
}) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");

  const normalizedAccountNumber = accountNumber.replace(/\D/g, "");
  const isValidAccountNumber = /^\d{9,18}$/.test(normalizedAccountNumber);
  const isValidIfsc = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  const isValid = isValidAccountNumber && isValidIfsc;

  return (
    <>
      <div className="flex flex-col w-full max-w-[450px]">
        {/* Bank Account Number */}
        <div className="relative mt-4">
          <input
            id="bankAccountNumber"
            type="text"
            placeholder="Your bank account number"
            value={normalizedAccountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, ""))
            }
            maxLength={18}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <label
            htmlFor="bankAccountNumber"
            className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
          >
            Bank Account Number <span className="text-red-500">*</span>
          </label>
        </div>

        {/* IFSC Code */}
        <div className="relative mt-4">
          <input
            id="ifscCode"
            type="text"
            placeholder="e.g., HDFC0001234"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
            maxLength={11}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <label
            htmlFor="ifscCode"
            className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
          >
            IFSC Code <span className="text-red-500">*</span>
          </label>
        </div>
      </div>
      {/* Verify Button */}
      <div className="justify-end flex">
        <form
          action={async (fd: FormData) => {
            if (!isValid) return;
            fd.set("account_number", accountNumber.replace(/\D/g, ""));
            fd.set("ifsc_code", ifsc);
            await verifyBankAction(fd);
            onVerified?.();
          }}
        >
          <button
            type="submit"
            disabled={!isValid || isVerified}
            className={`mt-6 w-[140px] h-[42px] rounded-full text-sm font-medium transition-colors ${
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

export default BankInputFields;
