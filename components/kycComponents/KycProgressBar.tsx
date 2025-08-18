import React from "react";
import Image from "next/image";

const KycProgressBar = () => {
  return (
    <div className="w-[850px] h-[85px] mt-12">
      <div className="flex justify-between">
        <div className="h-[48px] w-[48px] rounded-full bg-[#1EA860] flex justify-center items-center">
          <Image
            src="/images/checkIcon.png"
            alt="checkIcon"
            height={24}
            width={24}
          />
        </div>
        <div className="h-[48px] w-[48px] rounded-full bg-[#1EA860] flex justify-center items-center">
          2
        </div>
        <div className="h-[48px] w-[48px] rounded-full bg-[#1EA860] flex justify-center items-center">
          3
        </div>
        <div className="h-[48px] w-[48px] rounded-full bg-[#1EA860] flex justify-center items-center">
          4
        </div>
      </div>
    </div>
  );
};

export default KycProgressBar;
