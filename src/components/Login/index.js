import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {iserror: false, username: '', password: '', errorMsg: ''}

  changeInput = event => {
    const val = event.target.value
    this.setState({username: val})
  }

  changePwd = event => {
    const val = event.target.value
    this.setState({password: val})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({iserror: false})
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {
        expires: 30,
      })
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg, iserror: true})
    }
  }

  render() {
    const {iserror, username, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-container'>
        <div className='login-card'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
            alt='website logo'
            className='website-logo1'
          />
          <form className='form-container' onSubmit={this.submitForm}>
            <label htmlFor='username' className='label1'>
              USERNAME
            </label>
            <input
              type='text'
              id='username'
              className='input1'
              placeholder='UserName'
              value={username}
              onChange={this.changeInput}
            />

            <label htmlFor='password' className='label1'>
              PASSWORD
            </label>
            <input
              className='input1'
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={this.changePwd}
            />
            <button className='login-btn' type='submit'>
              Login
            </button>
            {iserror && <p className='errormsg'>*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
