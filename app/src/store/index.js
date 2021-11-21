import { combineReducers, createStore } from 'redux'
import { profileReducer } from './profile/reducer';
import { chatsReducer } from './chats/reducer';
import { chatReducer } from './chat/reducer';

export const store = createStore(
    combineReducers({
        profile: profileReducer,
        chats: chatsReducer,
        chat: chatReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

