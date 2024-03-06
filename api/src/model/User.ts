import { model, Schema } from 'mongoose'

export const User = model('User', new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String
  }
},
  { timestamps: true }
))
