"use client";

import React from "react";
import Image from "next/image";

type AbhiLoansModalProps = {
  onClose: () => void;
  partnerId?: number | string;
  portalUrl?: string;
};

const AbhiLoansModal: React.FC<AbhiLoansModalProps> = ({
  onClose,
  partnerId = 4556133,
  portalUrl = "https://abhiLoans.com/",
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[1px] z-50">
      <div className="w-[640px] max-w-[90vw] bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <button
          onClick={onClose}
          className="self-end text-sm text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <Image
          src="/images/abhiLoans.svg"
          alt="Abhi Loans Logo"
          height={80}
          width={80}
        />

        <h2 className="text-[28px] font-bold mt-4 text-center">
          Welcome to
          <span className="bg-gradient-to-b from-[#1A73E9] to-[#ED3237] bg-clip-text text-transparent ml-2 mr-2">
            Abhi Loans
          </span>
          Family!
        </h2>

        <p className="text-[16px] font-normal text-gray-700 mt-3 text-center">
          We’ve received your application, and are excited to have you as a
          partner.
        </p>

        <div className="mt-6 w-full space-y-2">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>Your PartnerID - {partnerId}</span>
            <Image
              src="/images/copyIcon.png"
              alt="Copy"
              height={20}
              width={20}
            />
          </p>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>Partner Portal - {portalUrl}</span>
            <Image
              src="/images/copyIcon.png"
              alt="Copy"
              height={20}
              width={20}
            />
          </p>
        </div>
        {/* Actions */}
        <div className="mt-8 w-full flex items-center justify-center gap-4">
          <button
            className="px-7 h-[44px] rounded-full font-medium border border-gray-300 text-[#002169] hover:bg-gray-50"
            type="button"
          >
            Go to Partner Portal
          </button>
          <button
            className="px-7 h-[44px] rounded-full font-medium bg-[#002169] text-white hover:bg-[#001a66] transition-colors"
            type="button"
          >
            eSign Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbhiLoansModal;
