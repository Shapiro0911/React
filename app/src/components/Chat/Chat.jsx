import './Chat.css'
import { Form } from '../Form/Form'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react';
import { sendMessageWithReply } from '../../store/chat/actions';
import { Navigate, useParams } from "react-router";
import { messagesForCurrentChat } from '../../store/chat/selectors';

export const Chat = () => {
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const { chatID } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            dispatch(sendMessageWithReply(chatID, newMessage));
        },
        [dispatch, chatID]
    );

    if (!messages[chatID]) {
        return <Navigate replace to="/chats" />;
    }

    return (
        <div className="messages">
            {messages[chatID].map((message) => <div key={message.id}>{message.text}</div>)}
            <Form sendMessage={handleSendMessage} />
        </div>
    )
}