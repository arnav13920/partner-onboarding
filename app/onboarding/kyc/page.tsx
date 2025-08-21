import KycDetails from "@/components/KycDetails";
import {
  verifyPanAction,
  verifyBankAction,
  verifyGstAction,
  verifySrnAction,
} from "./action";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <KycDetails
        verifyPanAction={verifyPanAction}
        verifyBankAction={verifyBankAction}
        verifyGstAction={verifyGstAction}
        verifySrnAction={verifySrnAction}
      />
    </div>
  );
};

export default page;
