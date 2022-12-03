import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/BaseLayout'
import Illustration from '../assets/images/Illustration.png'
import Button from '../components/Button'
import BlogItem from '../components/BlogItem'
import DotGray from '../assets/icons/Ellipse11.png'
import FeatureItem from '../components/FeatureItem'
import { Link, useNavigate } from 'react-router-dom'
import useGetBlog from '../hooks/useGetBlog'

import { toast } from 'react-toastify'
import moment from 'moment'
import useOnTop from '../hooks/useOnTop'

const Home = () => {
  const checkLogin = JSON.parse(localStorage.getItem('profile'))?.user?.name

  const { blogs, loading } = useGetBlog()

  const [sort, setSort] = useState()
  const { scrollToTop } = useOnTop()
  useEffect(() => {
    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const newArray = blogs?.slice().reverse()
    setSort(newArray)
  }, [blogs])

  const navigate = useNavigate()

  const handleCreate = () => {
    if (checkLogin) {
      navigate(`/create`)
    } else {
      toast.warn('Phải đăng nhập trước!', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return (
    <BaseLayout>
      {loading && (
        <div className='flex items-center mt-20 justify-center'>
          <div className='lds-ripple mx-auto'>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!loading && (
        <>
          <section
            style={{ background: 'linear-gradient(155deg, #00B4AA 6.67%, #A4D96C 84.1%)' }}
            className='banner w-full h-[519px] flex items-center justify-between p-[46.88px] mobile:text-center mb-[60px]'
          >
            <div className='max-w-[445px]'>
              <h1 className='text-[48px] font-[700] text-white font-montserrat mb-[28px]'>Monkey Blogging</h1>
              <p className='font-md text-[14px] text-white max-w-[421px] leading-7 font-montserrat not-italic mb-[48px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inc = = unt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
              </p>

              <div onClick={handleCreate}>
                <Button banner={true}>Get Started </Button>
              </div>
            </div>
            <div className='mobile:hidden'>
              <img src={Illustration} alt='' className='w-[508.12px] h-[414.71px]' />
            </div>
          </section>
          <section className='feature  mobile:hidden mobile:flex-col mobile:items-center'>
            <div className='relative mb-[35px] mobile:mb-[10px]'>
              <div className='absolute w-[36px] h-[3px] bg-[#07eefa] top-[-5px]'></div>
              <h1 className='text-[#3A1097] font-[600] leading-9 text-[28px] font-montserrat mobile:text-[22px]  '>
                Feature
              </h1>
            </div>
            <div className='flex gap-x-[49px]'>
              {blogs && blogs.slice(0, 3).map((item) => <BlogItem key={item._id} blog={item}></BlogItem>)}
            </div>
          </section>
          <section className='mt-[83px] mobile:w-[full] mobile:flex mobile:flex-col mobile:items-center'>
            <div className='relative mb-[35px] mobile:mb-[10px]'>
              <div className='absolute w-[36px] h-[3px] bg-[#07eefa] top-[-5px]'></div>
              <h1 className='text-[#3A1097] mobile:text-[22px]  font-[600] leading-9 text-[28px] font-montserrat '>
                Newest update
              </h1>
            </div>
            <div className='flex items-start mobile:px-3 mobile:w-full justify-between mobile:flex-col'>
              {blogs &&
                blogs.slice(0, 1).map((item) => (
                  <Link
                    key={item._id}
                    to={`/blog/${item._id}`}
                    className='w-[550px] mobile:mb-[15px] mobile:w-full cursor-pointer'
                  >
                    <img src={item?.imageFile[0]} alt='' className='rounded-[15px] w-full h-[433px] mobile:h-[240px]' />
                    <div>
                      <div className='bg-[#F3EDFF] w-max h-[26px] mobile:text-[13px] mt-[20px] rounded-[10px] text-[#6B6B6B] font-[600] leading-4 text-[14px] px-[10px] py-[4px]'>
                        {item?.tags}
                      </div>
                      <div className='leading-[28px] text-[22px] font-[600] mobile:text-[18px]  font-montserrat mt-[15px] line-clamp'>
                        {item?.title}
                      </div>
                      <div className='flex items-center text-[14px] font-[600] text-[#6B6B6B] font-montserrat'>
                        <span>{moment(item?.createdAt).fromNow()}</span>
                        <img src={DotGray} alt='' className='w-[6px] h-[6px] mx-3 my-[10px]' />
                        <span>{item?.author}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              <div className='w-[550px] mobile:w-full mobile:h-[240px] mobile:overflow-auto h-[570px] bg-[#F3EDFF] rounded-[15px] px-[19px] py-[30px] flex flex-col justify-between'>
                {sort &&
                  sort.slice(0, 3).map((item) => (
                    <Link key={item._id} to={`/blog/${item._id}`}>
                      <div className='flex cursor-pointer w-full gap-x-4 rounded-lg mobile:justify-center justify-between mobile:flex-col mobile:mb-6'>
                        <div className='mobile:w-[200px] w-[181px] mobile:mx-auto mobile:h-[120px] mobile:mb-4'>
                          <img
                            src={item?.imageFile[0]}
                            alt=''
                            className=' w-full  mobile:w-full mobile:h-full mobile:mx-auto mobile:block  rounded-lg h-[130px] mr-[20px]'
                          />
                        </div>

                        <div className=' w-[370px] mobile:w-full flex-col flex mobile:items-center justify-center'>
                          <div className=' mobile:text-[12px] mobile:mx-auto max-w-[150px] line-clamp-1 bg-[#FFFFFF] w-max h-[26px] rounded-[10px] text-[#6B6B6B] font-[600] leading-4 text-[14px] px-[10px] py-[4px]'>
                            {item?.tags}
                          </div>
                          <div className='leading-[24px] mobile:text-[14px] text-[18px] font-[600] font-montserrat mt-[10px] line-clamp'>
                            {item?.title}
                          </div>
                          <div className='flex items-center text-[14px] mobile:text-[12px] font-[600] text-[#6B6B6B] font-montserrat'>
                            <span>{moment(item?.createdAt).fromNow()}</span>
                            <img src={DotGray} alt='' className='w-[6px] h-[6px] mx-3 my-[10px]' />
                            <span>{item?.author}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
          <section className='mobile:grid mobile:px-2 mobile:mt-[20px] mobile:grid-cols-2 mobile:gap-x-[0px] flex justify-between mt-[57px]'>
            {blogs &&
              blogs.slice(0, 4).map((item) => (
                <div
                  className='w-[267px] mobile:mb-12 mb-2 mobile:w-[200px] mobile:flex mobile:justify-center '
                  key={item?._id}
                >
                  <FeatureItem item={item}></FeatureItem>
                </div>
              ))}
          </section>
        </>
      )}
    </BaseLayout>
  )
}

export default Home
