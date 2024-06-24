const mongoose = require('mongoose');

const Channels = new mongoose.Schema({
  channel_id: { type: String, required: true },
  channel_name: { type: String, required: true, unique: true }, // Ensure channel_name is unique
  logo: { type: String, required: false },
  mode: { type: String, enum: ['public', 'private'], default: 'public' },
  members: { type: [String], default: [] },
  settings: { type: Object, default: {} },
  created_by: { type: String, required: true },
  channel_status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // Add channel_status field
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
}, { timestamps: true }); // Enable timestamps to automatically manage created_at and updated_at

// export default mongoose.models.Channels || mongoose.model('Channels', ChannelSchema);
module.exports = mongoose.model("Channels", Channels)
