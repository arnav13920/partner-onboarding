import ContactVerification from "@/components/ContactVerification";
import { sendOtpAction, verifyOtpAction } from "./action";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ContactVerification
        sendOtpAction={sendOtpAction}
        verifyOtpAction={verifyOtpAction}
      />
    </div>
  );
};

export default page;
