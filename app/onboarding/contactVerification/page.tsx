import ContactVerification from "@/components/ContactVerification";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ContactVerification />
    </div>
  );
};

export default page;
