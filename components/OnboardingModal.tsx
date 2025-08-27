"use client";

import React from "react";
import Image from "next/image";

type OnboardingModalProps = {
  onClose: () => void;
  partnerId?: string | number;
  portalUrl?: string;
};

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  onClose,
  partnerId = "0045998",
  portalUrl = "https://abhiloans.com/",
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
          src="/images/greenCheckIcon.png"
          alt="Onboarding complete"
          height={150}
          width={150}
        />

        <h2 className="text-[28px] font-bold mt-4 text-center">
          Congratulations, you&apos;re officially onboarded
        </h2>

        <p className="text-[#878B94] font-normal mt-3 text-center max-w-[520px]">
          Your onboarding is now complete. You&apos;re all set to start offering
          services, earning commissions, and growing with us. Welcome aboard!
        </p>

        <div className="mt-6 w-full space-y-2">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>
              Your Partner ID -{" "}
              <span className="tracking-wider">{partnerId}</span>
            </span>
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
              className="text-blue-600 hover:text-blue-800 underline hover:opacity-70 transition-opacity"
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

        <div className="mt-8 w-full flex items-center justify-center">
          <button
            onClick={openPortalInNewTab}
            type="button"
            className="w-[280px] h-[44px] rounded-full font-medium bg-[#002169] text-white hover:bg-[#001a66] transition-colors"
          >
            Go to partner portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
