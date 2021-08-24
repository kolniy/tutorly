import React, { useState, useEffect } from 'react'
import { FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios'
import setAuthToken from '../../../../utilities/setAuthToken'
import moment from "moment"
import { useAlert } from 'react-alert'
import randomUserAvatar from "../../../../images/random-avatar.jpg"

const CommentsItem = ({ comment }) => {

    const [ showReplyInput, setShowReplyInput ] = useState(false)
    const [ showReplies, setShowReplies ] = useState(false)
    const [ loading, setLoading] = useState(false)
    const [ replyText, setReplyText ] = useState('')
    const [ replies, setReplies ] = useState([])
    const alert = useAlert()

    const displayTextInput = () => setShowReplyInput(true)
    const removeTextInput = () => setShowReplyInput(false)
    const updateReplyText = (e) => setReplyText(e.target.value)
    const toggleShowReply = () => setShowReplies(!showReplies)

    useEffect(() => {
        setReplies(comment.reply)
         // eslint-disable-next-line
    }, [])

    const postReply = async () => {
        if(replyText.length === 0){
           return alert.show('reply text cannot be empty', {
                type: 'error'
            })
        }
        if(localStorage.getItem("token")){
            setAuthToken(localStorage.getItem("token"))
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            text:replyText
        })
        try {
            setLoading(true)
            const res = await axios.post(`/api/v1/reply/${comment._id}`, body, config)
            setReplies([
                res.data,
                ...replies,
            ])
            if(showReplies === false){
                setShowReplies(true)
            }
            setReplyText('')
            setShowReplyInput(false)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

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
                <div className="reply-controls">
                <div onClick={displayTextInput} className="reply-button-and-counter">
                   {
                     replies?.length > 0 && replies?.length
                    } 
                    <i className="fas fa-reply ml-1"></i>
                </div>
                    {
                        replies?.length > 0 && <>
                            {
                                    showReplies ? (
                                        <div onClick={toggleShowReply} className="view-reply ml-4">
                                      <i className="fas fa-circle"></i> Hide replies
                                    </div>
                                    ) : (<div onClick={toggleShowReply} className="view-reply ml-4">
                                    <i className="fas fa-circle"></i> View replies
                                    </div>)
                            }
                        </>
                    }
                </div>
                <div className="comments-menu">
                <i className="fas fa-ellipsis-v"></i>
                </div>
            </div>
        </div>
    </div>
    {
        loading && (<div style={{
            width:'50%',
            margin:'20px auto',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>)
    }
    {
            showReplyInput && (
                <div className="reply-form">
                    <FormGroup>
                        <Input 
                        placeholder="Add a reply to this comment"
                        onChange={e => updateReplyText(e)}
                        value={replyText}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={removeTextInput}>Cancel</Button>
                        <Button onClick={postReply}>Send Reply</Button>
                    </FormGroup>
                </div>
            )
        }
    </>
}

export default CommentsItem
