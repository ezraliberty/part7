import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNotification } from '../NotificationContext'
import UserContext from '../UserContext'
import { Nav } from 'react-bootstrap'

const NavBar = () => {
  const { user } = useContext(UserContext)
  const { showNotification } = useNotification()

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
    showNotification('logout success')
  }

  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/blogs">blogs</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/users">users</Nav.Link>
      </Nav.Item>
      {user ? (
        <Nav.Item as="li">
          {user.name} Logged in <button onClick={handleLogout}>Logout</button>
        </Nav.Item>) : (<Nav.Link as={Link} to="/login">Login
      </Nav.Link>
      )}
    </Nav>
  )
}

export default NavBar