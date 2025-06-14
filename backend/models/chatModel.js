import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }
}, {
  timestamps: true
});

// Prevent duplicate chats between same users
chatSchema.index({ participants: 1 }, { unique: true });

const Chat = mongoose.model("Chat", productSchema);

export default Chat;