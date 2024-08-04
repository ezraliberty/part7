import axios from 'axios'
const baseUrl = '/api/signin'

const signin = async Credentials => {
  const response = await axios.post(baseUrl, Credentials)
  return response.data
}

export default { signin }