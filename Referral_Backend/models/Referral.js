const mongoose = require('mongoose');

// Enum values for status (example: active or inactive)
const validStatuses = ['New', 'Evaluated', 'Hired', 'Rejected']; 

const ReferralSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: Number, required: true }, // change to number
  status: {
    type: String,
    enum: validStatuses,
    required: true,
    default: 'New',
  },
  resume: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Referral', ReferralSchema);
