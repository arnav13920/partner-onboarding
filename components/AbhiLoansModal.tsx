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
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here if you want
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const openPortalInNewTab = () => {
    window.open(portalUrl, "_blank", "noopener,noreferrer");
  };

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
          height={150}
          width={150}
        />

        <h2 className="text-[28px] font-bold mt-4 text-center">
          Welcome to
          <span className="bg-gradient-to-l from-[#1A73E9] to-[#ED3237] bg-clip-text text-transparent ml-2 mr-2">
            Abhi Loans
          </span>
          Family!
        </h2>

        <p className="text-[16px] font-normal text-gray-700 mt-3 text-center">
          We&apos;ve received your application, and are excited to have you as a
          partner.
        </p>

        <div className="mt-6 w-full space-y-2">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>Your PartnerID &nbsp; {partnerId}</span>
            <button
              onClick={() => copyToClipboard(partnerId.toString())}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Copy Partner ID"
            >
              <Image
                src="/images/copyIcon.png"
                alt="Copy"
                height={20}
                width={20}
              />
            </button>
          </p>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>Partner Portal - </span>
            <button
              onClick={openPortalInNewTab}
              className="text-blue-600  hover:text-blue-800 underline hover:opacity-70 transition-opacity"
            >
              {portalUrl}
            </button>
            <button
              onClick={() => copyToClipboard(portalUrl)}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Copy Portal URL"
            >
              <Image
                src="/images/copyIcon.png"
                alt="Copy"
                height={20}
                width={20}
              />
            </button>
          </p>
        </div>
        {/* Actions */}
        <div className="mt-8 w-full flex items-center justify-center gap-4">
          <button
            onClick={openPortalInNewTab}
            className="px-7 h-[44px] cursor-pointer rounded-full font-medium border border-gray-300 text-[#002169] hover:bg-gray-50"
            type="button"
          >
            Go to Partner Portal
          </button>
          <button
            className="px-7 h-[44px] cursor-pointer rounded-full font-medium bg-[#002169] text-white hover:bg-[#001a66] transition-colors"
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
