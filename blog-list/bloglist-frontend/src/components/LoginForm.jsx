const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <h2>Login to your account</h2>
    <div>
      username
      <input value={username} onChange={handleUsernameChange} id="username"></input>
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        id="password"
      ></input>
    </div>
    <button type="submit" id="login">Log in</button>
  </form>
)

export default LoginForm
