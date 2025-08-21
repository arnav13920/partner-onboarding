"use client";
import { useState } from "react";
import AbhiLoansModal from "@/components/AbhiLoansModal";
import Sidebar from "@/components/Sidebar";
import Esign from "@/components/Esign";
import OnboardingModal from "@/components/OnboardingModal";

export default function Page() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Esign />
      </div>
      {open && <AbhiLoansModal onClose={() => setOpen(false)} />}
    </>
  );
}
