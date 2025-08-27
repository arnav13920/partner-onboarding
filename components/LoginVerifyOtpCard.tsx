"use client";

import React, { useState, useRef, useEffect } from "react";

type LoginVerifyOtpCardProps = {
  mobile: string;
  onVerify?: (otp: string) => void | Promise<void>;
  onCancel?: () => void;
  onResend?: (mobile: string) => void | Promise<void>;
  isOtpVerified?: boolean;
};

const LoginVerifyOtpCard: React.FC<LoginVerifyOtpCardProps> = ({
  mobile,
  onVerify,
  onCancel,
  onResend,
  isOtpVerified,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(30);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").trim();

    if (/^\d+$/.test(pasteData)) {
      const pasteArray = pasteData.split("").slice(0, otp.length);
      const newOtp = [...otp];

      pasteArray.forEach((digit, i) => {
        if (index + i < otp.length) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      const nextIndex = index + pasteArray.length - 1;
      if (nextIndex < otp.length) {
        inputsRef.current[nextIndex]?.focus();
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const handleResend = async () => {
    if (secondsLeft > 0) return;

    setOtp(Array(6).fill(""));
    setSecondsLeft(30);
    inputsRef.current[0]?.focus();

    // 👇 call resend OTP API from parent with mobile
    try {
      await onResend?.(mobile);
    } catch (e) {
      console.error("Resend OTP failed", e);
    }
  };

  const handleClose = () => {
    onCancel?.();
  };

  const handleVerifyClick = async () => {
    if (!isOtpComplete) return;
    await onVerify?.(otp.join(""));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[22px] text-[#002169]">Verify OTP</p>
        <button
          onClick={handleClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-normal text-[14px] text-[#575D6A]">
          We have sent an OTP to <span className="font-semibold">+91 {mobile}</span>. Please enter it below to
          continue.
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <div key={index} className="rounded-2xl p-[1px] bg-[#B7B9BF]">
              <input
                ref={(el: HTMLInputElement | null): void => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                className="w-[50px] h-[60px] rounded-2xl text-center text-lg 
                   bg-white outline-none focus:bg-gray-50"
              />
            </div>
          ))}
        </div>

        {/* Resend */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={`text-sm text-[#575D6A] ${
              secondsLeft === 0 ? "opacity-0" : "opacity-100"
            }`}
          >
            Resend in {secondsLeft}s
          </span>
          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0}
            className={`text-sm font-medium ${
              secondsLeft > 0
                ? "text-[#B7B9BF] cursor-not-allowed"
                : "text-[#002169] cursor-pointer hover:underline"
            }`}
          >
            Resend OTP
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleVerifyClick}
          disabled={!isOtpComplete || isOtpVerified}
          className={`rounded-full w-full h-[44px] font-medium ${
            isOtpVerified
              ? "bg-[#1EA860] text-white cursor-not-allowed"
              : isOtpComplete
                ? "bg-[#002169] text-white hover:bg-[#001746]"
                : "bg-[#BCC5D3] text-white cursor-not-allowed"
          }`}
        >
          {isOtpVerified ? 'Verified' : 'Verify'}
        </button>
        <p className="text-[12px] text-[#575D6A] leading-relaxed text-center">
          By verifying, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default LoginVerifyOtpCard;
