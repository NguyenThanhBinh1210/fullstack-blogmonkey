import axios from 'axios'
const user = JSON.parse(localStorage.getItem('profile'))
const token = user?.token

const API = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: false,
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    token: `Bearer ${token}`
  }
})
export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const getUser = (id) => API.get(`/users/${id}`)
export const editUser = (editUser, id) => API.put(`/users/edit/${id}`, editUser)

export const createBlog = (blogData) => API.post('/blogs/post', blogData)
export const getBlogs = () => API.get('/blogs')
export const getBlog = (id) => API.get(`/blogs/${id}`)
export const getBlogByTag = (tag) => API.get(`/blogs/tag/${tag}`)
export const getBlogByUserId = (id) => API.get(`/blogs/userblog/${id}`)
export const deleteBlog = (id) => API.delete(`/blogs/delete/${id}`)
export const editBlog = (editBlogData, id) => API.put(`/blogs/put/${id}`, editBlogData)
export const getBlogBySearch = (searchQuery) => API.get(`/blogs/search?searchQuery=${searchQuery}`)
