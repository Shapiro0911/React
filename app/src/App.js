import React from "react";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import './App.css'
import { Chats } from './components/Chats/Chats'
import { ChatList } from './components/ChatList/ChatList'
import { Home } from './components/Home/Home'
import { Profile } from './components/Profile/Profile'
import { store, persistor } from './store'
import { CircularProgress } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<CircularProgress />}>
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
          </ul>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='chats'>
              <Route index element={<ChatList />} />
              <Route path=':chatID' element={<Chats />} />
            </Route>
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<h3>Error 404</h3>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
