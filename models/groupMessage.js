const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
    group_id: { type: String, required: true },
    message: { type: String, required: true },
    device_id: { type: String, required: true },
    message_type: { type: String, required: true },
    sender_id: { type: String, required: true },
    sender_name: { type: String, required: true },
    is_deleted: { type: Array, default: [] },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    seen: { type: Boolean, default: false },
    replay_id: { type: String, default: null },
    delivered: { type: Boolean, default: false }
});

module.exports = mongoose.model('GroupMessage', groupMessageSchema);
