import axios from 'axios'
import storage from './storage'

const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAll = async () => {
  const response =  await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

export const config = {
  headers: { Authorization: token },
}

const newPost = async (newContent) => {
  const response = await axios.post(baseUrl, newContent, config)
  return response.data
}

const updateLikes = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/likes`, {}, config)
  return response.data
}

const deleter = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, newPost, updateLikes, deleter }
