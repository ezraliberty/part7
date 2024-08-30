import { useState, useContext } from 'react'
import storage from '../services/storage'
import { useNotification } from '../NotificationContext'
import { signin } from '../services/requests'
import UserContext from '../UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, userDispatch } = useContext(UserContext)
  const { showNotification } = useNotification()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await signin({ username, password })
      userDispatch({ type: 'USER', payload: user })
      storage.saveUser(user)
      setUsername('')
      setPassword('')
      showNotification('Login Success', true)
    } catch (exception) {
      showNotification(`${exception.response.data.error}`, false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login to your account</h2>
      <div>
        username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        ></input>
      </div>
      <button type="submit" id="login">
        Log in
      </button>
    </form>
  )
}

export default LoginForm
