import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {inputName: '', inputComment: '', commentsList: []}

  onChangeInputName = event => {
    this.setState({inputName: event.target.value})
  }

  onChangeInputComment = event => {
    this.setState({inputComment: event.target.value})
  }

  addComment = event => {
    event.preventDefault()
    const {inputName, inputComment} = this.state

    const backgroundColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: v4(),
      name: inputName,
      comment: inputComment,
      date: new Date(),
      isLike: false,
      initialClassName: backgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      inputName: '',
      inputComment: '',
    }))
  }

  isDelete = id => {
    const {commentsList} = this.state
    this.setState({commentsList: commentsList.filter(each => each.id !== id)})
  }

  isLikeActive = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (id === each.id) {
          return {...each, isLike: !each.isLike}
        }
        return each
      }),
    }))
  }

  renderComments = () => {
    const {commentsList} = this.state

    return commentsList.map(each => (
      <CommentItem
        commentsDetails={each}
        key={each.id}
        isDelete={this.isDelete}
        isLikeActive={this.isLikeActive}
      />
    ))
  }

  render() {
    const {inputName, inputComment, commentsList} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="card">
          <form className="form" onSubmit={this.addComment}>
            <p className="para">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="input-name"
              value={inputName}
              onChange={this.onChangeInputName}
            />
            <textarea
              rows="8"
              cols="30"
              placeholder="Your Comment"
              className="input-comment"
              value={inputComment}
              onChange={this.onChangeInputComment}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-image"
          />
        </div>
        <hr className="line" />
        <div className="comments-number-card">
          <p className="comment-numbers-update">{commentsList.length}</p>
          <p className="comment-name">Comments</p>
        </div>

        <ul className="list-container">{this.renderComments()}</ul>
      </div>
    )
  }
}

export default Comments
