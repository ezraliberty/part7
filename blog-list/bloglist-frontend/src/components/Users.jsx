import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/requests'
import { Link } from 'react-router-dom'

const Users = () => {
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  if (usersResult.isLoading) {
    return <div>Incoming Data....</div>
  }

  const users = usersResult.data

  return (
    <div>
      <h2>Users</h2>
      <h4>Blogs Created</h4>
      {users.map((user) => (
        <p key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link> {user.blogs.length}
        </p>
      ))}
    </div>
  )
}

export default Users
