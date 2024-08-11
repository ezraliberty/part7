import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { state } = useNotification()

  if (state.message === null) {
    return null
  }

  return <div className={state.passed ? 'success' : 'failed'}>{state.message}</div>
}

export default Notification
