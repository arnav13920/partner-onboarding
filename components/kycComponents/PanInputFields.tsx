"use client";
import React, { useEffect, useState } from "react";
import { VerifyPanResponse } from "../../app/onboarding/kyc/schema";

type PanInputFieldsProps = {
  verifyPanAction: (formData: FormData) => Promise<VerifyPanResponse>;
  isVerified?: boolean;
  onVerified?: () => void;
  userId: number;
  userType: string;
};

const PanInputFields: React.FC<PanInputFieldsProps> = ({
  verifyPanAction,
  isVerified,
  onVerified,
  userId,
  userType,
}) => {
  const [pan, setPan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStoredPan, setHasStoredPan] = useState(false);

  // Prefill from localStorage if available
  useEffect(() => {
    try {
      const kycDataStr = localStorage.getItem("kycPanData");
      if (kycDataStr) {
        const kyc = JSON.parse(kycDataStr);
        const storedPan: string | undefined = kyc?.data?.pan;
        if (storedPan && storedPan.length === 10) {
          setPan(String(storedPan).toUpperCase());
          setHasStoredPan(true);
          if (!isVerified) {
            onVerified?.();
          }
        }
      }
    } catch {}
  }, [isVerified, onVerified]);

  // PAN validation (10 chars, alphanumeric uppercase)
  const isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  const isDisabled = Boolean(isVerified || hasStoredPan);

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
            disabled={isDisabled}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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
        <form
          action={async (fd: FormData) => {
            if (!isValidPan || isDisabled) return;
            setIsSubmitting(true);
            try {
              fd.set("pan", pan);
              fd.set("userId", String(userId));
              fd.set("userType", userType);
              const resp = await verifyPanAction(fd);
              // Save to localStorage for continuity
              if (resp?.data) {
                const kycDataStr = localStorage.getItem("kycPanData");
                const kycData = kycDataStr ? JSON.parse(kycDataStr) : {};
                kycData.data = resp.data;
                kycData.success = resp.success;
                kycData.message = resp.message;
                localStorage.setItem("kycPanData", JSON.stringify(kycData));
                if (resp.data.pan) {
                  setPan(String(resp.data.pan).toUpperCase());
                  setHasStoredPan(true);
                }
              }
              onVerified?.();
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <button
            type="submit"
            disabled={!isValidPan || isDisabled || isSubmitting}
            className={`mt-6 w-[140px] h-[42px] rounded-full text-sm font-medium transition-colors ${
              isDisabled
                ? "bg-green-600 text-white"
                : isValidPan && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isDisabled ? "Verified" : isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PanInputFields;
