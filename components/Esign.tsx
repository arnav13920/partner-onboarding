"use client";
import React from "react";
import Image from "next/image";
import { getEsignUrl } from "@/app/onboarding/eSigning/action";

const Esign = () => {
  const portalUrl = "https://abhiloans.com/";
  const partnerId = 898988;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const openPortalInNewTab = () => {
    window.open(portalUrl, "_blank", "noopener,noreferrer");
  };

  const handleEsignClick = async () => {
    try {
      const userIdStr = localStorage.getItem("userId");
      const userType = localStorage.getItem("userType");
      if (!userIdStr || !userType) {
        alert("User information not found. Please login again.");
        return;
      }
      const userId = Number(userIdStr);
      if (isNaN(userId) || !userType) {
        alert("Invalid user information. Please login again.");
        return;
      }
      const res = await getEsignUrl(userId, userType);
      if (res.success && res.data.esignUrl) {
        // open the esign URL in a new tab
        window.open(res.data.esignUrl, "_blank", "noopener,noreferrer");
      } else {
        alert("Failed to get eSign URL. Please try again.");
      }
    } catch (err) {
      console.error("Failed to get esign url:", err);
      alert("Failed to get eSign URL. Please try again.");
    }
  };

  return (
    <div className="px-14 py-6 max-w-5xl">
      <p className="font-bold text-[20px] text-[#002169] uppercase">
        STEP 5 of 5
      </p>

      <div className="mt-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/keyPersonDetails.png"
            alt="aboutUser"
            width={36}
            height={36}
          />
          <p className="font-bold text-3xl text-[#0F172A]">eSigning</p>
        </div>
      </div>

      <h2 className="text-[28px] font-bold mt-4 text-start">
        Welcome to
        <span className="bg-gradient-to-l from-[#1A73E9] to-[#ED3237] bg-clip-text text-transparent ml-2 mr-2">
          Abhi Loans
        </span>
        Family!
      </h2>

      <p className="text-[16px] font-normal text-gray-700 mt-3 text-start">
        We&apos;ve received your application, and are excited to have you as a
        partner.
      </p>

      <div className="mt-6 w-full space-y-4">
        <p className="flex items-center justify-start gap-2 text-sm text-gray-800">
          <span>Your PartnerID - {partnerId}</span>
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
        <p className="flex items-center justify-start gap-2 text-sm text-gray-800">
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
      <div className="mt-8 w-full flex items-center justify-start gap-4">
        <button
          onClick={openPortalInNewTab}
          className="px-7 h-[44px] cursor-pointer rounded-full font-medium border border-gray-300 text-[#002169] hover:bg-gray-50"
          type="button"
        >
          Go to Partner Portal
        </button>
        <button
          onClick={handleEsignClick}
          className="px-7 h-[44px] cursor-pointer rounded-full font-medium bg-[#002169] text-white hover:bg-[#001a66] transition-colors"
          type="button"
        >
          eSign Agreement
        </button>
      </div>
    </div>
  );
};

export default Esign;
