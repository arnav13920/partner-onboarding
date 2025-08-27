import React from "react";
import Image from "next/image";
import PartnerLoginCard from "./PartnerLoginCard";
import { OnboardingResponse, MetaDataResponse } from "@/app/schema";
import { VerifyOtpResponse, SendOtpResponse } from "@/app/onboarding/contactVerification/schema";

type LoginRightSideProps = {
  onStartOnboarding: (mobile: string) => Promise<OnboardingResponse>;
  onFetchMetaData: (userId: number, userType: string) => Promise<MetaDataResponse>;
  onSendOtp: (formData: FormData) => Promise<SendOtpResponse>;
  onVerifyOtp: (formData: FormData) => Promise<VerifyOtpResponse>;
};

const LoginRightSide: React.FC<LoginRightSideProps> = ({
  onStartOnboarding,
  onFetchMetaData,
  onSendOtp,
  onVerifyOtp,
}) => {
  return (
    <div className="w-full max-w-[600px] mt-2 mr-6">
      <div className="">
        <div className="flex justify-center items-center">
          <Image
            src="/images/loginSvg.svg"
            alt="loginSvg"
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="mt-2 rounded-2xl border border-gray-200 shadow-sm p-8">
          <PartnerLoginCard
            onStartOnboarding={onStartOnboarding}
            onFetchMetaData={onFetchMetaData}
            onSendOtp={onSendOtp}
            onVerifyOtp={onVerifyOtp}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRightSide;
