import './Chat.css'
import { Form } from '../Form/Form'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react';
import { sendMessage } from '../../store/chat/actions';
import { Navigate, useParams } from "react-router";
import { messagesForCurrentChat } from '../../store/chat/selector';

export const Chat = () => {
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const { chatID } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            dispatch(sendMessage(chatID, newMessage));
        },
        [dispatch, chatID]
    );

    useEffect(() => {
        if (messages[chatID]?.length !== 0 && messages[chatID]?.[messages[chatID]?.length - 1].author === "human") {
            setTimeout(() => {
                handleSendMessage({ id: `mes-${Date.now()}`, text: "Hello", author: 'bot' })
            }, 1500)
        }
        // eslint-disable-next-line
    }, [messages])

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