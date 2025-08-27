"use client";
import KycDetails from "@/components/KycDetails";
import {
  verifyPanAction,
  verifyBankAction,
  verifyGstAction,
  verifySrnAction,
  uploadPdfAction,
} from "./action";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userIdStr = localStorage.getItem("userId");
      const userTypeStr = localStorage.getItem("userType");
      if (userIdStr && userTypeStr) {
        setUserId(Number(userIdStr));
        setUserType(userTypeStr);
      } else {
        // fallback to onboardingData
        const onboarding = localStorage.getItem("onboardingData");
        if (onboarding) {
          const obj = JSON.parse(onboarding);
          const oid =
            obj?.data?.data?.userId ?? obj?.data?.userId ?? obj?.userId;
          const otype =
            obj?.data?.data?.userType ?? obj?.data?.userType ?? obj?.userType;
          if (oid && otype) {
            setUserId(Number(oid));
            setUserType(String(otype));
          } else {
            setError("No user found. Please login again.");
          }
        } else {
          setError("No user found. Please login again.");
        }
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      setError("Failed to load user data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !userId || !userType) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-red-600">
          {error || "Invalid user"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <KycDetails
        verifyPanAction={verifyPanAction}
        verifyBankAction={verifyBankAction}
        verifyGstAction={verifyGstAction}
        verifySrnAction={verifySrnAction}
        uploadPdfAction={uploadPdfAction}
        userId={userId}
        userType={userType}
      />
    </div>
  );
};

export default Page;
