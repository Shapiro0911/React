import { Chat } from '../Chat/Chat'
import { ChatList } from '../ChatList/ChatList'
import './Chats.css'

export const Chats = () => {

    return (
        <div className="chats">
            <ChatList />
            <Chat />
        </div>
    )
}