import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  mediaUrl: {
    type: String,
    required: function () { return this.type !== 'text'; }
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'seen'],
    default: 'sent',
  }
}, {
  timestamps: true
});

const Message = mongoose.model("Messages", messageSchema);
export default Messages;