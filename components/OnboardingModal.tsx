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
          height={120}
          width={120}
        />

        <h2 className="text-[28px] font-bold mt-4 text-center">
          Congratulations, you’re officially onboarded
        </h2>

        <p className="text-[#878B94] font-normal mt-3 text-center max-w-[520px]">
          Your onboarding is now complete. You’re all set to start offering services, earning commissions, and growing with us. Welcome aboard!
        </p>

        <div className="mt-6 w-full space-y-2">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>
              Your Partner ID - <span className="tracking-wider">{partnerId}</span>
            </span>
            <Image src="/images/copyIcon.png" alt="Copy" height={20} width={20} />
          </p>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
            <span>Partner Portal - {portalUrl}</span>
            <Image src="/images/copyIcon.png" alt="Copy" height={20} width={20} />
          </p>
        </div>

        <div className="mt-8 w-full flex items-center justify-center">
          <button
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


