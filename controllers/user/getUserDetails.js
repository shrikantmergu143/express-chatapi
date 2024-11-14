const User = require("../../models/user");
const userPayload = require("../userPayload");

const getUserDetails = async (user_id)=>{
    try{
        const user = await User.findOne({ _id:user_id});
        if(user){
            const payload = userPayload(user);
            return payload;
        }
        return {error:"User not found"};

    }catch(err){
        return {error:"Error occured, Please try again"}
    }
}
module.exports = getUserDetails;