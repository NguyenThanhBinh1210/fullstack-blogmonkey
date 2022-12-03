import React from 'react'
import useGetBlog from '../hooks/useGetBlog'
const Footer = () => {
  const { loading } = useGetBlog()
  return (
    <>
      {/* {loading && null}
      {!loading && (
        <div className=' p-6 bg-opacity-50 flex justify-between gap-20 my-6 py-10'>
          <ul className=''>
            <div className='relative mb-4 font-semibold'>
              Hệ sinh thái
              <div className='absolute w-[100%] h-[1px] bg-gray-200 mt-2'></div>
            </div>
            <li>
              <a href='https://www.facebook.com/nguyenthanhbinhdn12/'>Facebook của Bình</a>
            </li>
            <li>
              <a href='https://www.tiktok.com/@kingnoones'>Tiktok của Bình</a>
            </li>
            <li>
              <a href='https://www.youtube.com/channel/UCl0PhTur66So92ZcRRUcZ7w'>Youtobe của Bình</a>
            </li>
          </ul>
          <div className='w-[70%]'>
            <div className='relative mb-4 font-semibold'>
              Giới thiệu <div className='absolute w-[100%] h-[1px] bg-gray-200 mt-2'></div>
            </div>
            <p>
              Phát triển bởi Thanh Bình vào năm 2022, là website chia sẻ kiến thức, kinh nghiệm và trải nghiệm chất
              lượng giúp các bạn trẻ có thể phát triển kỹ năng, tư duy lập trình một cách hiệu quả.
            </p>
          </div>
        </div>
      )} */}
      <div className='h-[200px]'></div>
    </>
  )
}

export default Footer
