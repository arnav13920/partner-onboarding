"use client";

import React, { useEffect, useState } from "react";

type RegistrationNumberInputsProps = {
  verifySrnAction: (formData: FormData) => Promise<Record<string, unknown>>;
  isVerified?: boolean;
  onVerified?: () => void;
};

const RegistrationNumberInputs: React.FC<RegistrationNumberInputsProps> = ({
  verifySrnAction,
  isVerified,
  onVerified,
}) => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStored, setHasStored] = useState(false);

  // Simple validation: 5-30 uppercase letters/digits and allowed separators
  const normalized = registrationNumber.toUpperCase();
  const isValid = /^[A-Z0-9\-\/]{5,30}$/.test(normalized);

  // Prefill
  useEffect(() => {
    try {
      const s = localStorage.getItem("kycSrnData");
      if (s) {
        const obj = JSON.parse(s);
        if (obj?.srn_number) setRegistrationNumber(String(obj.srn_number));
        if (obj?.success) {
          setHasStored(true);
          if (!isVerified) onVerified?.();
        }
      }
    } catch {}
  }, [isVerified, onVerified]);

  const isDisabled = Boolean(isVerified || hasStored);

  return (
    <>
      <div className="flex flex-col w-full max-w-[450px]">
        <div className="relative mt-4">
          <input
            id="registrationNumber"
            type="text"
            placeholder="Enter Registration Number"
            value={normalized}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            maxLength={30}
            disabled={isDisabled}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="registrationNumber"
            className={`pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] transition-opacity ${
              normalized.length > 0
                ? "opacity-100"
                : "peer-focus:opacity-100 opacity-0"
            }`}
          >
            SRN <span className="text-red-500">*</span>
          </label>
        </div>
      </div>
      <div className="justify-end flex mb-2">
        <form
          action={async (fd: FormData) => {
            if (!isValid || isDisabled) return;
            setIsSubmitting(true);
            try {
              const userIdStr = localStorage.getItem("userId");
              const resolvedUserId = userIdStr ? Number(userIdStr) : undefined;
              if (!resolvedUserId) throw new Error("userId missing");
              fd.set("srn_number", normalized);
              fd.set("userId", String(resolvedUserId));
              const resp = await verifySrnAction(fd);
              if (typeof resp?.success === "boolean") {
                const save = { ...resp, srn_number: normalized };
                localStorage.setItem("kycSrnData", JSON.stringify(save));
                setHasStored(true);
              }
              onVerified?.();
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <button
            type="submit"
            disabled={!isValid || isDisabled || isSubmitting}
            className={`mt-6  w-[140px] h-[42px] cursor-pointer rounded-full text-sm font-medium transition-colors ${
              isDisabled
                ? "bg-green-600 text-white"
                : isValid && !isSubmitting
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

export default RegistrationNumberInputs;
