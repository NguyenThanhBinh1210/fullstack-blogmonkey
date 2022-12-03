import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../redux/feature/blogSlice'

const useGetBlog = () => {
  const { blogs, loading } = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  return { blogs, loading }
}

export default useGetBlog
