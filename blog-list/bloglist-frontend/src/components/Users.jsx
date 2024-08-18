import { Link } from 'react-router-dom'

const Users = ({ username, blogsCount }) => {
  return (
    <div>
      <p><Link to={'/:id'}>{username}</Link> {blogsCount}</p>
    </div>
  )
}

export default Users
