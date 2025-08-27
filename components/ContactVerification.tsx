"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import VerifyOtpModal from "./VerifyOtpModal";
import { useRouter } from "next/navigation";

type ContactVerificationProps = {
  sendOtpAction: (
    formData: FormData
  ) => Promise<
    import("../app/onboarding/contactVerification/schema").SendOtpResponse
  >;
  verifyOtpAction: (
    formData: FormData
  ) => Promise<
    import("../app/onboarding/contactVerification/schema").VerifyOtpResponse
  >;
  userId: number;
  userType: string;
};

interface VerifyPayload {
  token?: string;
  userId?: number;
  [key: string]: unknown;
}


const ContactVerification: React.FC<ContactVerificationProps> = ({
  sendOtpAction,
  verifyOtpAction,
  userId,
  userType,
}) => {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; email?: string }>({});

  // ✅ Focus state for labels
  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpType, setOtpType] = useState<"mobile" | "email" | null>(null);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileSending, setIsMobileSending] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);

  // Local mutable identity state used for payloads
  const [currentUserId, setCurrentUserId] = useState<number>(userId);
  const [currentUserType, setCurrentUserType] = useState<string>(userType);

  const router = useRouter();

  // Load existing data from localStorage on component mount and sync identity
  useEffect(() => {
    // Sync contact data
    const contactData = localStorage.getItem("contactData");
    if (contactData) {
      try {
        const data = JSON.parse(contactData);
        if (data.userId === userId && data.userType === userType) {
          setMobile(data.mobile || "");
          setEmail(data.email || "");
          setIsMobileVerified(data.isMobileVerified || false);
          setIsEmailVerified(data.isEmailVerified || false);
        }
      } catch (error) {
        console.error("Failed to load contact data:", error);
      }
    }

    // Sync identity from simple keys if present
    const simpleUserId = localStorage.getItem("userId");
    const simpleUserType = localStorage.getItem("userType");
    if (simpleUserId) setCurrentUserId(Number(simpleUserId));
    if (simpleUserType) setCurrentUserType(simpleUserType);

    // Fallback sync from onboardingData
    const onboardingStr = localStorage.getItem("onboardingData");
    if (onboardingStr) {
      try {
        const onboarding = JSON.parse(onboardingStr);
        const oid =
          onboarding?.data?.data?.userId ??
          onboarding?.data?.userId ??
          onboarding?.userId;
        const otype =
          onboarding?.data?.data?.userType ??
          onboarding?.data?.userType ??
          onboarding?.userType;
        if (oid) setCurrentUserId(Number(oid));
        if (otype) setCurrentUserType(String(otype));
      } catch (error) {
        console.error("Failed to load onboarding data:", error);
      }
    }
  }, [userId, userType]);

  const validateMobile = (value: string) => /^[6-9]\d{9}$/.test(value);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobile(value);
    if (value && !validateMobile(value)) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Enter valid Indian mobile number",
      }));
    } else {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter valid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // ✅ Enable Next only if both verified
  const isNextEnabled = isMobileVerified && isEmailVerified;

  const handleSendOtp = async (type: "mobile" | "email") => {
    if (type === "mobile") setIsMobileSending(true);
    if (type === "email") setIsEmailSending(true);

    try {
      const fd = new FormData();
      fd.set("type", type === "mobile" ? "MOBILE" : "EMAIL");
      if (type === "mobile") {
        fd.set("mobile", mobile);
      } else {
        fd.set("email", email);
      }
      // Use current identity state for payloads
      fd.set("userId", String(currentUserId));
      fd.set("userType", currentUserType);

      const response = await sendOtpAction(fd);

      // Save minimal useful info + possible API response to localStorage
      const existingData = localStorage.getItem("contactData");
      const contactData = existingData ? JSON.parse(existingData) : {};
      contactData[type === "mobile" ? "mobile" : "email"] =
        type === "mobile" ? mobile : email;
      contactData.userId = currentUserId;
      contactData.userType = currentUserType;
      // Type guard for SendOtpResponse
      let lastSendOtp = null;
      if (
        "data" in response &&
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        // Nested
        lastSendOtp = response.data.data;
      } else if ("data" in response) {
        // Flat
        lastSendOtp = response.data;
      } else {
        lastSendOtp = response;
      }
      contactData.lastSendOtp = lastSendOtp;
      localStorage.setItem("contactData", JSON.stringify(contactData));

      setOtpType(type);
      setShowOtpModal(true);
    } catch (error) {
      console.error("Send OTP failed:", error);
    } finally {
      if (type === "mobile") setIsMobileSending(false);
      if (type === "email") setIsEmailSending(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!otpType) return;

    try {
      const fd = new FormData();
      fd.set("type", otpType === "mobile" ? "MOBILE" : "EMAIL");
      if (otpType === "mobile") {
        fd.set("mobile", mobile);
      } else {
        fd.set("email", email);
      }
      fd.set("otp", otp);
      // Use current identity state for payloads
      fd.set("userId", String(currentUserId));
      fd.set("userType", currentUserType);

      const response = await verifyOtpAction(fd);

      // Save verification status and response payload to localStorage
      const existingData = localStorage.getItem("contactData");
      const contactData = existingData ? JSON.parse(existingData) : {};
      contactData[
        otpType === "mobile" ? "isMobileVerified" : "isEmailVerified"
      ] = true;
      // Persist token/userId/userType if present; force userType to PARTNER
      // Type guard for VerifyOtpResponse

      let verifyPayload: VerifyPayload = {};
      if (
        "data" in response &&
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        // Nested
        verifyPayload = response.data.data;
      } else if ("data" in response) {
        // Flat
        verifyPayload = response.data;
      } else {
        verifyPayload = response;
      }
      if (verifyPayload?.token) contactData.token = verifyPayload.token;
      const resolvedUserId =
        verifyPayload?.userId ?? contactData.userId ?? currentUserId;
      if (resolvedUserId) contactData.userId = resolvedUserId;
      contactData.userType = "PARTNER";
      localStorage.setItem("contactData", JSON.stringify(contactData));

      // Also update simple keys for easy reads
      if (resolvedUserId)
        localStorage.setItem("userId", String(resolvedUserId));
      localStorage.setItem("userType", "PARTNER");

      // Update local identity state so subsequent calls use PARTNER
      if (resolvedUserId) setCurrentUserId(Number(resolvedUserId));
      setCurrentUserType("PARTNER");

      // Also update onboardingData mirror (support multiple shapes)
      const onboardingStr = localStorage.getItem("onboardingData");
      if (onboardingStr) {
        try {
          const onboarding = JSON.parse(onboardingStr);
          if (typeof onboarding === "object" && onboarding) {
            if (resolvedUserId) onboarding.userId = resolvedUserId;
            onboarding.userType = "PARTNER";
          }
          if (onboarding?.data && typeof onboarding.data === "object") {
            if (resolvedUserId) onboarding.data.userId = resolvedUserId;
            onboarding.data.userType = "PARTNER";
          }
          if (
            onboarding?.data?.data &&
            typeof onboarding.data.data === "object"
          ) {
            if (resolvedUserId) onboarding.data.data.userId = resolvedUserId;
            onboarding.data.data.userType = "PARTNER";
          }
          localStorage.setItem("onboardingData", JSON.stringify(onboarding));
        } catch (e) {
          console.error("Failed to update onboardingData:", e);
          localStorage.setItem(
            "onboardingData",
            JSON.stringify({ userId: resolvedUserId, userType: "PARTNER" })
          );
        }
      } else {
        localStorage.setItem(
          "onboardingData",
          JSON.stringify({ userId: resolvedUserId, userType: "PARTNER" })
        );
      }

      setShowOtpModal(false);
      if (otpType === "mobile") setIsMobileVerified(true);
      if (otpType === "email") setIsEmailVerified(true);
    } catch (error) {
      console.error("Verify OTP failed:", error);
      throw error; // Re-throw to let the modal handle the error
    }
  };

  const handleNext = () => {
    if (isNextEnabled) {
      router.push("/onboarding/kyc");
    }
  };

  return (
    <div className="px-14 py-6 max-w-5xl">
      {/* Step Heading */}
      <p className="font-bold text-[20px] text-[#002169] uppercase">
        STEP 2 of 5
      </p>

      {/* Title Section */}
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Aboutuser.png"
            alt="aboutUser"
            width={36}
            height={36}
          />
          <p className="font-bold text-3xl text-[#0F172A]">
            Contact Verification
          </p>
        </div>
        <div className="mt-3 mb-3">
          <p className="text-lg font-bold text-[#575D6A]">
            Let&apos;s Confirm Your Contact Info
          </p>
          <p className="max-w-full text-sm leading-relaxed text-[#475569]">
            This helps us reach you and keep your account secure. You&apos;ll
            receive all official communications here.
          </p>
        </div>
      </div>

      {/* Contact Verification Form */}
      <div className="gap-6 mt-8">
        {/* Mobile Number */}
        <div className="relative w-[450px] mb-6 group border-b border-gray-300">
          <label
            htmlFor="mobileNumber"
            className={`absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] transition-opacity ${
              mobile || isMobileFocused ? "opacity-100" : "opacity-0"
            }`}
          >
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-gray-400 rounded-2xl px-4 h-[45px] flex-1">
              <span className="text-[#575D6A] mr-2">+91</span>
              <input
                className="flex-1 outline-none bg-transparent focus:placeholder-transparent text-base"
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={handleMobileChange}
                onFocus={() => setIsMobileFocused(true)}
                onBlur={() => setIsMobileFocused(false)}
                placeholder="Your Mobile Number"
                required
                disabled={isMobileVerified}
              />
            </div>
            {/* Mobile Verify Button */}
            {isMobileVerified ? (
              <button
                type="button"
                disabled
                className="text-sm font-medium text-[#1EA860]"
              >
                Verified
              </button>
            ) : (
              <button
                onClick={() => handleSendOtp("mobile")}
                disabled={!validateMobile(mobile) || isMobileSending}
                className={`text-sm font-medium transition-colors duration-300 ${
                  validateMobile(mobile) && !isMobileSending
                    ? "text-[#1EA860] hover:opacity-90"
                    : "text-[#B7B9BF] cursor-not-allowed"
                }`}
              >
                {isMobileSending ? "Sending..." : "Verify"}
              </button>
            )}
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="relative w-[450px] group">
          <label
            htmlFor="email"
            className={`absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] transition-opacity ${
              email || isEmailFocused ? "opacity-100" : "opacity-0"
            }`}
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-gray-400 rounded-2xl px-4 h-[45px] flex-1">
              <input
                className="flex-1 outline-none bg-transparent focus:placeholder-transparent text-base"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                placeholder="Your email address"
                required
                disabled={isEmailVerified}
              />
            </div>
            {/* Email Verify Button */}
            {isEmailVerified ? (
              <button
                type="button"
                disabled
                className="text-sm font-medium text-[#1EA860]"
              >
                Verified
              </button>
            ) : (
              <button
                onClick={() => handleSendOtp("email")}
                disabled={
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isEmailSending
                }
                className={`text-sm font-medium transition-colors duration-300 ${
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !isEmailSending
                    ? "text-[#1EA860] hover:opacity-90"
                    : "text-[#B7B9BF] cursor-not-allowed"
                }`}
              >
                {isEmailSending ? "Sending..." : "Verify"}
              </button>
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Back & Next Buttons */}
      <div className="mt-60 flex w-[900px]">
        <button
          type="button"
          onClick={() => router.push("/onboarding/about")}
          className="px-8 py-2 rounded-full font-medium border border-gray-400 text-gray-600 hover:bg-gray-100 mr-4"
        >
          Back
        </button>

        <button
          className={`px-8 py-2 rounded-full font-medium transition ${
            isNextEnabled
              ? "bg-[#1EA860] text-white"
              : "bg-[#B7B9BF] text-white cursor-not-allowed"
          }`}
          disabled={!isNextEnabled}
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <VerifyOtpModal
          onClose={() => setShowOtpModal(false)}
          contactInfo={otpType === "mobile" ? `+91 ${mobile}` : email}
          type={otpType}
          onVerify={handleVerifyOtp} // ✅ use existing function
          onVerified={() => {
            if (otpType === "mobile") setIsMobileVerified(true);
            if (otpType === "email") setIsEmailVerified(true);
          }}
        />
      )}
    </div>
  );
};

export default ContactVerification;
