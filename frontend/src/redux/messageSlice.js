import {createSlice} from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name:"conversation",
    initialState:{
        messages:[],
        artifacts: [],
        isLoading:false
    },
    reducers:{
        setMessages:(state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state,action) => {
            state.messages.push(action.payload) ;
        },
        setArtifacts: (state,action) => {
            state.artifacts = action.payload
        }
        setIsLoading: (state,action) => {
            state.isLoading = action.payload;
        },
        
    }        
})

export const {setMessages,addMessage,setArtifacts,setIsLoaading} = messageSlice.actions;
export default messageSlice.reducer;