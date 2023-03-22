import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    // required: [true, "Please provide your name!"],
    required: false,
    unique: false,
  },

  Email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exists!"],
  },

  Password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  Favourites: {
    type: Array,
    required: false,
    unique: false,
  },

  Filter: {
    type: Array,
    required: false,
    unique: false,
  },
  
  Token: {
    type: String,
    required: false,
    unique: false,
  },

});

const UserModel = mongoose.model('User', UserSchema)

export { UserModel };