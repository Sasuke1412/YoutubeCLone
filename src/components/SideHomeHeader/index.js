import {Link} from 'react-router-dom'

import {
  AiFillHome,
  AiFillFire,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'

import {MdPlaylistAdd} from 'react-icons/md'

import {FaFacebook} from 'react-icons/fa'

import {
  IconContainer,
  ContactIconsContainer,
  HeaderConatiner,
} from './styledComponents'

import './index.css'

const SideHomeHeader = () => {
  const x = 'true'

  return (
    <HeaderConatiner>
      <div>
        <div>
          <Link to="/" className="link-remove">
            <IconContainer>
              <AiFillHome />
              <p>Home</p>
            </IconContainer>
          </Link>

          <Link to="/trending" className="link-remove">
            <IconContainer>
              <AiFillFire />
              <p>Trending</p>
            </IconContainer>
          </Link>

          <Link to="/gaming" className="link-remove">
            <IconContainer>
              <SiYoutubegaming />
              <p>Gaming</p>
            </IconContainer>
          </Link>

          <Link to="/saved-videos" className="link-remove">
            <IconContainer>
              <MdPlaylistAdd />
              <p>Saved Videos</p>
            </IconContainer>
          </Link>
        </div>
      </div>
      <div>
        <p>CONTACT US</p>
        <ContactIconsContainer>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
            alt="linked in logo"
          />
          <AiFillTwitterCircle />
          <AiFillLinkedin />
        </ContactIconsContainer>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </HeaderConatiner>
  )
}
export default SideHomeHeader
