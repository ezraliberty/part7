import { useState } from 'react'

const User = ({ username, blogsCount }) => {
  const [view, setView] = useState(false)

  //   const hideDetails = { display: view ? 'none' : '' }
  //   const showDetails = { display: view ? '' : 'none' }

  //   const toggler = () => {
  //     setView(!view)
  //   }

  //   const displayRemoveButton = blog.user.username === user


  return (
    <div>
      {/* <p>
          {blog.title} <button onClick={toggler}>hide</button>
        </p> */}
      <p>{username}</p>
      <p>
        {blogsCount}
      </p>
      {/* <p>{blog.author}</p>
        {displayRemoveButton && (
          <button onClick={remove}>remove</button>
        )} */}
    </div>
  )
}

export default User
