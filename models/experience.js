const mongoose = require('mongoose');
const DateTime= new Date().toISOString()

const userSchema = new mongoose.Schema({
    user_id:{type:String},
    company_name:{type:String},
    company_address:{type:String},
    company_role:{type:String},
    company_type:{type:String},
    start_date:{type:String},
    end_date:{type:String},
    description:{type:String},
    skills:{type:String},
    company_current:{type:Boolean},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("education", userSchema)