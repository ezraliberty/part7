import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNotification } from '../NotificationContext'
import UserContext from '../UserContext'

const NavBar = () => {
  const { user, userDispatch } = useContext(UserContext)
  const { showNotification } = useNotification()

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    showNotification('logout success')
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>blogs</Link>
        </li>
        <li>
          <Link to={'/users'}>users</Link>
        </li>
        <li>
          {user.name} Logged in <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar