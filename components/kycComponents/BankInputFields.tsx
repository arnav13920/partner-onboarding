"use client";

import React, { useEffect, useState } from "react";

type BankInputFieldsProps = {
  verifyBankAction: (formData: FormData) => Promise<import("../../app/onboarding/kyc/schema").VerifyBankResponse>;
  isVerified?: boolean;
  onVerified?: () => void;
};

const BankInputFields: React.FC<BankInputFieldsProps> = ({
  verifyBankAction,
  isVerified,
  onVerified,
}) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStored, setHasStored] = useState(false);

  // Prefill from localStorage if available
  useEffect(() => {
    try {
      const bankStr = localStorage.getItem("kycBankData");
      if (bankStr) {
        const bank = JSON.parse(bankStr);
        const storedAcc: string | undefined =
          bank?.data?.account_number || bank?.data?.accountNumber;
        const storedIfsc: string | undefined =
          bank?.data?.ifsc_code || bank?.data?.ifscCode;
        if (storedAcc) setAccountNumber(String(storedAcc));
        if (storedIfsc) setIfsc(String(storedIfsc).toUpperCase());
        if (storedAcc && storedIfsc) {
          setHasStored(true);
          if (!isVerified) onVerified?.();
        }
      }
    } catch {}
  }, [isVerified, onVerified]);

  const normalizedAccountNumber = accountNumber.replace(/\D/g, "");
  const isValidAccountNumber = /^\d{9,18}$/.test(normalizedAccountNumber);
  const isValidIfsc = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  const isValid = isValidAccountNumber && isValidIfsc;

  const isDisabled = Boolean(isVerified || hasStored);

  return (
    <>
      <div className="flex flex-col w-full max-w-[450px]">
        {/* Bank Account Number */}
        <div className="relative mt-4">
          <input
            id="bankAccountNumber"
            type="text"
            placeholder="Your bank account number"
            value={normalizedAccountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, ""))
            }
            maxLength={18}
            disabled={isDisabled}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="bankAccountNumber"
            className={`pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] transition-opacity ${
              normalizedAccountNumber.length > 0
                ? "opacity-100"
                : "peer-focus:opacity-100 opacity-0"
            }`}
          >
            Bank Account Number <span className="text-red-500">*</span>
          </label>
        </div>

        {/* IFSC Code */}
        <div className="relative mt-4">
          <input
            id="ifscCode"
            type="text"
            placeholder="IFSC code"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
            maxLength={11}
            disabled={isDisabled}
            className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="ifscCode"
            className={`pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] transition-opacity ${
              ifsc.length > 0
                ? "opacity-100"
                : "peer-focus:opacity-100 opacity-0"
            }`}
          >
            IFSC Code <span className="text-red-500">*</span>
          </label>
        </div>
      </div>
      {/* Verify Button */}
      <div className="justify-end flex">
        <form
          action={async (fd: FormData) => {
            if (!isValid || isDisabled) return;
            setIsSubmitting(true);
            try {
              const userIdStr = localStorage.getItem("userId");
              const resolvedUserId = userIdStr ? Number(userIdStr) : undefined;
              if (!resolvedUserId) throw new Error("userId missing");
              fd.set("account_number", accountNumber.replace(/\D/g, ""));
              fd.set("ifsc_code", ifsc);
              fd.set("userId", String(resolvedUserId));
              const resp = await verifyBankAction(fd);
              if (resp?.data) {
                const save = {
                  success: resp.success,
                  message: resp.message,
                  data: {
                    accountStatus: resp.data.accountStatus,
                    beneficiaryName: resp.data.beneficiaryName,
                    bankReferenceNumber: resp.data.bankReferenceNumber,
                    transactionId: resp.data.transactionId,
                    account_number: accountNumber.replace(/\D/g, ""),
                    ifsc_code: ifsc,
                  },
                };
                localStorage.setItem("kycBankData", JSON.stringify(save));
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
            className={`mt-6 w-[140px] h-[42px] rounded-full text-sm font-medium transition-colors ${
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

export default BankInputFields;
