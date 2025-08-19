"use client";
import { useState } from "react";
import AbhiLoansModal from "@/components/AbhiLoansModal";
import OnboardingModal from "@/components/OnboardingModal";

export default function Page() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-center items-center">
      {open && <AbhiLoansModal onClose={() => setOpen(false)} />}
      {/* {open && <OnboardingModal onClose={() => setOpen(false)} />} */}
    </div>
  );
}