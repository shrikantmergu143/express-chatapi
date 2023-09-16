const mongoose = require('mongoose');
const friendRequest = new mongoose.Schema({
    to_id: { type: String, required: true },
    from_id: { type: String, required: true },
    accepted_to: { type: String, required: true, default:false },
    accepted_from: { type: String, required: true, default:true },
    created_at: { type: String, required: true, default:new Date().toISOString() },
    updated_at: { type: String, required: true, default:new Date().toISOString() },
    status: { type: String, required: true, default:false },
    active: { type: Boolean, required: true, default:true },
    is_deleted: { type: Boolean, required: true, default:false },
});

module.exports = mongoose.model("friendRequest", friendRequest)