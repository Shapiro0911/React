import React, { useState, useEffect } from 'react';
import { Form } from '../Form/Form'
import './Chat.css'

export const Chat = () => {
    const [messages, setMessages] = useState([]);

    const handleMessage = (text) => {
        setMessages([...messages, { id: (messages[messages.length - 1]?.id || -1) + 1, text: text, author: 'human' }]);
    }

    useEffect(() => {
        if (messages.length !== 0 && messages[messages.length - 1].author === "human") {
            setTimeout(() => {
                setMessages([...messages, { id: messages[messages.length - 1].id + 1, text: "Hello", author: 'bot' }])
            }, 1500)
        }
    }, [messages])

    return (
        <div className="messages">
            {messages.map((message) => <div key={message.id}>{message.text}</div>)}
            <Form sendMessage={handleMessage} />
        </div>
    )
}