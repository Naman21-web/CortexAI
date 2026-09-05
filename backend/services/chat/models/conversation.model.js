import mongoose from "mongoose";

const conversationchema = new mongoose.Schema({
    title:{
        type:String,
        default:"New Conversation"
    },
    userId: {
        type:String
    }
},{
    timestamps: true
});

const Conversation = mongoose.model("Conversation", conversationchema);
export default Conversation;
