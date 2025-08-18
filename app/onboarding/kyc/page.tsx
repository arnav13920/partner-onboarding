import KycDetails from "@/components/KycDetails";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <KycDetails/>
    </div>
  );
};

export default page;
