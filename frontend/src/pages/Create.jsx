import React, { useEffect, useState } from 'react'
import Gallery from '../assets/icons/gallery.png'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, editBlog, getBlog } from '../redux/feature/blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState = {
  title: '',
  description: '',
  tags: '',
  main: ''
}
const Create = () => {
  const { id } = useParams()
  const { blog } = useSelector((state) => ({ ...state.blog }))
  const [formData, setFormData] = useState(initialState)
  const [selectImages, setSelectImages] = useState([])
  const [errorFile, setErrorFile] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setSelectImages(blog.imageFile)
      setFormData(blog)
    }
    if (!id) {
      setFormData(initialState)
    }
  }, [id, blog])

  useEffect(() => {
    if (selectImages?.length > 0) setErrorFile(false)
  }, [selectImages])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const { register, handleSubmit } = useForm({})

  const onSubmit = () => {
    const { title, description, tags, main } = formData
    if (selectImages.length === 0) setErrorFile(true)
    if (title === '' || description === '' || tags === '' || main === '') setError(true)
    if (selectImages.length >= 1 && title !== '' && description !== '' && tags !== '' && main !== '') {
      setErrorFile(false)
      setError(false)
      const newData = {
        userId: JSON.parse(localStorage.getItem('profile'))?.user?._id,
        ...formData,
        imageFile: [...selectImages]
      }
      const updatedBlogData = { ...newData }
      if (!id) {
        dispatch(createBlog({ newData, navigate, toast }))
      }
      if (id) {
        dispatch(editBlog({ updatedBlogData, id, navigate, toast }))
      }
    }
  }
  useEffect(() => {
    if (id) {
      dispatch(getBlog(id))
    }
  }, [id, dispatch])

  return (
    <div className='max-w-[1000px] mx-auto pt-10 mobile:w-[90%] pb-10'>
      <div className='mb-10' onClick={() => navigate(-1)}>
        <Button>Back</Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className='flex justify-between mobile:flex-col'>
          <div className='left w-[400px] mobile:w-full'>
            <div className='flex flex-col mb-8'>
              <label className='font-semibold text-[20px] mb-[15px] text-[#84878B]'>Title</label>
              <div className='border rounded-lg pl-3 mb-3 h-[48px] flex items-center'>
                <input
                  name='title'
                  value={formData.title || ''}
                  {...register('title')}
                  placeholder='Title'
                  onChange={handleInputChange}
                  className='placeholder:text-[16px] w-full bg-white text-[16px]'
                />
              </div>
              {!formData.title && error && <p className='text-[#fa3b3b]'>Chưa nhâp tiêu đề!</p>}
            </div>
            <div className='flex flex-col mb-8'>
              <label className='font-semibold text-[20px] mb-[15px] text-[#84878B]'>Short description</label>
              <div className='border rounded-lg p-3 mb-3 h-[200px] flex items-center overflow-hidden'>
                <textarea
                  // id='description'
                  name='description'
                  cols='50'
                  value={formData.description || ''}
                  {...register('description')}
                  onChange={handleInputChange}
                  placeholder='Short description'
                  className='placeholder:text-[16px] w-full bg-white text-[16px] h-full resize-none'
                />
              </div>
              {!formData.description && error && <p className='text-[#fa3b3b]'>Chưa nhâp mô tả!</p>}
            </div>
          </div>
          <div className='right w-[400px] mobile:w-full'>
            <div className='flex flex-col mb-8'>
              <label className='font-semibold text-[20px] mb-[15px] text-[#84878B]'>Slug</label>
              <div className='border rounded-lg pl-3 mb-3 h-[48px] flex items-center'>
                <input
                  name='tags'
                  value={formData.tags || ''}
                  {...register('tags')}
                  onChange={handleInputChange}
                  placeholder='Slug'
                  className='placeholder:text-[16px] w-full bg-white text-[16px]'
                />
              </div>
              {!formData.tags && error && <p className='text-[#fa3b3b]'>Chưa nhập danh mục!</p>}
            </div>

            <div>
              <label className='font-semibold text-[20px]  text-[#84878B]'>Images</label>
              <section className='mt-[15px] relative mb-3'>
                <label className=' m-0 flex cursor-pointer flex-col base-file justify-center items-center border rounded-lg w-[400px] mobile:w-full mobile:mb-[15px] h-[200px] text-lg '>
                  <img src={Gallery} alt='' className='w-[60.41px] h-[62.43px]' />
                  <FileBase
                    type='file'
                    name='picture'
                    onDone={(base64) => {
                      const listBase = base64.map((item, index) => {
                        return item.base64
                      })
                      setSelectImages(listBase)
                    }}
                    multiple={true}
                    accept='image/png, image/jpg, image/webp'
                  />
                  <div className='absolute bottom-4'>Đã thêm {selectImages ? selectImages?.length : '0'} ảnh</div>
                </label>
              </section>
              {errorFile && <p className='text-[#fa3b3b]'>Chưa thêm ảnh!</p>}
            </div>
          </div>
        </div>
        <div className='flex flex-col mb-8'>
          <label className='font-semibold text-[20px] mb-[15px] text-[#84878B]'>Content</label>
          <div className='border rounded-lg p-3 mb-3 h-[200px] flex items-center overflow-hidden'>
            <textarea
              id='main'
              name='main'
              value={formData.main || ''}
              cols='50'
              {...register('main')}
              placeholder='Enter your content...'
              onChange={handleInputChange}
              className='placeholder:text-[16px] w-full bg-white text-[16px] h-full resize-none'
            />
          </div>
          {!formData.main && error && <p className='text-[#fa3b3b]'>Chưa nhập nội dung!</p>}
        </div>
        <div className='w-full flex flex-col justify-center items-center' type='submit'>
          <Button linearGradient={true} login={true}>
            {id ? 'Confirm edit' : 'Add new post'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Create
