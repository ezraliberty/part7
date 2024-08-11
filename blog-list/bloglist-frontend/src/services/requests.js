import axios from 'axios'
const baseUrl = '/api/blogs'
import storage from './storage'

const config = () => ({
  headers: { Authorization: `Bearer ${storage.getUser().token}` },
})

export const signin = credentials => axios.post(baseUrl, credentials).then(res => res.data)

export const getBlogs = () => axios.get(baseUrl).then(res => res.data)

export const newBlogPost = (newContent) => axios.post(baseUrl, newContent, config).then(res => res.data)

export const updateLikes = (id) => axios.put(`${baseUrl}/${id}/likes`, {}, config).then(res => res.data)

export const deleter = (id) => axios.delete(`${baseUrl}/${id}`, config).then(res => res)