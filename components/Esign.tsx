import React from 'react'
import Image from 'next/image'

const Esign = () => {
  return (
    <>
  <div className="px-14 py-6 max-w-5xl">
     {/* Step Heading */}
     <p className="font-bold text-[20px] text-[#002169] uppercase">
     STEP 5 of 5
   </p>

   {/* Title Section */}
   <div className="mt-4">
     <div className="flex items-center gap-3">
       <Image
         src="/images/keyPersonDetails.png"
         alt="aboutUser"
         width={36}
         height={36}
       />
       <p className="font-bold text-3xl text-[#0F172A]">
         eSigning
       </p>
     </div>
     <div className="mt-3 mb-3">
       <p className="text-lg font-bold text-[#575D6A]">
         Let’s Complete Your E-Signature
       </p>
       <div className="flex items-start gap-3 mt-2 text-[#475569]">
         <Image
           src="/images/docImage.png"
           alt="doc icon"
           width={45}
           height={50}
         />
         <p className="max-w-xl text-sm leading-relaxed">
           This helps us verify your consent and officialy record your agreement. It's fast, Secure.
         </p>
       </div>
     </div>
   </div>
   </div>
   </>
  )
}

export default Esign