import { useContext } from 'react'
import {
  getBlog,
  updateLikes,
  deleter,
  addComment,
} from '../services/requests'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../NotificationContext'
import UserContext from '../UserContext'
import Comment from './Comment'

const SingleBlog = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  const { user } = useContext(UserContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getBlog(id),
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (liked) => {
      queryClient.setQueryData(['blogs'], liked)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => deleter(id),
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])

      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      queryClient.setQueryData(['blogs', updatedBlogs])
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: ({ id, newComment }) => addComment(id, newComment),
    onSuccess: (newComment) => {
      const blog = queryClient.getQueryData(['blogs'])

      if (blog) {
        const updatedBlog = {
          ...blog,
          comments: blog.comments.concat(newComment),
        }

        queryClient.setQueryData(['blogs'], updatedBlog)
      }
    },
  })

  const addLikes = async (id) => {
    try {
      updateBlogMutation.mutate(id)
    } catch (error) {
      showNotification('Failed to update likes!')
    }
  }

  const remove = (id) => {
    console.log(id)
    try {
      deleteBlogMutation.mutate(id)
    } catch (error) {
      showNotification('Failed to update likes!')
    }
  }

  const blog = result.data

  const displayRemoveButton = blog?.user?.username === user?.username

  return (
    <div>
      <div>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => addLikes(blog.id)} id="like">
            like
          </button>
        </p>
        <p>Added By {blog.author}</p>
        {displayRemoveButton && <button onClick={() => remove(id)}>remove</button>}
      </div>
      {blog.comments && (
        <Comment
          id={id}
          addCommentMutation={addCommentMutation}
          comments={blog.comments}
        />
      )}
    </div>
  )
}

export default SingleBlog
