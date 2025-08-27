"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const steps = [
  {
    route: "/onboarding/about",
    icon: "/images/AboutCard.png",
    title: "About You",
    desc: "Tell us about your registration type and business structure",
  },
  {
    route: "/onboarding/contactVerification",
    icon: "/images/ContactLogo.png",
    title: "Contact Verification",
    desc: "Verify your contact details via OTP for secure access",
  },
  {
    route: "/onboarding/kyc",
    icon: "/images/kycLogo.png",
    title: "KYC Details",
    desc: "Share identity and bank details for secure payouts and compliance",
  },
  {
    route: "/onboarding/keyPerson",
    icon: "/images/KeyPerson.png",
    title: "Key Person Details",
    desc: "Enter details of the authorized person representing your business",
  },
  {
    route: "/onboarding/eSigning",
    icon: "/images/eSign.png",
    title: "eSigning",
    desc: "Digitally sign your partner agreement to complete onboarding",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  // detect current step index
  const currentIndex = steps.findIndex((s) =>
    pathname.startsWith(s.route)
  );

  return (
    <div className="flex flex-col items-start min-h-screen px-6 py-8 bg-gradient-to-b from-[#1A73E933] to-[#ED323733] border-r-2 border-gray-200">
      {/* Logo */}
      <div className="mb-12">
        <Image
          src="/images/AbhiLoansLogo.png"
          alt="logo"
          width={64}
          height={64}
        />
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-12">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={index} className="flex items-start gap-4 relative">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center z-10 
                    ${
                      isCompleted
                        ? "bg-[#002169]" // completed → blue with check
                        : isCurrent
                        ? "bg-[#f7f7f7]" // current → blue with white icon
                        : "bg-white border border-gray-300"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Image
                      src="/images/checkIcon.png"
                      alt="done"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <div
                    className={`w-6 h-6 ${isCurrent ? "bg-[#002169]" : "bg-gray-400"}`}
                    style={{
                      maskImage: `url(${step.icon})`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskImage: `url(${step.icon})`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                    }}
                  />
                  
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-[48px] h-[calc(100%+48px)] border-l-2
                      ${
                        isCompleted
                          ? "border-[#002169]"
                          : isCurrent
                          ? "border-dashed border-[#878B94]"
                          : "border-dashed border-[#878B94]"
                      }
                    `}
                  />
                )}
              </div>

              {/* Step Text */}
              <div className="max-w-[250px] gap-3 flex flex-col">
                <p
                  className={`font-bold text-[20px] leading-snug
                    ${ isCurrent ? "text-[#002169]" : "text-[#575D6A]"}
                  `}
                >
                  {step.title}
                </p>
                <p className="font-normal text-[14px] text-[#878B94] leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
