import axios from 'axios'
const baseUrl = '/api/users'
import storage from './storage'

const userData = () => {
  const user = storage.getUser()
  if (!user || !user.token) {
    throw new Error('User data or token is missing')
  }
  return {
    headers: { Authorization: `Bearer ${user.token}` },
  }
}

let config
try {
  config = userData()
} catch (error) {
  console.error(error.message)
}

export const getUsers = () => axios.get(baseUrl).then(res => res.data)

export const getUser = (id) => axios.get(`${baseUrl}/${id}`).then(res => res.data)

export const signin = credentials => axios.post('/api/signin', credentials).then(res => res.data)

export const getBlogs = () => axios.get('/api/blogs').then(res => res.data)

export const getBlog = (id) => axios.get(`/api/blogs/${id}`, config).then(res => res.data)

export const newBlogPost = (newContent) => axios.post('/api/blogs', newContent, config).then(res => res.data)

export const updateLikes = (id) => axios.put(`/api/blogs/${id}/likes`, {}, config).then(res => res.data)

export const addComment = (id, newComment) => axios.post(`/api/blogs/${id}/comments`, newComment, config).then(res => res.data)

export const deleter = (id) => axios.delete(`/api/blogs/${id}`, config).then(res => res)