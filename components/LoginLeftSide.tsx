import React from "react";
import Image from "next/image";

const LoginLeftSide = () => {
  return (
    <div className="flex flex-col p-4 sm:p-6 lg:p-10  w-full max-w-[1080px] gap-2">
      {/* Logo */}
      <div className="flex justify-start">
        <Image
          src="/images/abhiLoans.svg"
          alt="abhiLoansLogo"
          width={65}
          height={65}
          priority
        />
      </div>

      {/* Main Title + Subtitle */}
      <div className="mt-8 space-y-4 text-left">
        <p className="font-bold text-[16px] lg:text-[22px] text-[#002169] leading-snug max-w-5xl">
          Bridge short-term financial gaps for your clients through mutual
          fund/shares pledging
        </p>
        <p className="font-normal text-base text-[14px] text-[#575D6A] leading-relaxed max-w-[650px]">
        We work with our partners to achieve impossible for our customer&#39;s extra income on their investments, first time in a faster and digital way
        </p>
      </div>

      {/* Documents Section */}
      <div className="mt-10 space-y-4">
        <p className="font-bold text-xl lg:text-2xl text-[#1EA860]">
          Documents to keep handy
        </p>
        <div className="space-y-4">
          {[
            "GST Number / Declaration",
            "ARN / SRN / IRDA Registration Number",
            "PAN Card",
            "Bank Account Details",
          ].map((doc, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Image
                src="/images/checkIcon.svg"
                alt="greenCheckIcon"
                width={20}
                height={20}
              />
              <p className="font-normal lg:text-[14px]  text-[#575D6A]">
                {doc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="mt-12 gap-4 flex flex-col">
        <p className="font-bold text-xl lg:text-2xl text-[#002169]">
          Our trusted partners
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <Image
            src="/images/kFintechImage.svg"
            alt="kFintechImage"
            width={140}
            height={36}
          />
          <Image src="/images/CAMS.svg" alt="CAMS" width={97} height={36} />
          <Image
            src="/images/mfCentral.svg"
            alt="mfCentral"
            width={98}
            height={36}
          />
          <Image src="/images/NSDL.svg" alt="NSDL" width={96} height={36} />
          <Image src="/images/CDSL.svg" alt="CDSL" width={96} height={36} />
        </div>
      </div>
    </div>
  );
};

export default LoginLeftSide;
