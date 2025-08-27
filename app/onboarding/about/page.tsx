"use client";

import About from "@/components/About";
import { submitAboutYouAction } from "./action";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const onboardingData = localStorage.getItem("onboardingData");
      if (onboardingData) {
        const data = JSON.parse(onboardingData);
        setUserId(data.userId);
        setUserType(data.userType);
      } else {
        setError("No onboarding data found. Please start from the beginning.");
      }
    } catch (error) {
      console.error("Failed to load onboarding data:", error);
      setError("Failed to load user data. Please start from the beginning.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !userId || !userType) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600">{error || "Invalid user data"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <About
        onSubmit={submitAboutYouAction}
        userId={userId}
        userType={userType}
      />
    </div>
  );
};

export default Page;
