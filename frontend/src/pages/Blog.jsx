import React, { useEffect, useState } from 'react'
import FeatureItem from '../components/FeatureItem'
import BaseLayout from '../layouts/BaseLayout'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchBlog } from '../redux/feature/blogSlice'
import Button from '../components/Button'
import useOnTop from '../hooks/useOnTop'

const Blog = () => {
  const { blogs, loading } = useSelector((state) => state.blog)
  const [searchInput, setSearchInput] = useState()
  const { search } = useLocation()
  useEffect(() => {
    setSearchInput(search)
  }, [search])
  const { visible, scrollToTop } = useOnTop()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hanldeReset = () => {
    navigate('/blog')
  }
  useEffect(() => {
    if (searchInput) {
      const searchQuery = searchInput.replace('?searchQuery=', '')
      dispatch(searchBlog(searchQuery))
    }
  }, [searchInput, dispatch])

  return (
    <BaseLayout>
      {loading ? (
        <div className='flex items-center mt-20 justify-center'>
          <div className='lds-ripple mx-auto'>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className='mt-10 gap-6 mobile:gap-0 grid grid-cols-4 mobile:grid-cols-2'>
            {blogs.length > 0 ? (
              blogs.map((item) => (
                <div
                  className='w-[267px] mobile:h-[280px] shadow-bold mb-2 mobile:w-full justify-center mobile:flex'
                  key={item?._id}
                >
                  <FeatureItem item={item}></FeatureItem>
                </div>
              ))
            ) : (
              <div className='mx-auto text-[20px]'>No results were found!</div>
            )}
          </div>
          {search && (
            <div className='w-full flex justify-center mt-20' onClick={hanldeReset}>
              <Button>Reset</Button>
            </div>
          )}
        </>
      )}
      <div
        onClick={scrollToTop}
        className={`${
          visible ? 'visible' : 'invisible'
        } text-white transition fixed right-10 w-16 h-10 bg-[#23BB86] bottom-10 rounded-xl cursor-pointer flex items-center justify-center `}
      >
        Top
      </div>
    </BaseLayout>
  )
}

export default Blog
