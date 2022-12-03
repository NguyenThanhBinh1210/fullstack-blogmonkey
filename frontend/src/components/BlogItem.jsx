import React from 'react'
import { Link } from 'react-router-dom'
import TestBg from '../assets/images/Card_Feature.png'

const BlogItem = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`} className='w-[361px] moblie:w-[400px] h-[272px] relative cursor-pointer'>
      <img src={TestBg} alt='' className='w-full h-full' />
      <div className='absolute text-white top-0 w-full pl-[25px] pr-[25px]'>
        <div className='flex items-center justify-between mt-[23px]'>
          <div className='bg-[#F3EDFF] rounded-[10px] text-[#6B6B6B] font-[600] leading-4 text-[14px] px-[10px] py-[4px]'>
            {blog?.tags}
          </div>
          <div className='flex items-center text-[14px] font-montserrat'>
            <span>{blog?.author}</span>
          </div>
        </div>
        <div className='leading-[28px] text-[22px] font-[600] font-montserrat mt-[15px]'>{blog?.title}</div>
      </div>
    </Link>
  )
}

export default BlogItem
