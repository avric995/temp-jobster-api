const mongoose = require('mongoose');

const JobsSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please proviide company and name'],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobsSchema);
