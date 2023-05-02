const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{type:String},
    project_name:{type:String},
    project_link:{type:String},
    project_image:{type:String},
    description:{type:String},
    technology:{type:String},
    created_at: { type: String, required: true, default: new Date().toISOString() },
    updated_at: { type: String, required: true, default: new Date().toISOString() },
});

module.exports = mongoose.model("projects", userSchema)