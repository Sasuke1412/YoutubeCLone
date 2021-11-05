import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {RiSunLine} from 'react-icons/ri'

import {FaMoon} from 'react-icons/fa'

import ReactPopup from '../ReactPopup'

import WatchContext from '../Context/watchContext'

import {DarkTheme, LightTheme} from '../ThemeStyledCOmponents.js/index'

import './index.css'

import {
  NavBar,
  SecondHalfRowContainer,
  ProfileImageDesign,
  ThemeButtonDesign,
  LogoutButtonDesign,
  WebsiteLogoDesign,
} from './styledComponents'

class Header extends Component {
  render() {
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
          const websiteLogo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          return (
            <>
              <Theme>
                <NavBar>
                  <li>
                    <Link to="/">
                      <WebsiteLogoDesign src={websiteLogo} alt="website logo" />
                    </Link>
                  </li>
                  <SecondHalfRowContainer>
                    {isDark ? (
                      <ThemeButtonDesign
                        type="button"
                        onClick={changeTheme}
                        data-testid="theme"
                      >
                        <FaMoon className="icon-design" />{' '}
                      </ThemeButtonDesign>
                    ) : (
                      <ThemeButtonDesign
                        type="button"
                        onClick={changeTheme}
                        data-testid="theme"
                      >
                        <RiSunLine className="icon-design white-design" />
                      </ThemeButtonDesign>
                    )}

                    <ProfileImageDesign
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                    />
                    <ReactPopup />
                  </SecondHalfRowContainer>
                </NavBar>
              </Theme>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default withRouter(Header)
