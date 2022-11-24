import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'users' })

export default mongoose.model('User', userSchema)