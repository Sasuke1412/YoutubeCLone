import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai'

import {MdPlaylistAddCheck, MdOutlinePlaylistAdd} from 'react-icons/md'

import {RiPlayListAddLine} from 'react-icons/ri'

import SideHomeHeader from '../SideHomeHeader'

import WatchContext from '../Context/watchContext'

import {DarkTheme, LightTheme} from './styledComponents'

import {ItemsSideBarContainer} from '../Home/styledComponents'

import './index.css'

class VideoItemDetails extends Component {
  state = {
    isLoading: false,
    data: [],
    similarData: {},
    isPlaying: false,
    isLiked: false,
    isDisliked: false,
    isSavedVideo: false,
  }

  componentDidMount() {
    this.renderIndividualVideo()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderIndividualVideo = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
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
      const updatedSimilarVideoData = data.similar_videos.map(each => ({
        Sid: each.id,
        SpublishedAt: each.published_at,
        SthumbnailUrl: each.thumbnail_url,
        Stitle: each.title,
        SvideoUrl: each.video_url,
        SviewCount: each.view_count,
        Sname: each.channel.name,
        SprofileImageUrl: each.channel.profile_image_url,
      }))
      const updatedVideoData = {
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        id: data.video_details.id,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      this.setState(
        {
          similarData: updatedSimilarVideoData,
          data: updatedVideoData,
          isLoading: false,
        },
        this.renderVedioDetails,
      )
    }
    if (response.status === 401) {
      this.setState({isLoading: false}, this.renderDetailsFAilure)
    }
  }

  likeButtonFunctionality = () => {
    const {isLiked, isDisliked} = this.state

    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }))
    this.setState({isDisliked: false})
  }

  dislikeButtonFunctionality = () => {
    const {isLiked, isDisliked} = this.state

    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
    }))
    this.setState({isLiked: false})
  }

  LikeButton = () => {
    const {isLiked} = this.state
    const buttonClassName = isLiked ? 'like-button' : 'chnage-like-button'
    return (
      <>
        <button
          type="button"
          className={buttonClassName}
          onClick={this.likeButtonFunctionality}
        >
          <span> {isLiked ? <AiFillLike /> : <AiOutlineLike />}</span>
          Like
        </button>
      </>
    )
  }

  DisLikeButton = () => {
    const {isDisliked} = this.state
    const buttonClassName = isDisliked ? 'like-button' : 'chnage-like-button'
    return (
      <>
        <button
          type="button"
          className={buttonClassName}
          onClick={this.dislikeButtonFunctionality}
        >
          <span> {isDisliked ? <AiFillDislike /> : <AiOutlineDislike />} </span>
          Dislike
        </button>
      </>
    )
  }

  renderVedioDetails = () => {
    const {similarData, isLoading} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, ToogleTheme, addWatchListItem} = value

          const changeTheme = () => {
            //  this.setState(prevstate => ({isDark: !prevstate.isDark}))
            console.log('sdv')
            ToogleTheme()
          }
          const {data, isSavedVideo} = this.state

          const saveVideoButtonFunctionality = () => {
            console.log(data, 'SDvc')
            this.setState(
              prevState => ({
                isSavedVideo: !prevState.isSavedVideo,
              }),

              addWatchListItem({...data}),
            )
          }

          const Theme = isDark ? LightTheme : DarkTheme

          const {
            description,
            publishedAt,
            thumbnailUrl,
            title,
            videoUrl,
            viewCount,
            id,
            name,
            profileImageUrl,
            subscriberCount,
          } = data
          return (
            <Theme>
              <>
                <ItemsSideBarContainer>
                  <SideHomeHeader />
                  <>
                    <ReactPlayer url={videoUrl} controls />
                  </>
                  <div>
                    <p>{title}</p>
                    <div>
                      <>
                        <p>{viewCount}</p>
                        <p>{publishedAt}</p>
                      </>
                      <>
                        {this.LikeButton()}
                        {this.DisLikeButton()}
                        <p>
                          <>
                            <button
                              type="button"
                              onClick={saveVideoButtonFunctionality}
                            >
                              {isSavedVideo ? (
                                <span>
                                  Saved
                                  <MdPlaylistAddCheck />
                                </span>
                              ) : (
                                <span>
                                  Save <RiPlayListAddLine />
                                </span>
                              )}
                            </button>
                          </>
                        </p>
                      </>
                    </div>
                    <hr />
                    <div>
                      <img src={profileImageUrl} alt="channel logo" />
                      <div>
                        <p>{name}</p>
                        <p>{subscriberCount}</p>
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                </ItemsSideBarContainer>
              </>
            </Theme>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <div>{isLoading ? this.renderLoader() : this.renderVedioDetails()}</div>
      </>
    )
  }
}
export default VideoItemDetails
