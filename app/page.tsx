"use client";

import LoginLeftSide from "@/components/LoginLeftSide";
import LoginRightSide from "@/components/LoginRightSide";
import React from "react";
import { startOnboarding, fetchMetaData } from "./action";
import {
  sendOtpAction,
  verifyOtpAction,
} from "./onboarding/contactVerification/action";

const page = () => {
  // This function will be called when the onboarding starts
  const handleOnboardingStart = async (mobile: string) => {
    try {
      const response = await startOnboarding(mobile);
      console.log("Onboarding started:", response);
      // You can handle the response here or pass it to components
      return response;
    } catch (error) {
      console.error("Failed to start onboarding:", error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-between w-full">
      <div className="flex-1 w-[1080px]">
        <LoginLeftSide />
      </div>
      <div className="flex-1 min-h-screen flex justify-center pl-4 pr-4">
        <LoginRightSide
          onStartOnboarding={handleOnboardingStart}
          onFetchMetaData={fetchMetaData}
          onSendOtp={sendOtpAction}
          onVerifyOtp={verifyOtpAction}
        />
      </div>
    </div>
  );
};

export default page;
