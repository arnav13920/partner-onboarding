import React from "react";
import Image from "next/image";

const RightSide = () => {
  const documents = [
    { icon: "/images/Gst.png", label: "GST No./ Declaration" },
    { icon: "/images/PAnLogo.png", label: "PAN Card" },
    { icon: "/images/Registration.png", label: "ARN / SRN / IRDA Registration No." },
    { icon: "/images/BankLogo.png", label: "Bank Account Details" },
  ];

  return (
    <div className="flex flex-col justify-center items-center px-6 py-8">
      {/* Title Section */}
      <h2 className="font-bold text-[40px] text-center text-[#002169] mb-2">
        Become an Abhi Loans partner
      </h2>
      <h4 className="font-bold text-[24px] text-center text-[#8090B4] mb-8">
        Supercharge your income
      </h4>

      {/* Documents Section */}
      <h3 className="font-bold text-[32px] text-center text-[#002169] mb-6">
        Documents to keep handy
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center border w-[330px] h-[70px] rounded-md px-4 gap-4 text-[#002169] font-bold text-[15px] shadow-sm"
          >
            <div className="h-[50px] w-[50px] bg-[#002169] rounded-full flex items-center justify-center">
              <Image src={doc.icon} alt={doc.label} height={23} width={20} />
            </div>
            <p>{doc.label}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="font-bold text-[15px] text-white bg-[#002169] rounded-[50px] w-[300px] h-[64px] hover:bg-[#00164d] transition-colors">
        Get Started
      </button>
    </div>
  );
};

export default RightSide;
