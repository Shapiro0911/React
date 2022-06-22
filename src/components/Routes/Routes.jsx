import { Characters } from '../Characters/Characters'
import { SignUp } from '../SignUp/SignUp'
import { Chats } from '../Chats/Chats'
import { Home } from '../Home/Home'
import { Profile } from '../Profile/Profile'
import { PrivateOutlet } from "../PrivateRoute/PrivateRoute"
import { PublicOutlet } from '../PublicRoute/PublicRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const Router = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<PublicOutlet />}>
                        <Route path="" element={<Home />} />
                    </Route>
                    <Route path="/signup" element={<PublicOutlet />}>
                        <Route path="" element={<SignUp />} />
                    </Route>
                    <Route path='chats' element={<PrivateOutlet />}>
                        <Route index element={<Chats />} />
                        <Route path=':chatID' element={<Chats />} />
                    </Route>
                    <Route path='profile' element={<PrivateOutlet />}>
                        <Route path="" element={<Profile />} />
                    </Route>
                    <Route path='characters' element={<Characters />} />
                    <Route path='*' element={<h3>Error 404</h3>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}