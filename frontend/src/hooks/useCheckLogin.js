import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useCheckLogin = () => {
  const { user, error } = useSelector((state) => ({ ...state.auth }))
  const [login, setlogin] = useState()
  const userLocal = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (!error) {
      setlogin(userLocal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return { login, user, error, setlogin }
}

export default useCheckLogin
