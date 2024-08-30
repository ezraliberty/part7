import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/requests'
import { useParams } from 'react-router-dom'
import UserContext from '../UserContext'


const User = () => {
  const { user } = useContext(UserContext)
  if (!user) {
    return null
  }

  
  const { id } = useParams()

  const userResult = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })

  if (userResult.isLoading) {
    return <div>Incoming Data....</div>
  }

  

  const userData = userResult.data

  return (
    <div>
      <h2>{userData.name}</h2>
      <h3>Added blogs</h3>
      <ul>{userData.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  )
}

export default User
