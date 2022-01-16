import './Chat.css'
import { Form } from '../Form/Form'
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
//import { sendMessageWithReply } from '../../store/chat/actions';
import { Navigate, useParams } from "react-router";
import { messagesForCurrentChat } from '../../store/chatMsgs/selectors';
import { getChatMsgsListRefByID } from '../../services/firebase';
import { push } from 'firebase/database';

export const Chat = () => {
    const messages = useSelector(messagesForCurrentChat);
    const { chatID } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            push(getChatMsgsListRefByID(chatID), newMessage);
        },
        [chatID]
    );

    if (!messages[chatID]) {
        return <Navigate replace to="/chats" />;
    }

    return (
        <div className="messages">
            {messages[chatID]?.map((message) => <div key={message.id}>{message.text}</div>)}
            <Form sendMessage={handleSendMessage} />
        </div>
    )
}