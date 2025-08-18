"use client";
import React, { useState } from "react";
import Image from "next/image";

const About = () => {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  const question1Options = [
    "Direct Selling Agent",
    "SEBI Registered Investment Advisor",
    "AMFI Registered MF Distributor",
    "Insurance Agent",
    "Others",
  ];

  const question2Options = ["Company", "Individual/Sole Proprietorship"];
  const question3Options = ["Only Individual", "Sole Proprietorship"];

  const gradientClasses =
    "bg-gradient-to-b from-[#ED323733] to-[#1A73E933] p-[2px] rounded-full";

  const innerClasses = (selected: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium w-full h-full transition 
     ${
       selected
         ? "bg-gradient-to-r from-[#ED3237] to-[#1A73E9] text-white"
         : "bg-white text-black"
     }`;

  const isNextEnabled = q1 && q2 && q3;

  return (
    <div className="px-8 py-6 max-w-5xl">
      {/* Step Heading */}
      <p className="font-bold text-[20px] text-[#002169] uppercase">STEP 1 of 5</p>

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
            Let’s Get to Know You
          </p>
          <div className="flex items-start gap-3 mt-2 text-[#475569]">
            <Image
              src="/images/docImage.png"
              alt="doc icon"
              width={45}
              height={50}
            />
            <p className="max-w-2xl text-sm leading-relaxed">
              This quick step helps us understand your registration type and
              business structure, so we can tailor your onboarding experience
              and documentation. It only takes a minute!
            </p>
          </div>
        </div>
      </div>

      {/* Question 1 */}
      <div className="mt-8">
        <p className="font-medium text-[#0F172A]">
          1. Who are you: <span className="text-red-600">*</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {question1Options.map((label) => (
            <div key={label} className={gradientClasses}>
              <button
                onClick={() => setQ1(label)}
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
            <div key={label} className={gradientClasses}>
              <button
                onClick={() => setQ2(label)}
                className={innerClasses(q2 === label)}
              >
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Question 3 — Only visible if Q2 is answered */}
      {q2 && (
        <div className="mt-8">
          <p className="font-medium text-[#0F172A]">
            3. Are you: <span className="text-red-600">*</span>
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            {question3Options.map((label) => (
              <div key={label} className={gradientClasses}>
                <button
                  onClick={() => setQ3(label)}
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
  );
};

export default About;
