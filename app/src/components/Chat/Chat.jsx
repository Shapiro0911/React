import './Chat.css'
import { Form } from '../Form/Form'
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { useParams } from "react-router";
import { messagesForCurrentChat } from '../../store/chatMsgs/selectors';
import { getChatMsgsListRefByID, getChatMsgsRefByID } from '../../services/firebase';
import { push, update } from 'firebase/database';
import { profileInfo } from '../../store/profile/selectors';
import { useEffect } from 'react';

export const Chat = () => {
    const messages = useSelector(messagesForCurrentChat);
    const profile = useSelector(profileInfo);
    const { chatID } = useParams();

    const handleSendMessage = useCallback(
        (newMessage) => {
            const statusUpdate = {
                empty: false
            }

            push(getChatMsgsListRefByID(chatID), newMessage);
            update(getChatMsgsRefByID(chatID), statusUpdate);
        },
        [chatID]
    );

    useEffect(() => {
        const chatMsgs = document.getElementsByClassName("chat-msgs");
        chatMsgs[0].scrollTop = chatMsgs[0]?.scrollHeight;
    }, [chatID, messages])

    return (
        <div className="chat">
            <div className="chat-msgs">
                {messages[chatID]?.map((message) => <div key={message.id}>
                    {message.author === profile.username ?
                        <div className={`msg-block curUserTrue`}>
                            <p className="msg-author">{message.author}</p>
                            <p className="msg-text">{message.text}</p>
                        </div> :
                        <div className={`msg-block curUserFalse`}>
                            <p className="msg-author">{message.author}</p>
                            <p className="msg-text">{message.text}</p>
                        </div>
                    }
                </div>)}
            </div>
            <Form sendMessage={handleSendMessage} />
        </div>
    )
}

