const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./tasks");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          if (!validator.isEmail(value)) throw new Error("email isn't correct");
        },
      },
    },
    password: {
      type: String,
      required: true,
      min: 7,
    },
    avatar: {
      type: Buffer,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// RELATION BETWEEN USERS AND TASKS
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// DELETE SOME PRIVATE DATA
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  delete userObject.__v;
  return userObject;
};
// GENERATE AUTH TOKEN
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// LOGGING IN
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Email is not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("No valid password");
  return user;
};

userSchema.pre("deleteOne", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._conditions._id });
  next();
});

// HASH PASSWORD BEFORE SAVING IT
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    next();
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
