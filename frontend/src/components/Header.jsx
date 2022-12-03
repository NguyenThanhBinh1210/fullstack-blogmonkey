import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import Search from '../assets/icons/search.png'
import Logo from '../assets/images/logo.png'
import { setLogout } from '../redux/feature/authSlice'
import { useDispatch } from 'react-redux'
import User from '../assets/images/man.png'
import { searchBlog } from '../redux/feature/blogSlice'
import { toast } from 'react-toastify'
import useDebounce from '../hooks/useDebounce'

const Header = () => {
  const { pathname } = useLocation()
  const [searchR, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const getLocal = JSON.parse(localStorage.getItem('profile'))
  const isAdmin = getLocal?.user?.admin
  const checkLogin = getLocal?.user?.name
  const filterDebounce = useDebounce(searchR, 500)
  const handleSearch = (e) => {
    e.preventDefault()
    setSearch('')
    navigate(`/blog?searchQuery=${searchR}`)
  }
  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/')
    toast.info('Đăng xuất thành công!')
  }

  useEffect(() => {
    if (pathname === '/blog' && !search) {
      dispatch(searchBlog(filterDebounce))
    }
  }, [filterDebounce, dispatch, pathname, search])
  // if (!checkLogin) return null
  return (
    <div className='flex p-6 mobile:py-1 mobile:px-4 justify-between '>
      <div className='flex items-center mobile:gap-x-3 gap-x-8 mobile:mr-4'>
        <div className='logo w-[43px] mobile:w-33px mobile:h-55px h-[56px]'>
          <Link to={'/'} className='w-full'>
            <div className='w-full'>
              <img src={Logo} alt='' className='w-full h-full' />
            </div>
          </Link>
        </div>
        <ul className='nav flex gap-7 mobile:gap-3 text-black text-lg font-semibold'>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/blog'}>Blog</Link>
          </li>
          <li>
            <Link to={'/contact'}>Contact</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center'>
        <form
          onSubmit={searchR ? handleSearch : null}
          className='rounded-lg mobile:hidden overflow-hidden flex justify-between pl-4 pr-4 bg-white items-center mr-4 w-[320px] h-[60px] border'
        >
          <input
            value={searchR}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='Search posts..'
            className='outline-none placeholder:text-md'
          />
          <button type='submit'>
            <img src={Search} alt='' className='w-[16px] h-[14.52px] cursor-pointer' />
          </button>
        </form>
        {checkLogin && (
          <>
            <h1 className='hover-info relative mobile:hidden'>
              Hi, I'm <strong className='cursor-pointer'>{checkLogin}</strong>
              <div className='info-grid  w-[200px] grid grid-row-3 p-3'>
                {isAdmin ? (
                  <Link to={`/admin`} className='m-auto border-b cursor-pointer'>
                    Dashboard
                  </Link>
                ) : (
                  <Link to={`/user/${getLocal?.user._id}`} className='m-auto border-b cursor-pointer'>
                    My account
                  </Link>
                )}
                <div className='m-auto border-b cursor-pointer text-[#2EBAC1] font-semibold' onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            </h1>
            <div className='w-10 h-10 hover-info hidden mobile:block'>
              <img src={User} alt='' />
              <div className='mobile:mt-3 mobile:w-full info-grid grid grid-row-3 p-3'>
                <div className='text-center'>
                  <strong className='cursor-pointer'>{checkLogin}</strong>
                </div>
                {isAdmin ? (
                  <Link to={`/admin`} className='m-auto border-b cursor-pointer'>
                    Dashboard
                  </Link>
                ) : (
                  <Link to={`/user/${getLocal?.user._id}`} className='m-auto  border-b cursor-pointer'>
                    My account
                  </Link>
                )}

                {/* <div className='m-auto border-b cursor-pointer'>Dashboard</div> */}
                <div className='m-auto border-b cursor-pointer text-[#2EBAC1] font-semibold' onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            </div>
          </>
        )}
        {!checkLogin && (
          <>
            <div className='mobile:hidden h-full'>
              <Button>
                <Link to={'/login'} className='flex w-full h-full items-center justify-center'>
                  Sign Up
                </Link>
              </Button>
            </div>
            <div className='hidden mobile:block'>
              <Link to={'/login'} className='flex w-full font-[600] h-full items-center justify-center'>
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
