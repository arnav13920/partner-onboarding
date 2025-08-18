"use client";

import React, { useState } from "react";
import Image from "next/image";
import VerifyOtpModal from "./VerifyOtpModal"; // ✅ Import the modal

const ContactVerification = () => {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; email?: string }>({});

  // ✅ State for OTP Modal
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpType, setOtpType] = useState<"mobile" | "email" | null>(null);

  const validateMobile = (value: string) => {
    const regex = /^[6-9]\d{9}$/; // Indian mobile numbers
    return regex.test(value);
  };

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

  // ✅ Enable Next only if both fields are valid
  const isNextEnabled =
    validateMobile(mobile) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
            Let’s Confirm Your Contact Info
          </p>
          <div className="flex items-start gap-3 mt-2 text-[#475569]">
            <Image
              src="/images/docImage.png"
              alt="doc icon"
              width={45}
              height={50}
            />
            <p className="max-w-xl text-sm leading-relaxed">
              This helps us reach you and keep your account secure. You’ll
              receive all official communications here.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Verification Form */}
      <div className="gap-6 mt-8">
        {/* Mobile Number */}
        <div className="relative w-[900px] mb-6">
          <label
            htmlFor="mobileNumber"
            className="absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A]"
          >
            Mobile Number *
          </label>
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-4 h-[65px]">
            <input
              className="flex-1 outline-none bg-transparent"
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Your Mobile Number"
              required
            />

            {/* ✅ Mobile Verify Arrow */}
            <div
              onClick={() => {
                if (validateMobile(mobile)) {
                  setOtpType("mobile");
                  setShowOtpModal(true);
                }
              }}
              className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer
                ${validateMobile(mobile) ? "bg-[#1EA860]" : "bg-[#B7B9BF]"}`}
            >
              <Image
                src="/images/rightArrowIcon.png"
                alt="arrowIcon"
                width={20}
                height={20}
              />
            </div>
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="relative w-[900px]">
          <label
            htmlFor="email"
            className="absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A]"
          >
            Email Address *
          </label>
          <div className="flex items-center gap-3 border-2 border-gray-400 rounded-2xl px-4 h-[65px]">
            <input
              className="flex-1 outline-none bg-transparent"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              required
            />
            {/* ✅ Email Verify Arrow */}
            <div
              onClick={() => {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setOtpType("email");
                  setShowOtpModal(true);
                }
              }}
              className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer
                ${
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "bg-[#1EA860]"
                    : "bg-[#B7B9BF]"
                }`}
            >
              <Image
                src="/images/rightArrowIcon.png"
                alt="arrowIcon"
                width={20}
                height={20}
              />
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Back & Next Buttons */}
      <div className="mt-60 flex  w-[900px]">
        <button className="px-8 py-2 rounded-full font-medium border border-gray-400 text-gray-600 hover:bg-gray-100 mr-4">
          Back
        </button>

        <button
          className={`px-8 py-2 rounded-full font-medium transition ${
            isNextEnabled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
          disabled={!isNextEnabled}
        >
          Next
        </button>
      </div>

      {/* ✅ OTP Modal */}
      {showOtpModal && otpType && (
        <VerifyOtpModal
          onClose={() => setShowOtpModal(false)}
          contactInfo={otpType === "mobile" ? mobile : email}
          type={otpType}
        />
      )}
    </div>
  );
};

export default ContactVerification;
