import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteChat } from "../../store/chats/actions";
import { messagesForCurrentChat } from "../../store/chatMsgs/selectors"
import "./ChatItem.css"
import { useEffect, useRef, useState } from "react";
import { storageRef } from "../../services/firebase";
import { getDownloadURL } from "firebase/storage";

export const ChatItem = ({ chat }) => {
    const dispatch = useDispatch();
    const messages = useSelector(messagesForCurrentChat);
    const cleanUp = useRef(false);
    const [rippleArray, setRippleArray] = useState([]);
    const [timeout, setRippleTimeout] = useState(null);
    const [imageAsUrl, setImageAsUrl] = useState('')

    const handleDeleteChat = (event) => {
        event.preventDefault()
        dispatch(deleteChat(chat.id));
    };

    const showRipple = (event) => {
        const rippleContainer = event.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = event.pageX - pos.x - (size / 2);
        const y = event.pageY - pos.y - (size / 2);
        const newRipple = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        setRippleArray((prevState) => [...prevState, newRipple]);

        setRippleTimeout(setTimeout(() => {
            if (!cleanUp.current) {
                setRippleArray([]);
            }
        }, 4000))
        clearTimeout(timeout);
    }

    useEffect(() => {
        getDownloadURL(storageRef)
            .then((url) => {
                setImageAsUrl(url);
            });
        return () => {
            cleanUp.current = true
        }
    }, [])

    return (
        <NavLink to={`/chats/${chat.id}`} className="link chatItem-btn">
            <div className="rippleContainer" onMouseDown={showRipple}>
                {rippleArray.length > 0 &&
                    rippleArray.map((ripple, index) => {
                        return (
                            <span key={"ripple-" + index} style={ripple}></span>
                        )
                    })
                }
            </div>
            <div>
                <img className="avatar" src={imageAsUrl} alt="avatar" />
            </div>
            <div className="chatItem-text">
                <h4 className="chatname">{chat.name}</h4>
                {messages[chat.id] && <p className="last-msg">{messages[chat.id][messages[chat.id].length - 1]?.text}</p>}
            </div>
            <div className="chatItem-time">12:04 PM</div>
            <button className="deleteChat-btn" onClick={handleDeleteChat}>&#10005;</button>
        </NavLink>
    );
};