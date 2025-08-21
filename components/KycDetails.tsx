"use client";

import React, { useState } from "react";
import Image from "next/image";
import PanInputFields from "./kycComponents/PanInputFields";
import GstInputFields from "./kycComponents/GstInputFields";
import BankInputFields from "./kycComponents/BankInputFields";
import RegistrationNumberInputs from "./kycComponents/RegistrationNumberInputs";
import { useRouter } from "next/navigation";

type KycDetailsProps = {
  verifyPanAction: (formData: FormData) => Promise<any>;
  verifyBankAction: (formData: FormData) => Promise<any>;
  verifyGstAction: (formData: FormData) => Promise<any>;
  verifySrnAction: (formData: FormData) => Promise<any>;
};

const KycDetails: React.FC<KycDetailsProps> = ({
  verifyPanAction,
  verifyBankAction,
  verifyGstAction,
  verifySrnAction,
}) => {
  const [isPanOpen, setIsPanOpen] = useState(true);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isGstOpen, setIsGstOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPanVerified, setIsPanVerified] = useState(false);
  const [isBankVerified, setIsBankVerified] = useState(false);
  const [isGstVerified, setIsGstVerified] = useState(false);
  const [isSrnVerified, setIsSrnVerified] = useState(false);
  const router = useRouter();
  const isNextEnabled =
    isPanVerified && isBankVerified && isGstVerified && isSrnVerified;
  return (
    <>
      <div className="px-14 py-6 max-w-5xl">
        {/* Step Heading */}
        <p className="font-bold text-[20px] text-[#002169] uppercase">
          STEP 3 of 5
        </p>

        {/* Title Section */}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/kycDetailsIcon.png"
              alt="aboutUser"
              width={36}
              height={36}
            />
            <p className="font-bold text-3xl text-[#0F172A]">KYC Details</p>
          </div>
          <div className="mt-3 mb-3">
            <p className="text-lg font-bold text-[#575D6A]">
              Let’s Verify Your Identity
            </p>
            <div className="flex items-start gap-3 mt-2 text-[#475569]">
              <Image
                src="/images/docImage.png"
                alt="doc icon"
                width={45}
                height={50}
              />
              <p className="max-w-xl text-sm leading-relaxed">
                This helps us verify your identity and comply with regulatory
                requirements. It also ensures your account remains secure and
                trustworthy.
              </p>
            </div>
          </div>
        </div>
        {/* Accordions for each step verification */}
        <div className="border border-gray-300 rounded-md shadow-md px-8">
          {/* pan field */}
          <div className="flex flex-col">
            <div
              className=" h-[65px] w-[850px] flex items-center justify-between mt-2 p-4 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-expanded={isPanOpen}
              aria-controls="pan-accordion-panel"
              onClick={() => setIsPanOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsPanOpen((prev) => !prev);
                }
              }}
            >
              <p className="font-normal">PAN</p>
              <Image
                src="/images/dropdown.png"
                alt="dropdownButton"
                width={20}
                height={20}
                className={`${
                  isPanOpen ? "rotate-180" : "rotate-0"
                } transition-transform duration-200`}
              />
            </div>
            {isPanOpen && (
              <div id="pan-accordion-panel" className="mt-2">
                <PanInputFields
                  verifyPanAction={verifyPanAction}
                  isVerified={isPanVerified}
                  onVerified={() => {
                    setIsPanVerified(true);
                    setIsPanOpen(false);
                    setIsBankOpen(true);
                  }}
                />
              </div>
            )}
          </div>

          {/* Bank Details */}
          <div
            className="h-[65px] w-[850px] flex items-center justify-between mt-4 p-4 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-expanded={isBankOpen}
            aria-controls="bank-accordion-panel"
            onClick={() => setIsBankOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsBankOpen((prev) => !prev);
              }
            }}
          >
            <p className="font-normal">Bank Details</p>
            <Image
              src="/images/dropdown.png"
              alt="dropdownButton"
              width={20}
              height={20}
              className={`${
                isBankOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </div>
          {isBankOpen && (
            <div id="bank-accordion-panel" className="mt-2">
              <BankInputFields
                verifyBankAction={verifyBankAction}
                isVerified={isBankVerified}
                onVerified={() => {
                  setIsBankVerified(true);
                  setIsBankOpen(false);
                  setIsGstOpen(true);
                }}
              />
            </div>
          )}

          {/* GST */}
          <div
            className=" h-[65px] w-[850px] flex items-center justify-between mt-4 p-4 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-expanded={isGstOpen}
            aria-controls="gst-accordion-panel"
            onClick={() => setIsGstOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsGstOpen((prev) => !prev);
              }
            }}
          >
            <p className="font-normal">GST</p>
            <Image
              src="/images/dropdown.png"
              alt="dropdownButton"
              width={20}
              height={20}
              className={`${
                isGstOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </div>
          {isGstOpen && (
            <div id="gst-accordion-panel" className="mt-2">
              <GstInputFields
                verifyGstAction={verifyGstAction}
                isVerified={isGstVerified}
                onVerified={() => {
                  setIsGstVerified(true);
                  setIsGstOpen(false);
                  setIsRegistrationOpen(true);
                }}
              />
            </div>
          )}

          {/* Registration Number */}
          <div
            className=" h-[65px] w-[850px] flex items-center justify-between mt-4 p-4 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-expanded={isRegistrationOpen}
            aria-controls="registration-accordion-panel"
            onClick={() => setIsRegistrationOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsRegistrationOpen((prev) => !prev);
              }
            }}
          >
            <p className="font-normal">Registration Number</p>
            <Image
              src="/images/dropdown.png"
              alt="dropdownButton"
              width={20}
              height={20}
              className={`${
                isRegistrationOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </div>
          {isRegistrationOpen && (
            <div id="registration-accordion-panel" className="mt-2 mb-2">
              <RegistrationNumberInputs
                verifySrnAction={verifySrnAction}
                isVerified={isSrnVerified}
                onVerified={() => {
                  setIsSrnVerified(true);
                  setIsRegistrationOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Back & Next Buttons */}
        <div className="mt-20 flex  w-[900px]">
          <button
            type="button"
            onClick={() => router.push("/onboarding/about")}
            className="px-8 py-2 rounded-full font-medium border border-gray-400 text-gray-600 hover:bg-gray-100 mr-4"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => {
              if (isNextEnabled) router.push("/onboarding/keyPersonDetails");
            }}
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
      </div>
    </>
  );
};

export default KycDetails;
