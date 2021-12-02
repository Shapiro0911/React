import { Characters } from '../Characters/Characters'
import { SignUp } from '../SignUp/SignUp'
import { Chats } from '../Chats/Chats'
import { ChatList } from '../ChatList/ChatList'
import { Home } from '../Home/Home'
import { Profile } from '../Profile/Profile'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

export const Router = () => {
    return (
        <BrowserRouter>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/chats'>Chats</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/characters'>Characters</Link>
                </li>
            </ul>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path='chats'>
                    <Route index element={<ChatList />} />
                    <Route path=':chatID' element={<Chats />} />
                </Route>
                <Route path='profile' element={<Profile />} />
                <Route path='characters' element={<Characters />} />
                <Route path='*' element={<h3>Error 404</h3>} />
            </Routes>
        </BrowserRouter>
    )
}