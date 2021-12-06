import './Chat.css'
import { Form } from '../Form/Form'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react';
//import { sendMessageWithReply } from '../../store/chat/actions';
import { Navigate, useParams } from "react-router";
import { messagesForCurrentChat } from '../../store/chat/selectors';
import { getChatMsgsListRefByID } from '../../services/firebase';
import { push } from 'firebase/database';

import { initMessagesTracking } from '../../store/chat/actions';

export const Chat = () => {
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const { chatID } = useParams();

    useEffect(() => {
        dispatch(initMessagesTracking(chatID))
        // eslint-disable-next-line
    }, []);

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