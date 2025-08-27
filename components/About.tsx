"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AboutProps = {
  onSubmit: (formData: FormData) => Promise<Record<string, unknown>>;
  userId: number;
  userType: string;
};

const About: React.FC<AboutProps> = ({ onSubmit, userId, userType }) => {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);
  const router = useRouter();

  const question1Options = [
    "Direct Selling Agent",
    "SEBI Registered Investment Advisor",
    "AMFI Registered MF Distributor",
    "Insurance Agent",
    "Others",
  ];

  const question2Options = ["Company", "Individual/Sole Proprietorship"];
  const question3Options = ["Only Individual", "Sole Proprietorship"];

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const aboutData = localStorage.getItem("aboutData");
    if (aboutData) {
      try {
        const data = JSON.parse(aboutData);
        // Prefill unconditionally if data has expected fields
        const hasQ1 =
          typeof data.partnerIdentity === "string" &&
          data.partnerIdentity.length > 0;
        const hasQ2 =
          typeof data.businessType === "string" && data.businessType.length > 0;
        const hasQ3 =
          typeof data.businessCategory === "string" &&
          data.businessCategory.length > 0;
        if (hasQ1) setQ1(data.partnerIdentity);
        if (hasQ2) setQ2(data.businessType);
        if (hasQ3) setQ3(data.businessCategory);
        if (
          hasQ1 &&
          hasQ2 &&
          (data.businessType === "Company" ? true : hasQ3)
        ) {
          setHasExistingData(true);
        }
        console.log("Loaded existing about data:", data);
      } catch (error) {
        console.error("Failed to parse about data:", error);
      }
    }
  }, [userId, userType]);

  const gradientClasses = (selected: boolean) =>
    `${selected ? "bg-[#1A73E9]" : "bg-[#D1E3FB]"} p-[2px] rounded-full`;

  const innerClasses = (selected: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium w-full h-full transition 
     ${selected ? "bg-[#1A73E9] text-white" : "bg-white text-black"} ${
      hasExistingData ? "cursor-not-allowed opacity-90" : ""
    }`;

  const isNextEnabled = Boolean(
    q1 && q2 && (q2 === "Individual/Sole Proprietorship" ? q3 : true)
  );

  const handleNext = async () => {
    if (!isNextEnabled) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      if (hasExistingData) {
        // If data already exists, skip API call and go directly to next page
        console.log("Using existing about data, skipping API call");
        router.push("/onboarding/contactVerification");
      } else {
        // New data, call API and save response
        const fd = new FormData();
        fd.set("partner_identity", q1 ?? "");
        fd.set("buisness_type", q2 ?? "");
        if (q2 !== "Company") {
          fd.set("buisness_category", q3 ?? "");
        }
        fd.set("userId", userId.toString());
        fd.set("userType", userType);

        const response = await onSubmit(fd) as Record<string, unknown>;

        // Save response to localStorage - handle nested data structure
        if ((response as { data?: { data?: unknown } })?.data?.data) {
          localStorage.setItem("aboutData", JSON.stringify((response as { data: { data: unknown } }).data.data));
          console.log("About data saved to localStorage:", (response as { data: { data: unknown } }).data.data);
        }

        router.push("/onboarding/contactVerification");
      }
    } catch (e) {
      console.error("About submission failed:", e);
      setSubmitError("Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-6 max-w-5xl">
      {/* Step Heading */}
      <p className="font-bold text-[20px] text-[#002169] uppercase">
        STEP 1 of 5
      </p>

      {/* Title Section */}
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Aboutuser.png"
            alt="aboutUser"
            width={36}
            height={36}
          />
          <p className="font-bold text-3xl text-[#0F172A]">About You</p>
        </div>
        <div className="mt-3">
          <p className="text-lg font-bold text-[#575D6A]">
            Let&#39;s Get to Know You
          </p>
          <div className="flex items-start gap-3 mt-2 text-[#475569]">
            <p className="max-w-full text-sm leading-relaxed">
              This quick step helps us understand your registration type and
              business structure, so we can tailor your onboarding experience
              and documentation. It only takes a minute!
            </p>
          </div>
          {hasExistingData && (
            <p className="text-sm text-[#1EA860] mt-2">
              Prefilled from your saved details. Fields are locked.
            </p>
          )}
        </div>
      </div>

      {/* Question 1 */}
      <div className="mt-8">
        <p className="font-medium text-[#0F172A]">
          1. Who are you: <span className="text-red-600">*</span>
        </p>
        <div className="flex gap-4 mt-4 flex-wrap">
          {question1Options.map((label) => (
            <div key={label} className={gradientClasses(q1 === label)}>
              <button
                onClick={() => {
                  if (hasExistingData) return;
                  setQ1(label);
                }}
                disabled={hasExistingData}
                className={innerClasses(q1 === label)}
              >
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="mt-8">
        <p className="font-medium text-[#0F172A]">
          2. Your business type: <span className="text-red-600">*</span>
        </p>
        <div className="flex gap-4 mt-4 flex-wrap">
          {question2Options.map((label) => (
            <div key={label} className={gradientClasses(q2 === label)}>
              <button
                onClick={() => {
                  if (hasExistingData) return;
                  setQ2(label);
                  setQ3(null);
                }}
                disabled={hasExistingData}
                className={innerClasses(q2 === label)}
              >
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Question 3 — Only visible if Q2 is answered */}
      {q2 === "Individual/Sole Proprietorship" && (
        <div className="mt-8">
          <p className="font-medium text-[#0F172A]">
            3. Are you: <span className="text-red-600">*</span>
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            {question3Options.map((label) => (
              <div key={label} className={gradientClasses(q3 === label)}>
                <button
                  onClick={() => {
                    if (hasExistingData) return;
                    setQ3(label);
                  }}
                  disabled={hasExistingData}
                  className={innerClasses(q3 === label)}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="mt-10">
        <button
          type="button"
          onClick={handleNext}
          disabled={!isNextEnabled || isLoading}
          className={`px-8 py-2 rounded-full font-medium transition ${
            isNextEnabled && !isLoading
              ? "bg-[#1EA860] text-white cursor-pointer"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "Next"}
        </button>
        {submitError && (
          <p className="text-red-600 text-sm mt-3">{submitError}</p>
        )}
        {hasExistingData && (
          <p className="text-green-600 text-sm mt-3">
            ✓ Using previously saved data
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
