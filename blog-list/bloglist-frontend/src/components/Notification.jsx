import { useNotification } from '../context/notifyReducer'

const Notification = () => {
  const { state } = useNotification()

  // const { message, passed } = notification
  if (state.message === null) {
    return null
  }

  return <div className={state.passed ? 'success' : 'failed'}>{state.message}</div>
}

export default Notification
