import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import coversationReducer from './conversationSlice.js'
import messageReducer from './messageSlice.js'

const store = configureStore({
    reducer:{
        user:userReducer,
        conversation:coversationReducer,
        message:messageReducer
    },
})

export default store;
