import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NewBlog from './NewBlog'
import Toggle from './Toggle'
import { getBlogs, newBlogPost } from '../services/requests'
import UserContext from '../UserContext'
import { ListGroup } from 'react-bootstrap'

const Blog = () => {
  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const { user } = useContext(UserContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  const newBlogMutation = useMutation({
    mutationFn: newBlogPost,
    onSuccess: (createBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(createBlog))
    },
  })

  if (result.isLoading) {
    return <div>Incoming Data....</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>blog app</h2>
      <Toggle buttonLabel="New Post" ref={blogFormRef}>
        <NewBlog newBlogMutation={newBlogMutation} />
      </Toggle>
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
