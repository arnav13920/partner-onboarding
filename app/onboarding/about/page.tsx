import About from "@/components/About";
import { submitAboutYouAction } from "./action";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <About onSubmit={submitAboutYouAction} />
    </div>
  );
};

export default page;
