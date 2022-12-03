import React, { useEffect, useState } from 'react'
import LoginLayout from '../layouts/LoginLayout'
import Son from '../assets/images/son.jpg'
import Binh from '../assets/images/binh.jpg'
import Tuy from '../assets/images/tuy.png'
import Huy from '../assets/images/huy.jpg'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 400)
    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  const navigate = useNavigate()
  return (
    <LoginLayout>
      {loading ? (
        <div className='flex items-center mt-20 justify-center'>
          <div className='lds-ripple mx-auto'>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className='w-full mobile:w-[95%] mobile:mx-auto border p-5 rounded-lg '>
            <div onClick={() => navigate(-1)}>
              <div className='mobile:hidden'>
                <Button>Back</Button>
              </div>
              <div className='hidden mobile:block'>
                <button className='bg-[#00B4AA] rounded-lg text-white px-5 py-1'>Back</button>
              </div>
            </div>

            <h2 className='font-semibold text-[40px] text-[#2EBAC1] mb-5 block text-center'>Nhóm Bốn</h2>
            <div className='gap-y-5 flex flex-col'>
              <div className='card flex mobile:w-full justify-evenly items-center'>
                <div className='avatar w-[100px] h-[100px] mobile:w-[80px] mobile:h-[80px] rounded-full overflow-hidden'>
                  <img src={Binh} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='info max-w-[500px] mobile:w-[200px]'>
                  Web developer hàng đầu Việt Nam, hợp tác với nhiều công ty có tiếng trên toàn thế giới!
                </div>
              </div>

              <div className='card flex justify-evenly items-center'>
                <div className='avatar w-[100px] h-[100px] mobile:w-[80px] mobile:h-[80px] rounded-full overflow-hidden'>
                  <img src={Son} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='info max-w-[500px] mobile:w-[200px]'>
                  Web developer hàng đầu Việt Nam, hợp tác với nhiều công ty có tiếng trên toàn thế giới!
                </div>
              </div>
              <div className='card flex justify-evenly items-center'>
                <div className='avatar w-[100px] h-[100px] mobile:w-[80px] mobile:h-[80px] rounded-full overflow-hidden'>
                  <img src={Tuy} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='info max-w-[500px] mobile:w-[200px]'>
                  Tester hàng đầu Việt Nam, hợp tác với nhiều công ty có tiếng trên toàn thế giới!
                </div>
              </div>
              <div className='card flex justify-evenly items-center'>
                <div className='avatar w-[100px] h-[100px] mobile:w-[80px] mobile:h-[80px] rounded-full overflow-hidden'>
                  <img src={Huy} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='info max-w-[500px] mobile:w-[200px]'>
                  Tester hàng đầu Việt Nam, hợp tác với nhiều công ty có tiếng trên toàn thế giới!
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </LoginLayout>
  )
}

export default Contact
