import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../services/requests'

const User = () => {
  console.log(getUser)
  return (
    <div>
      <p>one</p>
    </div>
  )
}

export default User
