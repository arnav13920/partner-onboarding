"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginVerifyOtpCard from "./LoginVerifyOtpCard";
import { SendOtpResponse } from "@/app/onboarding/contactVerification/schema";

export type VerifyOtpResponse = {
  success?: boolean; 
  status?: boolean;  
  code?: number;
  message?: string;
  data?: {
    status?: boolean;
    userId?: number;
    userType?: string;
    token?: string;
    partnerId?: number;
  };
};

type PartnerLoginCardProps = {
  onStartOnboarding: (mobile: string) => Promise<import("../app/schema").OnboardingResponse>;
  onFetchMetaData: (userId: number, userType: string) => Promise<import("../app/schema").MetaDataResponse>;
  onSendOtp: (formData: FormData) => Promise<SendOtpResponse>;
  onVerifyOtp: (formData: FormData) => Promise<VerifyOtpResponse>;
};

const PartnerLoginCard: React.FC<PartnerLoginCardProps> = ({
  onStartOnboarding,
  onFetchMetaData,
  onSendOtp,
  onVerifyOtp,
}) => {
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const router = useRouter();

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobile(value);
    setError(null);
  };

  const isValidMobile = /^[6-9]\d{9}$/.test(mobile);

  const handleContinue = async () => {
    if (!isValidMobile) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await onStartOnboarding(mobile);

      if (response && response.data) {
        localStorage.setItem("onboardingData", JSON.stringify(response.data));
        localStorage.setItem("userId", String(response.data.userId));
        localStorage.setItem("userType", response.data.userType);
      }

      const userId = response?.data?.userId;
      const userType = response?.data?.userType;

      if (userType === "PARTNER") {
        // Send OTP to mobile and show OTP card
        const fd = new FormData();
        fd.set("mobile", mobile);
        fd.set("userId", String(userId));
        fd.set("userType", userType);
        await onSendOtp(fd);
        setShowOtpCard(true);
        return;
      }

      if (userType === "TEMP") {
        try {
          const metaResponse = await onFetchMetaData(userId, userType);
          if (metaResponse?.data) {
            localStorage.setItem("metaData", JSON.stringify(metaResponse.data));
          }
          if (metaResponse?.data?.current_page === "PARTNER_DETAILS") {
            router.push("/onboarding/about");
          }
        } catch (metaError) {
          console.error("Failed to fetch meta data:", metaError);
        }
      }
    } catch (err) {
      console.error("Onboarding failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to start onboarding"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (otp: string) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const userType = String(localStorage.getItem("userType") || "PARTNER");
  
      const fd = new FormData();
      fd.set("mobile", mobile);
      fd.set("otp", otp);
      fd.set("type", "MOBILE");
      fd.set("userId", String(userId));
      fd.set("userType", userType);
  
      const resp = await onVerifyOtp(fd);

      // Accept only the flat response shape for success
      const isSuccess = resp && typeof resp === 'object' && 'status' in resp && resp.status === true && resp.data && ('token' in resp.data);

      if (isSuccess) {
        setIsOtpVerified(true);
        console.log("inside the if block")
        // ✅ OTP verified → immediately fetch metadata
        const meta = await onFetchMetaData(userId, userType);
        console.log(meta, "meta data");
        if (meta?.data) {
          localStorage.setItem("metaData", JSON.stringify(meta.data));
        }
  
        // ✅ Route based on current_page
        if (meta?.data?.current_page === "PARTNER_DETAILS") {
          router.push("/onboarding/about");
        } else if (meta?.data?.current_page === "KYC") {
          router.push("/onboarding/kyc");
        } else {
          router.refresh();
        }
      }
    } catch (e) {
      console.error("OTP Verify failed", e);
    }
  };
  

  if (showOtpCard) {
    return (
      <LoginVerifyOtpCard
        mobile={mobile}
        onVerify={handleVerify}
        onCancel={() => setShowOtpCard(false)}
        onResend={async (mob) => {
          const userId = Number(localStorage.getItem("userId"));
          const userType = String(localStorage.getItem("userType") || "PARTNER");
          const fd = new FormData();
          fd.set("mobile", mob);
          fd.set("userId", String(userId));
          fd.set("userType", userType);
          await onSendOtp(fd);
        }}
        isOtpVerified={isOtpVerified}
      />
    ) as React.ReactNode;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold text-[22px] text-[#002169]">
        Login / Signup <span className="text-[#ED3237]">Abhi</span> Loans
        Partner Portal
      </p>

      <div className="flex flex-col gap-2">
        <p className="font-normal text-[14px] text-[#575D6A]">
          Please enter your mobile number
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-full border-[#575D6A] px-4 h-[52px] w-full">
            <span className="text-[#575D6A] mr-3">+91</span>
            <input
              className="flex-1 outline-none bg-transparent text-base placeholder:text-[#9CA3AF]"
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Mobile number"
              required
              inputMode="numeric"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 select-none cursor-pointer">
          <input
            type="checkbox"
            className="accent-[#002169] w-4 h-4"
            defaultChecked
          />
          <span className="text:[14px] text-[#575D6A]">
            Get updates on WhatsApp
          </span>
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={handleContinue}
          disabled={!isValidMobile || isLoading}
          className={`rounded-full w-full h-[44px] text-white font-medium cursor-pointer ${
            isValidMobile && !isLoading
              ? "bg-[#002169] hover:bg-[#001746]"
              : "bg-[#BCC5D3] cursor-not-allowed"
          }`}
        >
          {isLoading ? "Starting..." : "Continue"}
        </button>
        <p className="text-[12px] text-[#575D6A] leading-relaxed">
          By continuing, you accept our Terms & Conditions and consent to obtain
          your KYC and bureau information
        </p>
      </div>
    </div>
  );
};

export default PartnerLoginCard;
