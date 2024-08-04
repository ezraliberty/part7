import { useState } from 'react'

const Blog = ({ blog, remove, addLikes, user }) => {
  const [view, setView] = useState(false)

  const hideDetails = { display: view ? 'none' : '' }
  const showDetails = { display: view ? '' : 'none' }

  const toggler = () => {
    setView(!view)
  }

  const displayRemoveButton = blog.user.username === user


  return (
    <div>
      <div style={hideDetails} className='first'>
        {blog.title} {blog.author} <button onClick={toggler} id='view'>view</button>
      </div>
      <div style={showDetails} className='second'>
        <p>
          {blog.title} <button onClick={toggler}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={() => addLikes(blog.id)} id="like">like</button>
        </p>
        <p>{blog.author}</p>
        {displayRemoveButton && (
          <button onClick={remove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
