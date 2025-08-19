import React from "react";
import Image from "next/image";

const LeftSide = () => {
  return (
    <div className="flex flex-col items-start justify-start h-screen px-8 py-8 border-r-gray-200 border-r-2">
      {/* First logo */}
      <div className="mb-8">
        <Image
          src="/images/abhiLoans.svg"
          alt="logo"
          width={64}
          height={64}
        />
      </div>

      {/* Second image */}
      <div>
        <Image
          src="/images/group.png"
          alt="Group"
          width={590}
          height={577}
        />
      </div>
    </div>
  );
};

export default LeftSide;
