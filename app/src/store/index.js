import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { profileReducer } from './profile/reducer';
import { chatsReducer } from './chats/reducer';
import { chatReducer } from './chat/reducer';
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import { charactersReducer } from './Characters/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    key: 'messanger',
    storage,
    blacklist: ['profile', 'characters']
}

const persistedReducer = persistReducer(
    config,
    combineReducers({
        profile: profileReducer,
        chats: chatsReducer,
        chat: chatReducer,
        characters: charactersReducer
    })
);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
