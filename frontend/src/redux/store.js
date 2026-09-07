import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import coversationReducer from './conversationSlice.js'

const store = configureStore({
    reducer:{
        user:userReducer,
        conversation:coversationReducer
    },
})

export default store;
