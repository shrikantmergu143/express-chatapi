const mongoose = require('mongoose');
const DateTime= new Date().toISOString()

const userSchema = new mongoose.Schema({
    user_id:{type:String},
    university:{type:String}, 
    college:{type:String}, 
    college_type:{type:String}, 
    state:{type:String}, 
    district:{type:String}, 
    education_name:{type:String},
    education_type:{type:String},
    education_degree:{type:String},
    education_department:{type:String},
    education_cource_type:{type:String},
    education_skill:{type:String},
    education_description:{type:String},
    education_start_date:{type:String},
    education_end_date:{type:String},
    is_parsing:{type:String},
    created_at: { type: String, required: true, default: new Date().toISOString() },
    updated_at: { type: String, required: true, default: new Date().toISOString() },
});

module.exports = mongoose.model("education", userSchema)