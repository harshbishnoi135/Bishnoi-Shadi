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
      type: {
        firstName: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        lastName: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        gender: {
          type: String,
          required: function() { return this.fullProfile !== null; },
          enum: ['M', 'F']
        },
        dateOfBirth: {
          type: Date,
          required: function() { return this.fullProfile !== null; }
        },
        height: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        city: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        state: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        country: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        phoneNumber: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        maritalStatus: {
          type: String,
          required: function() { return this.fullProfile !== null; },
          enum: ['Never Married', 'Divorced', 'Widowed']
        },
        occupation: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        annualIncome: {
          type: Number,
          required: function() { return this.fullProfile !== null; }
        },
        lastGraduatingCollege: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        fieldOfStudy: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        fatherGotra: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        motherGotra: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        grandmotherGotra: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        motherMotherGotra: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        fatherOccupation: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        },
        motherOccupation: {
          type: String,
          required: function() { return this.fullProfile !== null; }
        }
      },
      required: false,
      default: null
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