import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DotGray from '../assets/icons/Ellipse11.png'

import Button from './Button'

import MobileButton from './MobileButton'

const FeatureItem = ({ profile, isEdit, item, blog, deleteBlog }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/create/${item._id}`)
  }
  const [blogItem, setBlogItem] = useState()
  useEffect(() => {
    setBlogItem(item)
  }, [item])

  const handleDelete = (id) => {
    if (id) {
      deleteBlog(id)
    }
  }
  return (
    <div className='flex flex-col justify-between gap-y-4 mobile:w-[160px] h-full mb-5'>
      <div
        onClick={() => navigate(`/blog/${blogItem._id}`)}
        className={`mobile:w-[160px] w-[267px] h-[360px] mobile:h-[220px] flex flex-col justify-between cursor-pointer ${
          profile ? ' mx-auto' : ''
        }`}
      >
        <div className='flex flex-col'>
          <div className='rounded-[15px] overflow-hidden w-full mobile:w-[160px] mobile:h-[129px] h-[202px]'>
            <img src={blogItem?.imageFile[0]} alt='' className='w-full h-full' />
          </div>
          <div>
            <div className='bg-[#F3EDFF] w-max mt-[15px] h-[26px] rounded-[10px] text-center text-[#6B6B6B] mobile:font-[400] font-[600] leading-4 text-[14px] mobile:text-[12px] px-[10px] py-[4px]'>
              {blogItem?.tags}
            </div>
            <div className='leading-[24px] mobile:text-[14px] text-[18px] font-[600] font-montserrat my-[15px] line-clamp'>
              {blogItem?.title}
            </div>
          </div>
        </div>
        {isEdit ? null : (
          <div className='flex items-center mobile:text-[12px] text-[14px] font-[600] text-[#6B6B6B] font-montserrat'>
            <span className='mobile:hidden'>{moment(blogItem?.createdAt).fromNow()}</span>
            <img src={DotGray} alt='' className='w-[6px] h-[6px] mx-3 my-[10px] mobile:mx-1 mobile:my-1' />
            <span> {blogItem?.author}</span>
          </div>
        )}
      </div>
      {isEdit && (
        <>
          <div className='flex gap-x-3 justify-center mobile:hidden'>
            {confirmDelete ? (
              <div onClick={() => handleDelete(blogItem._id)}>
                <Button profile detele>
                  Yes
                </Button>
              </div>
            ) : (
              <div className='' onClick={handleEdit}>
                <Button profile>Edit</Button>
              </div>
            )}
            {confirmDelete ? (
              <div onClick={() => setConfirmDelete(false)}>
                <Button profile>No</Button>
              </div>
            ) : (
              <div className='' onClick={() => setConfirmDelete(true)}>
                <Button profile detele>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className='hidden mobile:flex justify-between'>
            {confirmDelete ? (
              <div onClick={() => handleDelete(blogItem._id)}>
                <MobileButton>Yes</MobileButton>
              </div>
            ) : (
              <div onClick={handleEdit}>
                <MobileButton yes>Edit</MobileButton>
              </div>
            )}
            {confirmDelete ? (
              <div onClick={() => setConfirmDelete(false)}>
                <MobileButton yes>No</MobileButton>
              </div>
            ) : (
              <div onClick={() => setConfirmDelete(true)}>
                <MobileButton>Delete</MobileButton>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default FeatureItem
