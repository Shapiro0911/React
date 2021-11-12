import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css'
import { Chats } from './components/Chats/Chats'
import { ChatList } from './components/ChatList/ChatList'
import { Home } from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/chats'>Chats</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='chats'>
          <Route index element={<ChatList />} />
          <Route path=':chatId' element={<Chats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
