import { useState } from 'react'

const Comment = ({ id, comments, addCommentMutation }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const commentObj = { comment: comment }
    addCommentMutation.mutate({ id, newComment: commentObj })
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Enter Comment"
          />
        </div>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
    </div>
  )
}

export default Comment
