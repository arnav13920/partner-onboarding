"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type GstInputFieldsProps = {
  verifyGstAction: (formData: FormData) => Promise<import("../../app/onboarding/kyc/schema").VerifyGstResponse>;
  uploadPdfAction: (formData: FormData) => Promise<import("../../app/onboarding/kyc/schema").UploadPdfResponse>;
  isVerified?: boolean;
  onVerified?: () => void;
};

type UploadState = "idle" | "uploading" | "success" | "error";

const GstInputFields: React.FC<GstInputFieldsProps> = ({
  verifyGstAction,
  uploadPdfAction,
  isVerified,
  onVerified,
}) => {
  const [hasGst, setHasGst] = useState<boolean | null>(null);
  const [gstin, setGstin] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadedFile, setUploadedFile] = useState<{
    originalName: string;
    filename: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStored, setHasStored] = useState(false);

  // Prefill stored GST result
  useEffect(() => {
    try {
      const s = localStorage.getItem("kycGstData");
      if (s) {
        const obj = JSON.parse(s);
        if (obj?.gst_number) {
          setGstin(String(obj.gst_number));
        }
        if (obj?.success) {
          setHasGst(true);
          setHasStored(true);
          if (!isVerified) onVerified?.();
        }
      }
    } catch {}
  }, [isVerified, onVerified]);

  const normalizedGstin = gstin.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const isValidGstin = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(normalizedGstin);
  // Validation temporarily disabled
  // const isValidGstin: boolean = true;

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploadState("uploading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await uploadPdfAction(formData);
      setUploadedFile({
        originalName: result.data.originalName,
        filename: result.data.filename,
      });
      setUploadState("success");
      setHasStored(true);
      if (!isVerified) onVerified?.();
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Upload failed");
      setUploadState("error");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const isDisabled = Boolean(isVerified || hasStored);

  return (
    <>
      <div>
        <div className="flex flex-col p-4">
          Do you have GST?
          <div className="flex p-2 gap-3 ">
            <button
              type="button"
              onClick={() => {
                if (isDisabled || uploadState === "success") return;
                setHasGst(true);
              }}
              className={`cursor-pointer w-[140px] h-[42px] border-2 rounded-full transition-colors ${
                hasGst === true
                  ? "bg-[#0F172A] text-white border-[#0F172A]"
                  : "bg-white text-[#0F172A] border-[#B7B9BF] hover:border-[#0F172A]"
              } ${
                isDisabled || uploadState === "success"
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              disabled={isDisabled || uploadState === "success"}
              aria-pressed={hasGst === true}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                if (isDisabled || uploadState === "success") return;
                setHasGst(false);
              }}
              className={`cursor-pointer w-[140px] h-[42px] border-2 rounded-full transition-colors ${
                hasGst === false
                  ? "bg-[#0F172A] text-white border-[#0F172A]"
                  : "bg-white text-[#0F172A] border-[#B7B9BF] hover:border-[#0F172A]"
              } ${
                isDisabled || uploadState === "success"
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              disabled={isDisabled || uploadState === "success"}
              aria-pressed={hasGst === false}
            >
              No
            </button>
          </div>
        </div>
      </div>
      {hasGst && (
        <>
          <div className="flex flex-col w-full max-w-[450px]">
            {/* GST Number */}
            <div className="relative mt-4">
              <input
                id="gstNumber"
                type="text"
                placeholder="GST Number"
                value={normalizedGstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                maxLength={15}
                disabled={isDisabled}
                className="peer h-[45px] w-full rounded-2xl border border-gray-300 px-4  text-base text-gray-800 placeholder-gray-400 focus:placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <label
                htmlFor="gstNumber"
                className={`pointer-events-none absolute -top-3 left-5 bg-white px-1 text-sm text-[#575D6A] transition-opacity ${
                  normalizedGstin.length > 0
                    ? "opacity-100"
                    : "peer-focus:opacity-100 opacity-0"
                }`}
              >
                GST Number <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
          {/* Verify Button */}
          <div className="justify-end flex">
            <form
              action={async (fd: FormData) => {
                if (isDisabled) return;
                setIsSubmitting(true);
                try {
                  const userIdStr = localStorage.getItem("userId");
                  const resolvedUserId = userIdStr
                    ? Number(userIdStr)
                    : undefined;
                  if (!resolvedUserId) throw new Error("userId missing");
                  fd.set("gst_number", normalizedGstin);
                  fd.set("userId", String(resolvedUserId));
                  const resp = await verifyGstAction(fd);
                  if (typeof resp?.success === "boolean") {
                    const save = { ...resp, gst_number: normalizedGstin };
                    localStorage.setItem("kycGstData", JSON.stringify(save));
                    setHasStored(true);
                  }
                  onVerified?.();
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <button
                type="submit"
                disabled={isDisabled || isSubmitting}
                className={`mt-6 w-[140px] h-[42px] rounded-full text-sm font-medium transition-colors ${
                  isDisabled
                    ? "bg-green-600 text-white"
                    : !isSubmitting
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isDisabled
                  ? "Verified"
                  : isSubmitting
                  ? "Verifying..."
                  : "Verify"}
              </button>
            </form>
          </div>
        </>
      )}
      {hasGst === false && (
        <div className="flex flex-col gap-4">
          <div className="p-2 rounded-2xl gap-3 flex border-1 border-[B7B9BF] w-[450px] justify-center items-center">
            <p className="text-center pl-3">
              Upload GST Declaration Certificate{" "}
            </p>
            <input
              id="gstDeclaration"
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={
                uploadState === "uploading" || uploadState === "success"
              }
            />
            <label
              htmlFor="gstDeclaration"
              className={`flex justify-center items-center cursor-pointer ${
                uploadState === "uploading" || uploadState === "success"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Image
                src="/images/FileUploadIcon.png"
                alt="uploadFile"
                width={28}
                height={28}
              />
            </label>
          </div>

          {/* Upload State Display */}
          {uploadState === "uploading" && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Uploading...</span>
            </div>
          )}

          {uploadState === "success" && uploadedFile && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <Image
                src="/images/greenCheckIcon.png"
                alt="success"
                width={16}
                height={16}
              />
              <span className="text-sm font-medium">
                Uploaded successfully!
              </span>
              <span className="text-sm text-gray-600">
                ({uploadedFile.originalName})
              </span>
            </div>
          )}

          {uploadState === "error" && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <span className="text-sm font-medium">Upload failed:</span>
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GstInputFields;
