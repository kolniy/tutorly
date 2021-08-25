import React from 'react'
import moment from "moment"
import randomUserAvatar from "../../../../images/random-avatar.jpg"

export const ReplyItem = ({ reply }) => {
    return <>
    <div className="reply-item mb-4">
        <div className="reply-user-avatar">
            <img className="img-fluid" src={randomUserAvatar}
                alt="user avatar display" />
        </div>
        <div className="reply-item__details">
            <div className="reply-name-control">
             <div className="reply-name-and-timestamp">
                <p>{reply.username} <span className="ml-3">{
                    moment(reply.date).fromNow()
                }</span></p> 
            </div>
            <div className="reply-menu">
                <i className="fas fa-ellipsis-v"></i>
            </div>
            </div>
            <div className="reply-text">
                <p className="mb-1 mt-1">
                    {
                        reply.text
                    }
                </p>
          </div>
        </div>
        </div>
    </>
}

export default ReplyItem
