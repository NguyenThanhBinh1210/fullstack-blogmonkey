import React from 'react'

const MobileButton = ({ yes, children }) => {
  return (
    <div
      className={`text-white text-center text-sm ${
        yes ? 'bg-[#00B4AA]' : 'bg-[#bb25f1]'
      } w-[75px] px-3 py-1 rounded-md`}
    >
      {children}
    </div>
  )
}

export default MobileButton
