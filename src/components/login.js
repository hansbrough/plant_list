import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/stock`)
    }

    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/app/stock`)
          }}
        >
          <label style={{display:'block', marginBottom:'1rem'}}>
            Username
            <input
              style={{padding:'.25rem', marginLeft:'.5rem'}}
              type="text"
              name="username"
              onChange={this.handleUpdate}
            />
          </label>
          <label style={{display:'block', marginBottom:'1rem'}}>
            Password
            <input
              style={{padding:'.25rem', marginLeft:'.5rem'}}
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}

export default Login
