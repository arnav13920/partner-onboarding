"use client";

import { useRouter } from "next/navigation";
import ContactVerification from "@/components/ContactVerification";
import LeftSide from "./components/LeftSide";
import RighSide from "./components/RighSide";
import VerifyOtpModal from "@/components/VerifyOtpModal";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding/contactVerification");
  };

  return (
    <div className="flex justify-evenly">
      <LeftSide />
      <RighSide onGetStarted={handleGetStarted} />
    </div>
  );
}
