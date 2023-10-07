const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    role: { type: String, required: true },
    is_removed: { type: Boolean, default: false }
});
const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [memberSchema],
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    profile_url: { type: String, default: null },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    last_message: { type: Object, required: false, default:null },
    is_delete: { type: Boolean, default: false},
});

module.exports = mongoose.model('Group', groupSchema);