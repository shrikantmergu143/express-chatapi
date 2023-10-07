const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});
const groupMessageSchema = new mongoose.Schema({
    group_id: { type: String, required: true },
    message: { type: String, required: true },
    device_id: { type: String, required: true },
    message_type: { type: String, required: true },
    chat_type: { type: String, default: "group" },
    sender_id: { type: String, required: true },
    sender_name: { type: String, required: true },
    is_deleted: { type: Array, default: [] },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    replay_id: { type: String, default: null },
    seen: [memberSchema],
    delivered: [memberSchema]
});

module.exports = mongoose.model('GroupMessage', groupMessageSchema);
