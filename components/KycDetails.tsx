"use client";

import React, { useState } from "react";
import Image from "next/image";
import PanInputFields from "./kycComponents/PanInputFields";
import GstInputFields from "./kycComponents/GstInputFields";
import BankInputFields from "./kycComponents/BankInputFields";
import RegistrationNumberInputs from "./kycComponents/RegistrationNumberInputs";

const KycDetails = () => {
  const [isPanOpen, setIsPanOpen] = useState(true);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isGstOpen, setIsGstOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
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

        {/* pan field */}
        <div className="flex flex-col">
          <div className=" h-[65px] w-[850px] flex items-center justify-between mt-8 p-4">
            <p className="font-normal">PAN</p>
            <button
              type="button"
              onClick={() => setIsPanOpen((prev) => !prev)}
              className="cursor-pointer"
              aria-expanded={isPanOpen}
              aria-controls="pan-accordion-panel"
            >
              <Image
                src="/images/dropdown.png"
                alt="dropdownButton"
                width={20}
                height={20}
                className={`${
                  isPanOpen ? "rotate-180" : "rotate-0"
                } transition-transform duration-200`}
              />
            </button>
          </div>
          {isPanOpen && (
            <div id="pan-accordion-panel" className="mt-2">
              <PanInputFields />
            </div>
          )}
        </div>

        {/* Bank Details */}
        <div className="h-[65px] w-[850px] flex items-center justify-between mt-4 p-4">
          <p className="font-normal">Bank Details</p>
          <button
            type="button"
            onClick={() => setIsBankOpen((prev) => !prev)}
            className="cursor-pointer"
            aria-expanded={isBankOpen}
            aria-controls="bank-accordion-panel"
          >
            <Image
              src="/images/dropdown.png"
              alt="dropdownButton"
              width={20}
              height={20}
              className={`${
                isBankOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </button>
        </div>
        {isBankOpen && (
          <div id="bank-accordion-panel" className="mt-2">
            <BankInputFields />
          </div>
        )}

        {/* GST */}
        <div className=" h-[65px] w-[850px] flex items-center justify-between mt-4 p-4">
          <p className="font-normal">GST</p>
          <button
            type="button"
            onClick={() => setIsGstOpen((prev) => !prev)}
            className="cursor-pointer"
            aria-expanded={isGstOpen}
            aria-controls="gst-accordion-panel"
          >
            <Image
              src="/images/dropdown.png"
              alt="dropdownButton"
              width={20}
              height={20}
              className={`${
                isGstOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </button>
        </div>
        {isGstOpen && (
          <div id="gst-accordion-panel" className="mt-2">
            <GstInputFields />
          </div>
        )}

        {/* Registration Number */}
        <div className=" h-[65px] w-[850px] flex items-center justify-between mt-4 p-4">
          <p className="font-normal">Registration Number</p>
          <button
            type="button"
            onClick={() => setIsRegistrationOpen((prev) => !prev)}
            className="cursor-pointer"
            aria-expanded={isRegistrationOpen}
            aria-controls="registration-accordion-panel"
          >
            <Image
              src="/images/dropdown.png"
              alt="dropdownButton"
              width={20}
              height={20}
              className={`${
                isRegistrationOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </button>
        </div>
        {isRegistrationOpen && (
          <div id="registration-accordion-panel" className="mt-2">
            <RegistrationNumberInputs />
          </div>
        )}
      </div>
    </>
  );
};

export default KycDetails;
