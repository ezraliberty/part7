import { useContext } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserContext from './UserContext'
import Blog from './components/Blog'

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && <Blog />}
    </div>
  )
}

export default App
