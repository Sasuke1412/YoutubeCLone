import {Link} from 'react-router-dom'

import {
  NxtWatchChannel,
  NxtWatchChannelInfoContainer,
  NxtWatchChannelColumnContainer,
  NxtWatchChannelRowContainer,
  NxtWatchChannelThumbnail,
  PublishedTime,
  ItemContainer,
} from '../IndividualVideoItems/styledComponents'

import './index.css'

const IndividualVideoItems = props => {
  const {details} = props
  const {
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    name,
    profileImageUrl,
  } = details
  return (
    <li>
      <Link to={`/videos/${id}`} className="item-link">
        <ItemContainer>
          <NxtWatchChannelThumbnail src={thumbnailUrl} alt="video thumbnail" />
          <NxtWatchChannelInfoContainer>
            <NxtWatchChannel src={profileImageUrl} alt="" />
            <NxtWatchChannelColumnContainer>
              <p className="text-design">{title}</p>
              <div>
                <p className="text-design">{name}</p>
                <NxtWatchChannelRowContainer>
                  <p className="text-design">{viewCount}</p>
                  <PublishedTime className="text-design">
                    {publishedAt}
                  </PublishedTime>
                </NxtWatchChannelRowContainer>
              </div>
            </NxtWatchChannelColumnContainer>
          </NxtWatchChannelInfoContainer>
        </ItemContainer>
      </Link>
    </li>
  )
}
export default IndividualVideoItems
