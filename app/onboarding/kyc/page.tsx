import KycDetails from "@/components/KycDetails";
import {
  verifyPanAction,
  verifyBankAction,
  verifyGstAction,
  verifySrnAction,
  uploadPdfAction,
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
        uploadPdfAction={uploadPdfAction}
      />
    </div>
  );
};

export default page;
