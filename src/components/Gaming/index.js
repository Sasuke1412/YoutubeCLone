import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillFire} from 'react-icons/ai'

import SideHomeHeader from '../SideHomeHeader'

import IndividualVideoGamingItems from '../IndividualVideoGamingItems'

import WatchContext from '../Context/watchContext'

import {DarkTheme, LightTheme} from '../ThemeStyledCOmponents.js/index'

import {ItemsSideBarContainer} from '../Home/styledComponents'

class Trending extends Component {
  state = {
    videosList: [],
    isLoading: false,
    noOfVideos: '',
    dataFetchFailure: false,
    isEmpty: false,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getTrendingVideos = async () => {
    this.setState({
      isLoading: true,
    })

    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      // console.log(updatedData)
      const x = updatedData.length
      if (x === 0) {
        this.setState({isEmpty: true})
      } else {
        this.setState({
          videosList: updatedData,
          isLoading: false,
          isEmpty: false,
        })
      }
    } else if (response.status === 401) {
      const {dataFetchFailure} = this.state
      this.setState({dataFetchFailure: true, isLoading: false})
    }
  }

  retryFunctionality = () => {
    this.setState({searchInput: ''}, this.getTrendingVideos)
  }

  emptyFetch = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
        alt="no videos"
      />
      <p>No Search results Found</p>
      <p>Try different keywords or remove search filters</p>
      <button type="button" onClick={this.retryFunctionality}>
        Retry
      </button>
    </div>
  )

  renderTrendingVideos = () => {
    const {videosList, dataFetchFailure, isEmpty} = this.state
    console.log(videosList)

    // DAta FetchFAilure

    return (
      <div>
        {isEmpty ? (
          this.emptyFetch()
        ) : (
          <ul className="list-design">
            {videosList.map(each => (
              <IndividualVideoGamingItems key={each.id} details={each} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
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
          return (
            <Theme>
              <>
                <div>
                  <h1>
                    <span>
                      {' '}
                      <AiFillFire />
                    </span>
                    Gaming
                  </h1>
                </div>
                <ItemsSideBarContainer>
                  <SideHomeHeader />
                  {isLoading
                    ? this.renderLoader()
                    : this.renderTrendingVideos()}
                  }
                </ItemsSideBarContainer>
              </>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default Trending
