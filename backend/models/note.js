import mongoose from 'mongoose'
const { Schema } = mongoose

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    default: () => Date.now().toString(),
    immutable: true
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  category:{
    type: String,
    default: ''
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
}, { collection: 'notes' })

export default mongoose.model('Note', noteSchema)