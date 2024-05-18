const mongoose = require('mongoose');
const DateTime= new Date().toISOString()

const storageBucket = new mongoose.Schema({
    file_id:{type:String, unique:true},
    asset_id: {type: String},
    public_id: {type: String},
    version: {type: Number},
    version_id: {type: String},
    signature: {type: String},
    width: {type: Number},
    height: {type: Number},
    format: {type: String},
    resource_type: {type: String},
    created_at: {type: String},
    tags: {type: Array},
    bytes: {type: Number},
    type: {type: String},
    etag: {type: String},
    placeholder: {type: String},
    url: {type: String},
    secure_url: {type: String},
    folder: {type: String},
    original_filename: {type: String},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("storage-bucket", storageBucket)