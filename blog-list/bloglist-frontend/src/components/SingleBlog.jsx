import { useEffect, useState } from 'react'
import { getBlog } from '../services/requests'
import { params } from 'react-router-dom'

const SingleBlog = () => {
  const { id } = params()
  const [blog, setBlog] = useState([])

  useEffect(() => {
    const blog = async () => {
      const getB = await getBlog(id)
      setBlog(getB)
    }

    blog()
  },[])

  return (
    <div>
      <p>
        {blog.title}
      </p>
      <p>{blog.url}</p>
      <p>
        {blog.likes}{' '}
        <button onClick={() => addLikes(blog.id)} id="like">
          like
        </button>
      </p>
      <p>{blog.author}</p>
    </div>
  )
}

export default SingleBlog
