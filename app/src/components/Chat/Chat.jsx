import './Chat.css'
import { Form } from '../Form/Form'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react';
import { sendMessageWithReply } from '../../store/chat/actions';
import { Navigate, useParams } from "react-router";
import { messagesForCurrentChat } from '../../store/chat/selectors';
import { getChatMsgsListRefByID } from '../../services/firebase';
import { push } from 'firebase/database';

import { useState } from 'react';
import { onValue } from 'firebase/database';
import { messagesRef } from '../../services/firebase';

export const Chat = () => {
    //const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const { chatID } = useParams();
    const [messages, setMsgs] = useState({});

    useEffect(() => {
        onValue(messagesRef, (snapshot) => {
            const chatMessages = {};
            snapshot.forEach((chatMsgsSnap) => {
                chatMessages[chatMsgsSnap.key] = Object.values(
                    chatMsgsSnap.val().chatMessageList || {}
                );
            });
            setMsgs(chatMessages);
        });
    }, []);

    const handleSendMessage = useCallback(
        (newMessage) => {
            push(getChatMsgsListRefByID(chatID), newMessage);
        },
        [dispatch, chatID]
    );


    return (
        <div className="messages">
            {messages[chatID]?.map((message) => <div key={message.id}>{message.text}</div>)}
            <Form sendMessage={handleSendMessage} />
        </div>
    )
}