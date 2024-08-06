const KEY = 'loggedBlogUser'

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const getUser = () => {
  const user = localStorage.getItem(KEY)
  return user ? JSON.parse(user) : null
}

export default { saveUser, getUser }