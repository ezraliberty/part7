import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response =  await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const newPost = async (newContent) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newContent, config)
  return response.data
}

const updateLikes = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}/likes`, {}, config)
  return response.data
}

const deleter = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, newPost, setToken, updateLikes, deleter }
