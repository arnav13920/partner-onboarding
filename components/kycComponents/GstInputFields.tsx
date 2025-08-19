import React, { useState } from 'react'

const GstInputFields = () => {
    const [isGstOpen, setIsGstOpen] =  useState(false)
  return (
    <div>
        <div className="flex flex-col">
            Do you have GST?
             <div className='flex p-2 gap-3 '>
            <button className= "cursor-pointer w-[140px] h-[42px] border-2 border-gray-200 rounded-full">
                Yes
            </button>
            <button className= "cursor-pointer w-[140px] h-[42px] border-2 border-gray-200 p-[2px] rounded-full">
                No
            </button>
            </div>
        </div>
    </div>
  )
}

export default GstInputFields