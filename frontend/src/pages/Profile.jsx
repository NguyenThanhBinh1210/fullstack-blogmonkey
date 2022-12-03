import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import FeatureItem from '../components/FeatureItem'
import useOnTop from '../hooks/useOnTop'
import BaseLayout from '../layouts/BaseLayout'

const Profile = () => {
  const { scrollToTop } = useOnTop()
  const [adminBlog, setAdminBlog] = useState([])
  const [userIdBlog, setUserIdBlog] = useState([])
  const getLocal = JSON.parse(localStorage.getItem('profile'))
  const user = getLocal?.user
  const isAdmin = getLocal.user.admin
  useEffect(() => {
    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { id } = useParams()
  const token = getLocal?.token

  const getUserBlogs = async () => {
    const response = await fetch(`http://localhost:5000/blogs/userblog/${id}`, {
      method: 'GET',
      headers: { token: `Bearer ${token}` }
    })
    const data = await response.json()
    setUserIdBlog(data)
  }
  const getAdminBlogs = async () => {
    const response = await fetch(`http://localhost:5000/blogs/`, {
      method: 'GET',
      headers: { token: `Bearer ${token}` }
    })
    const data = await response.json()
    setAdminBlog(data)
  }
  const deleteBlog = async (idBlog) => {
    const response = await fetch(`http://localhost:5000/blogs/delete/${idBlog}`, {
      method: 'DELETE',
      headers: { token: `Bearer ${token}` }
    })
    await response.json()
    const newData = userIdBlog.filter((item) => item._id !== idBlog)
    const newDataAdmin = adminBlog.filter((item) => item._id !== idBlog)
    toast.info('Xoá thành công!')
    setUserIdBlog(newData)
    setAdminBlog(newDataAdmin)
  }
  useEffect(() => {
    getUserBlogs()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getAdminBlogs()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseLayout>
      <div className='flex justify-between mobile:block mt-5 mobile:px-4'>
        <div className=' w-[20%] mobile:w-full mobile:h-max mobile:mb-10  h-[200px] '>
          <div className='flex items-center'>
            <strong className='mr-2'>Name:</strong> {user?.name}
          </div>
          <div className=''>
            <strong>Email:</strong> {user?.email}{' '}
          </div>
          <div>
            {userIdBlog?.length > 0 && (
              <div className='mt-5'>
                <Link to='/create'>
                  <Button>Create</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className=' w-[70%] mobile:w-full grid grid-cols-2'>
            {adminBlog.length > 0 ? (
              adminBlog?.map((item) => (
                <div
                  className='mb-10 mobile:mb-0 flex flex-col justify-between mobile:flex-row h-[377px] mobile:h-max mobile:flex mobile:justify-center'
                  key={item?._id}
                >
                  <FeatureItem profile isEdit item={item} deleteBlog={deleteBlog}></FeatureItem>
                </div>
              ))
            ) : (
              <div className='flex items-center mt-20 justify-center'>
                <div className='lds-ripple mx-auto'>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        )}
        {!isAdmin && (
          <div className=' w-[70%] mobile:w-full grid grid-cols-2'>
            {userIdBlog && userIdBlog.length === 0 && (
              <div>
                You have not created any posts yet!{' '}
                <span className='text-[#00B4AA]'>
                  <Link to='/create'>Create now?</Link>
                </span>{' '}
              </div>
            )}
            {!userIdBlog ? (
              <div className='flex items-center mt-20 justify-center'>
                <div className='lds-ripple mx-auto'>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <>
                {userIdBlog?.map((item) => (
                  <div
                    className='mb-10 mobile:mb-0 flex flex-col justify-between mobile:flex-row h-[377px] mobile:h-max mobile:flex mobile:justify-center'
                    key={item?._id}
                  >
                    <FeatureItem profile isEdit item={item} deleteBlog={deleteBlog}></FeatureItem>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </BaseLayout>
  )
}

export default Profile
