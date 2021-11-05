import Popup from 'reactjs-popup'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import 'reactjs-popup/dist/index.css'

import './index.css'

const ReactPopUp = props => {
  const logoutFunctionality = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    // window.location.href = '/login'
    history.replace('/login')
  }

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            Logout
          </button>
        }
      >
        {close => (
          <>
            <p>Are you sure, you want to logout</p>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Cancel
            </button>

            <button type="button" onClick={logoutFunctionality}>
              Confirm
            </button>
          </>
        )}
      </Popup>
    </div>
  )
}
export default withRouter(ReactPopUp)
