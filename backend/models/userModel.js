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
    fullProfile: {
      firstame: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      maritalStatus: {
        type: String,
        required: true,
        enum: ['Single', 'Divorced', 'Widowed']
      },
      occupation: {
        type: String,
        required: true,
      },
      annualIncome: {
        type: Number,
        required: true,
      },
      lastGraduatingCollege: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      fatherGotra: {
        type: String,
        required: true,
      },
      motherGotra: {
        type: String,
        required: true,
      },
      grandmotherGotra: {
        type: String,
        required: true,
      },
      motherMotherGotra: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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