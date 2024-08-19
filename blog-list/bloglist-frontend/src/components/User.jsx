import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/requests'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()

  const userResult = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })

  if (userResult.isLoading) {
    return <div>Incoming Data....</div>
  }

  const user = userResult.data

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  )
}

export default User
