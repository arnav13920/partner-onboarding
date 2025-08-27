"use client";

import React, { useState, useRef, useEffect } from "react";

type VerifyOtpModalProps = {
  onClose: () => void;
  contactInfo: string;
  type: "mobile" | "email" | null;
  onVerify: (otp: string) => Promise<void>; // ✅ changed: parent builds payload
  onVerified: () => void;
};

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  onClose,
  contactInfo,
  type,
  onVerify,
  onVerified,
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

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setOtp(Array(6).fill(""));
    setSecondsLeft(30);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[1px] z-50">
      <div className="w-[600px] bg-white rounded-2xl shadow-lg p-8 flex flex-col">
        <button
          onClick={onClose}
          className="self-end text-sm text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-[32px] font-bold mb-2">Verify OTP</h2>
        <p className="text-[#878B94] font-normal mb-6">
          We have sent an OTP {type ? `via ${type}` : ""} to{" "}
          <span className="font-semibold">{contactInfo}</span>. <br />
          Kindly enter it below to continue.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onVerify(otp.join("")); // ✅ only pass OTP
            onVerified();
            onClose();
          }}
        >
          <div className="flex gap-3 mb-4 justify-around">
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
                  className="w-[70px] h-[90px] rounded-2xl text-center text-xl 
                     bg-white outline-none focus:bg-gray-50"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6 gap-3">
            <span
              className={`text-sm text-[#878B94] ${
                secondsLeft === 0 ? "opacity-0" : "opacity-100"
              }`}
            >
              Resend in {secondsLeft}s
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className={`text-sm font-medium pl-2 ${
                secondsLeft > 0
                  ? "text-[#B7B9BF] cursor-not-allowed"
                  : "cursor-pointer bg-gradient-to-b from-[#1A73E9] to-[#ED3237] bg-clip-text text-end text-transparent hover:underline"
              }`}
            >
              Resend OTP
            </button>
          </div>

          <button
            type="submit"
            disabled={!isOtpComplete}
            className={`w-full py-3 rounded-full text-white font-medium ${
              isOtpComplete
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
