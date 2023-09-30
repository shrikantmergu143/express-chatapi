const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{type:String},
    project_name:{type:String},
    project_link:{type:String},
    project_image:{type:String},
    description:{type:String},
    technology:{type:String},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("projects", userSchema)