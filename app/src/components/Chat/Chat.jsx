import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '../Form/Form'
import { messagesForCurrentChat } from '../../store/chat/selector';
import './Chat.css'
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../store/chat/actions';
import { Navigate, useParams } from 'react-router';

export const Chat = () => {
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const chatID = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            dispatch(sendMessage(chatID, newMessage));
        },
        [dispatch, chatID]
    );

    useEffect(() => {
        if (messages[chatID]?.length !== 0 && messages[chatID]?.[messages.length - 1].author === "human") {
            setTimeout(() => {
                handleSendMessage(
                    {
                        author: 'bot',
                        text: "Hello",
                        id: `mes-${Date.now()}`,
                    })
            }, 1500)
        }// eslint-disable-next-line
    }, [messages])

    return (
        <div className="messages">
            {messages[chatID].map((message) => <div key={message.id}>{message.text}</div>)}
            <Form sendMessage={handleSendMessage} />
        </div>
    )
}