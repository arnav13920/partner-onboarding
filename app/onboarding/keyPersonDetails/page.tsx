import ContactFrom from "@/components/ContactForm";
import { addKeyPersonDetails } from "./action";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ContactFrom submitAction={addKeyPersonDetails} />
    </div>
  );
};

export default page;
