import React from 'react'
import moment from "moment"
import randomUserAvatar from "../../../../images/random-avatar.jpg"

const CommentsItem = ({ comment }) => {
    return <>
    <div className="comments-item mb-4">
        <div className="comment-user-avatar">
            <img className="img-fluid" src={randomUserAvatar}
                alt="user avatar display" />
        </div>
        <div className="comment-item__details">
            <div className="comment-name-and-timestamp">
                <p>{comment.username} <span className="ml-3">{
                    moment(comment.date).fromNow()
                }</span></p> 
            </div>
            <div className="comment-text">
            <p>
               {
                   comment.text
               }
            </p>
            </div>
            <div className="comment-controls">
                <div className="reply-button-and-counter">
                    3 <i className="fas fa-reply"></i>
                </div>
                <div className="view-reply ml-4">
                <i className="fas fa-circle"></i> View replies
                </div>
                <div className="comments-menu">
                <i className="fas fa-ellipsis-v"></i>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default CommentsItem
