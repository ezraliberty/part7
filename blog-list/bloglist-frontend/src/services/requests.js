import axios from 'axios'
const baseUrl = '/api/users'
import storage from './storage'

const userData = () => ({
  headers: { Authorization: `Bearer ${storage.getUser().token}` },
})

const config = userData()

export const getUsers = () => axios.get(baseUrl).then(res => res.data)

export const signin = credentials => axios.post('/api/signin', credentials).then(res => res.data)

export const getBlogs = () => axios.get('/api/blogs').then(res => res.data)

export const newBlogPost = (newContent) => axios.post(baseUrl, newContent, config).then(res => res.data)

export const updateLikes = (id) => axios.put(`${baseUrl}/${id}/likes`, {}, config).then(res => res.data)

export const deleter = (id) => axios.delete(`${baseUrl}/${id}`, config).then(res => res)