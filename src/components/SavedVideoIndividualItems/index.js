import {Link} from 'react-router-dom'

import './index.css'

const SavedVideoIndividualItems = props => {
  const {details} = props

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
  } = details

  return (
    <li>
      <Link to={`/videos/${id}`} className="item-link">
        <>
          <div>
            <img src={thumbnailUrl} alt="video thumbnail" />
            <div>
              <p>{title}</p>
              <p>{name}</p>
              <>
                <p>{viewCount}</p>
                <p>{publishedAt}</p>
              </>
            </div>
          </div>
        </>
      </Link>
    </li>
  )
}
export default SavedVideoIndividualItems
