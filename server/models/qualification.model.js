import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Qualification title is required'],
    trim: true
  },
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  completion: {
    type: Date,
    required: [true, 'Completion date is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true
});

const Qualification = mongoose.model('Qualification', QualificationSchema);

export default Qualification;
