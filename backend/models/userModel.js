import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstame: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    gender: { 
      type: String,
      required: false,
      enum: ['M', 'F']
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    maritalStatus: {
      type: String,
      required: false,
      enum: ['Single', 'Divorced', 'Widowed']
    },
    occupation: {
      type: String,
    },
    annualIncome: {
      type: Number,
      required: false,
    },
    lastGraduatingCollege: {
      type: String,
      required: false,
    },
    fieldOfStudy: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    fatherGotra: {
      type: String,
      required: false,
    },
    motherGotra: {
      type: String, 
      required: false,
    },
    grandmotherGotra: {
      type: String,
      required: false,
    },
    motherMotherGotra: {
      type: String,
      required: false,
    },
    fatherOccupation: {
      type: String,
      required: false,
    },
    motherOccupation: {
      type: String,
      required: false,
    },
    accountCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    accountLastUpdated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    membership: [{
      plan: {
        type: String,
        required: false,
        enum: ['Essential', 'Premium']
      },
      buyDate: {
        type: Date,
        required: true,
        default: Date.now
      }
    }],
    favourites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;