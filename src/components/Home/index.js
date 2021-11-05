import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import {AiOutlineClose} from 'react-icons/ai'

import IndividualVideoItems from '../IndividualVideoItems'

import {ItemsSideBarContainer, Banner} from './styledComponents'

import SideHomeHeader from '../SideHomeHeader'

import WatchContext from '../Context/watchContext'

import {DarkTheme, LightTheme} from '../ThemeStyledCOmponents.js/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    isLoading: false,
    noOfVideos: '',
    dataFetchFailure: false,
    searchInput: '',
    isEmpty: false,
    showBanner: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getYoutubeVideos()
  }

  getYoutubeVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      // console.log(updatedData)
      const x = updatedData.length
      console.log(x)
      if (x !== 0) {
        this.setState({
          videosList: updatedData,
          apiStatus: apiStatusConstants.success,
          isEmpty: false,
        })
      } else {
        this.setState(
          {isEmpty: true, apiStatus: apiStatusConstants.success},
          this.emptyFetch,
        )
      }
    } else if (response.status === 401) {
      const {apiStatus} = this.state
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryFunctionality = () => {
    this.setState({searchInput: ''}, this.getYoutubeVideos)
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

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllVideos = isDark => {
    const {videosList, dataFetchFailure, isEmpty} = this.state
    //  console.log(videosList)
    return (
      <div>
        {isEmpty ? (
          this.emptyFetch()
        ) : (
          <ul className="list-design">
            {videosList.map(each => (
              <IndividualVideoItems key={each.id} details={each} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  closeBanner = () => {
    this.setState(prevState => ({showBanner: false}))
  }

  AdsBanner = () => (
    <Banner data-testid="banner">
      <button type="button" data-testid="close" onClick={this.closeBanner}>
        <AiOutlineClose />
      </button>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <p>Buy Nxt Watch Premium</p>
        <button type="button">GET IT NOW</button>
      </div>
    </Banner>
  )

  handleSearchInput = event => {
    const x = event.target.value
    // console.log(x)
    this.setState({searchInput: x})
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.getYoutubeVideos()
  }

  renderLoadingView = () => {
    const {isLoading, searchInput, showBanner, apiStatus} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, ToogleTheme} = value

          const changeTheme = () => {
            //  this.setState(prevstate => ({isDark: !prevstate.isDark}))
            // console.log('sdv')
            ToogleTheme()
          }
          const Theme = isDark ? LightTheme : DarkTheme

          return (
            <Theme>
              <ItemsSideBarContainer>
                <SideHomeHeader />
                <div>
                  <div>{showBanner ? this.AdsBanner() : null}</div>
                  <div>
                    <form onSubmit={this.handleFormSubmit}>
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.handleSearchInput}
                      />
                      <button type="submit" data-testid="searchButton">
                        yz
                      </button>
                    </form>
                  </div>
                  {this.renderLoader()}
                </div>
              </ItemsSideBarContainer>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderFailureView = () => {
    const {isLoading, searchInput, showBanner, apiStatus} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, ToogleTheme} = value

          const changeTheme = () => {
            //  this.setState(prevstate => ({isDark: !prevstate.isDark}))
            // console.log('sdv')
            ToogleTheme()
          }
          const Theme = isDark ? LightTheme : DarkTheme

          return (
            <Theme>
              <ItemsSideBarContainer>
                <SideHomeHeader />
                <div>
                  <div>{showBanner ? this.AdsBanner() : null}</div>
                  <div>
                    <form onSubmit={this.handleFormSubmit}>
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.handleSearchInput}
                      />
                      <button type="submit" data-testid="searchButton">
                        yz
                      </button>
                    </form>
                  </div>
                  <Theme>
                    {isDark ? (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                        alt=""
                      />
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                        alt=""
                      />
                    )}
                    <>
                      <p>Oops Something Went Wrong</p>
                      <p>
                        We are having some trouble to complete your request.{' '}
                      </p>
                      <button type="button" onClick={this.retryFunctionality}>
                        Retry
                      </button>
                    </>
                  </Theme>
                </div>
              </ItemsSideBarContainer>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderSuccessView = () => {
    const {isLoading, searchInput, showBanner, apiStatus} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, ToogleTheme} = value

          const changeTheme = () => {
            //  this.setState(prevstate => ({isDark: !prevstate.isDark}))
            // console.log('sdv')
            ToogleTheme()
          }
          const Theme = isDark ? LightTheme : DarkTheme

          return (
            <Theme>
              <ItemsSideBarContainer>
                <SideHomeHeader />
                <div>
                  <div>{showBanner ? this.AdsBanner() : null}</div>
                  <div>
                    <form onSubmit={this.handleFormSubmit}>
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.handleSearchInput}
                      />
                      <button type="submit" data-testid="searchButton">
                        yz
                      </button>
                    </form>
                  </div>

                  {this.renderAllVideos(isDark)}
                </div>
              </ItemsSideBarContainer>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  render() {
    const {isLoading, searchInput, showBanner, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Home
