import About from "@/components/About";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <About/>
    </div>
  );
};

export default page;
