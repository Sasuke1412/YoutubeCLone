import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import WatchContext from '../Context/watchContext'

import {DarkTheme, LightTheme} from '../ThemeStyledCOmponents.js/index'

import {
  BgContainer,
  FormContainer,
  ImageDesignLogo,
  ContainerFormEnclosed,
  ErrorHighlighter,
  ButtonLogin,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: false,
    canDisplayErrorMsg: false,
    showPassword: false,
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  loginFailure = text => {
    console.log(text)
    this.setState({errorMsg: text, canDisplayErrorMsg: true})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  handleFormSubmittion = async event => {
    const {username, password} = this.state
    event.preventDefault()
    console.log('sdkjvbdskj')
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  showPasswordChange = () => {
    this.setState(prevstate => ({showPassword: !prevstate.showPassword}))
  }

  render() {
    const {
      password,
      username,
      canDisplayErrorMsg,
      errorMsg,
      showPassword,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, ToogleTheme} = value

          const changeTheme = () => {
            //  this.setState(prevstate => ({isDark: !prevstate.isDark}))
            console.log('sdv')
            ToogleTheme()
          }
          const Theme = isDark ? LightTheme : DarkTheme
          const imagURl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <Theme>
              <BgContainer>
                <ContainerFormEnclosed>
                  <FormContainer onSubmit={this.handleFormSubmittion}>
                    <ImageDesignLogo src={imagURl} alt="" />
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="username"
                      value={username}
                      name="username"
                      onChange={this.handleChange}
                    />

                    <label htmlFor="password">password</label>
                    {showPassword ? (
                      <input
                        type="text"
                        id="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <input
                        type="password"
                        id="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    )}

                    <div>
                      <input
                        type="checkBox"
                        id="checkboxInput"
                        onChange={this.showPasswordChange}
                      />
                      <label htmlFor="checkboxInput">Show Password</label>
                    </div>
                    {canDisplayErrorMsg ? (
                      <ErrorHighlighter>{errorMsg}</ErrorHighlighter>
                    ) : null}
                    <ButtonLogin type="submit" className="login-button">
                      Login
                    </ButtonLogin>
                  </FormContainer>
                </ContainerFormEnclosed>
              </BgContainer>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default Login
