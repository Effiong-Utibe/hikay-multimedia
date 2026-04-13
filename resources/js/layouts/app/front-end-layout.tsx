import Footer from '@/components/frontend/footer'
import Navbar from '@/components/frontend/navbar'
import React from 'react'

export default function FrontEndLayout({children}:{children:React.ReactNode}) {
  return (
<>
<Navbar/>
{children}
<Footer/>
</>
  )
}
