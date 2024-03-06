import { model, Schema } from 'mongoose'

export const Meal = model('Meal', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true
  },
  isDiet: {
    type: Boolean,
    required: true
  },
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
  { timestamps: true }
))
