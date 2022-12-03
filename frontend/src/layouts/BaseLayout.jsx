import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const BaseLayout = ({ children }) => {
  return (
    <div className='max-w-[1181px] m-auto '>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default BaseLayout
