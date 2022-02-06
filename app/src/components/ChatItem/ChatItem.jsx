import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteChat } from "../../store/chats/actions";
import { profileInfo } from "../../store/profile/selectors";
import { messagesForCurrentChat } from "../../store/chatMsgs/selectors"
import "./ChatItem.css"
import { useState } from "react";
import { useEffect } from "react";

export const ChatItem = ({ chat }) => {
    const dispatch = useDispatch();
    const profile = useSelector(profileInfo);
    const messages = useSelector(messagesForCurrentChat)
    const { chatID } = useParams()
    const [fillAnimation, setFill] = useState('')

    const handleDeleteChat = (event) => {
        event.preventDefault()
        dispatch(deleteChat(profile.userID, chat.id));
    };

    useEffect(() => {
        if (chat.id === chatID) {
            setFill('fillContainer')
        }
        else {
            setFill('')
        }
    }, [chatID, chat.id])

    return (
        <NavLink to={`/chats/${chat.id}`} className="link chatItem-btn">
            <div className="chatItem-text">
                <h4 className="chatname">{chat.name}</h4>
                {messages[chat.id] && <p className="last-msg">{messages[chat.id][messages[chat.id].length - 1]?.text}</p>}
            </div>
            <button className="deleteChat-btn" onClick={handleDeleteChat}>Delete Chat</button>
            <div className={fillAnimation}></div>
        </NavLink>
    );
};