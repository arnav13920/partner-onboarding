"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Esign from "@/components/Esign";
import OnboardingModal from "@/components/OnboardingModal";

function EsignPageContent() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("esignStatus");
    if (status === "success") {
      setOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Esign />
      </div>
      {open && <OnboardingModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EsignPageContent />
    </Suspense>
  );
}
