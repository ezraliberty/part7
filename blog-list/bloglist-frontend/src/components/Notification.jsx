const Notification = ({ notification }) => {
  const { message, passed } = notification
  if (message === null) {
    return null
  }

  return <div className={passed ? 'success' : 'failed'}>{message}</div>
}

export default Notification
