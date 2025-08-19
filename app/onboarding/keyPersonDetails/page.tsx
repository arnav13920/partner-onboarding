import ContactFrom from '@/components/ContactForm'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <ContactFrom/>
    </div>
  )
}

export default page