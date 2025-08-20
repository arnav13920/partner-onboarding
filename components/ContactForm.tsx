"use client";

import React, { useState } from "react";
import Image from "next/image";

type Contact = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
};

const emptyContact: Contact = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
};

const ContactForm = () => {
  const MAX_CONTACTS = 3;
  const [contacts, setContacts] = useState<Contact[]>([emptyContact]);

  const isNextEnabled = false;

  return (
    <>
      <div className="px-14 py-6 max-w-5xl">
        {/* Step Heading */}
        <p className="font-bold text-[20px] text-[#002169] uppercase">
          STEP 4 of 5
        </p>

        {/* Title Section */}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/keyPersonDetails.png"
              alt="aboutUser"
              width={36}
              height={36}
            />
            <p className="font-bold text-3xl text-[#0F172A]">
              Key Person Details
            </p>
          </div>
          <div className="mt-3 mb-3">
            <p className="text-lg font-bold text-[#575D6A]">
              Let’s Identify the Primary Point of Contact
            </p>
            <div className="flex items-start gap-3 mt-2 text-[#475569]">
              <Image
                src="/images/docImage.png"
                alt="doc icon"
                width={45}
                height={50}
              />
              <p className="max-w-xl text-sm leading-relaxed">
                This helps us identify the main point of contact and personalize
                your experience. All important communication will be directed
                here.
              </p>
            </div>
          </div>
        </div>

        {contacts.map((c, idx) => {
          const isValidFirstName = /^[A-Za-z]{2,}$/.test(c.firstName);
          const isValidLastName = /^[A-Za-z]{2,}$/.test(c.lastName);
          const isValidMobile = /^[6-9]\d{9}$/.test(c.mobile);
          const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email);

          return (
            <div key={idx} className="mt-4">
              <div className="flex items-center justify-between mt-4 mr-[50px]">
                <h3 className="font-bold text-[20px] text-[#575D6A]">
                  Contact {idx + 1}
                </h3>
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setContacts((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="bg-red-600 text-white text-sm px-4 h-[34px] rounded-full hover:bg-red-700 transition-colors"
                    aria-label={`Delete Contact ${idx + 1}`}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className=" grid grid-cols-2 gap-4 max-w-[850px]">
                {/* First Name */}
                <div className="relative mt-4">
                  <input
                    id={`firstName-${idx}`}
                    type="text"
                    placeholder="First Name"
                    value={c.firstName}
                    onChange={(e) =>
                      setContacts((prev) =>
                        prev.map((pc, i) =>
                          i === idx
                            ? {
                                ...pc,
                                firstName: e.target.value.replace(
                                  /[^A-Za-z]/g,
                                  ""
                                ),
                              }
                            : pc
                        )
                      )
                    }
                    maxLength={50}
                    aria-invalid={!isValidFirstName && c.firstName.length > 0}
                    className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <label
                    htmlFor={`firstName-${idx}`}
                    className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Last Name */}
                <div className="relative mt-4">
                  <input
                    id={`lastName-${idx}`}
                    type="text"
                    placeholder="Last Name"
                    value={c.lastName}
                    onChange={(e) =>
                      setContacts((prev) =>
                        prev.map((pc, i) =>
                          i === idx
                            ? {
                                ...pc,
                                lastName: e.target.value.replace(
                                  /[^A-Za-z]/g,
                                  ""
                                ),
                              }
                            : pc
                        )
                      )
                    }
                    maxLength={50}
                    aria-invalid={!isValidLastName && c.lastName.length > 0}
                    className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <label
                    htmlFor={`lastName-${idx}`}
                    className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Mobile Number with +91 prefix */}
                <div className="relative mt-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#575D6A]">
                    +91
                  </span>
                  <input
                    id={`mobile-${idx}`}
                    type="text"
                    placeholder="xxxxxxxxxx"
                    value={c.mobile}
                    onChange={(e) => {
                      const digitsOnly = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setContacts((prev) =>
                        prev.map((pc, i) =>
                          i === idx ? { ...pc, mobile: digitsOnly } : pc
                        )
                      );
                    }}
                    inputMode="numeric"
                    maxLength={10}
                    aria-invalid={!isValidMobile && c.mobile.length > 0}
                    className="peer h-[45px] w-full rounded-2xl border border-gray-300 pl-14 pr-4 text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <label
                    htmlFor={`mobile-${idx}`}
                    className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Email Address */}
                <div className="relative mt-4">
                  <input
                    id={`email-${idx}`}
                    type="email"
                    placeholder="name@example.com"
                    value={c.email}
                    onChange={(e) =>
                      setContacts((prev) =>
                        prev.map((pc, i) =>
                          i === idx ? { ...pc, email: e.target.value } : pc
                        )
                      )
                    }
                    maxLength={100}
                    aria-invalid={!isValidEmail && c.email.length > 0}
                    className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <label
                    htmlFor={`email-${idx}`}
                    className="pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] opacity-0 peer-focus:opacity-100 transition-opacity"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}

        {contacts.length < MAX_CONTACTS && (
          <button
            type="button"
            onClick={() => setContacts((prev) => [...prev, emptyContact])}
            className="bg-[#002169] h-[48px] w-[240px] rounded-[50px] flex justify-evenly items-center mt-8 cursor-pointer text-white"
          >
            <Image
              src="/images/AddIcon.png"
              alt="Add Icon"
              width={24}
              height={24}
            />
            <span>Add Another Contact</span>
          </button>
        )}
        {/* Back & Next Buttons */}
        <div className="mt-12 flex  w-[900px]">
          <button className="px-8 py-2 rounded-full font-medium border border-gray-400 text-gray-600 hover:bg-gray-100 mr-4">
            Back
          </button>

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
    </>
  );
};

export default ContactForm;
