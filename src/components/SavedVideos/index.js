import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillFire} from 'react-icons/ai'

import SideHomeHeader from '../SideHomeHeader'

import WatchContext from '../Context/watchContext'

import SavedVideoIndividualItems from '../SavedVideoIndividualItems'

import {ItemsSideBarContainer} from '../Home/styledComponents'

import {DarkTheme, LightTheme} from '../ThemeStyledCOmponents.js/index'

import './index.css'

class SavedVideos extends Component {
  state = {
    isLoading: false,
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, ToogleTheme, watchList} = value

          const changeTheme = () => {
            //  this.setState(prevstate => ({isDark: !prevstate.isDark}))

            ToogleTheme()
          }
          const isEmpty = watchList.length
          console.log(isEmpty)
          console.log(watchList)
          const Theme = isDark ? LightTheme : DarkTheme
          return (
            <Theme>
              <>
                <ItemsSideBarContainer>
                  <SideHomeHeader />
                  {isLoading ? (
                    this.renderLoader()
                  ) : (
                    <>
                      {isEmpty === 0 ? (
                        <div className="empty-item-display">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                            alt="no saved videos"
                            className="no-videos-width"
                          />

                          <h1>No saved videos found</h1>
                          <p>Save your videos by clicking a button</p>
                        </div>
                      ) : (
                        <div>
                          <div>
                            <>
                              <span>
                                <AiFillFire />
                              </span>
                              <h1>Saved Videos</h1>
                            </>
                          </div>
                          <ul>
                            {watchList.map(each => (
                              <SavedVideoIndividualItems
                                key={each.id}
                                details={each}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </ItemsSideBarContainer>
              </>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default SavedVideos
