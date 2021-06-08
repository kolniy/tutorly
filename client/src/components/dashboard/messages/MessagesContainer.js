import React from 'react'
import MessagesItem from './MessagesItem'

const MessagesContainer = () => {
    return <>
    <div className="message-container">
        <MessagesItem />
        <MessagesItem />
        <MessagesItem />
    </div>
    </>
}

export default MessagesContainer
