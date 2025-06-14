const friendSchema = mongoose.Schema({
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'blocked'],
      default: 'pending'
    }
  }, {
    timestamps: true
  });
  
  // Avoid duplicate friend pairs
  friendSchema.index({ user1: 1, user2: 1 }, { unique: true });
  
const Friend = mongoose.model('User', userSchema);

export default Friend;