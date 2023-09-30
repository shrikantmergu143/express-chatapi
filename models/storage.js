const mongoose = require('mongoose');
const DateTime= new Date().toISOString()

const userSchema = new mongoose.Schema({
    user_id:{type:String},
    file_id:{type:String, unique:true},
    file_url:{type:String},
    file_name:{type:String},
    file_path:{type:String},
    file_size:{type:Number},
    file_type:{type:String},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("storage", userSchema)