// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentsDetails, isDelete, isLikeActive} = props
  const {name, comment, date, isLike, initialClassName, id} = commentsDetails

  const initial = name ? name[0] : ''

  const postTime = formatDistanceToNow(date)
  const background = `profile-icon ${initialClassName}`

  const likeImg = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const changeLikeClassName = isLike ? 'active-button' : 'like-button'

  const onClickLike = () => {
    isLikeActive(id)
  }

  const onClickDelete = () => {
    isDelete(id)
  }

  return (
    <li className="list-item">
      <div className="container">
        <p className={background}>{initial}</p>
        <div>
          <div className="name-container">
            <p className="name">{name}</p>
            <p className="time">{postTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-container">
        <div className="like">
          <img src={likeImg} alt="like" className="like-image" />
          <button
            type="button"
            className={changeLikeClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete"
          onClick={onClickDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
