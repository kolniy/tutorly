import React from 'react'


const MessagesItem = () => {
    return <>
        <div className="messages-item">
            <div className="messages-item__first-letter">
                J
            </div>
            <div className="message-item-info">
            <div className="messages-item__recipient-details">
                <h3 className="recipient-name">
                    Jamal
                </h3>
                <p className="recipient-message">
                    Good Evening Sir
                </p>
            </div>
            <div className="messages-item__more-info">
                <div className="message-timestamp">17:35</div>
                <div className="message-unread-conuter">3</div>
            </div>
            </div>
        </div>
    </>
}

export default MessagesItem
