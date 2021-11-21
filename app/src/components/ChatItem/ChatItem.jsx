import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteChat } from "../../store/chats/actions";
import { ListItemButton, ListItemText } from '@mui/material';

export const ChatItem = ({ chat }) => {
    const dispatch = useDispatch();
    const handleDeleteChat = () => {
        dispatch(deleteChat(chat.id));
    };

    return (
        <NavLink to={`/chats/${chat.id}`}>
            <ListItemButton>
                <ListItemText primary={chat.name} />
                <button onClick={handleDeleteChat}>Delete Chat</button>
            </ListItemButton>
        </NavLink>
    );
};