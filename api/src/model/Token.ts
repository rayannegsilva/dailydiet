import { model, Schema } from 'mongoose'

export const Token = model('Token', new Schema({
  userId: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  token: {
    require: true,
    type: String
  },
  refresh_token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}))
