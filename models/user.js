const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Username"],
      minlength: [3, "The Minimum length for name is 5"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [7, "The Minimum password length is 7"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};

userSchema.methods.generateToken = async function (params) {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = mongoose.model("User", userSchema);
