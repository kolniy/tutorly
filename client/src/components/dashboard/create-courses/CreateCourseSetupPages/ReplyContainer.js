import React, { useState, useEffect } from 'react'
import ReplyItem from './ReplyItem'

export const RepliesContainer = ({
    replies
}) => {

    const [ loadedReplies, setLoadedReplies ] = useState([])

    useEffect(() => {
        setLoadedReplies(replies)
        // eslint-disable-next-line
    }, [])

    return <>
    <div className="reply-container">
        {
            loadedReplies.map((reply) =>  <ReplyItem key={reply._id} reply={reply} />)
        }
    </div>
    </>
}

export default RepliesContainer