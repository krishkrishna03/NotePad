import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  pinned: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before update
NoteSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;