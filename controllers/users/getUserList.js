const { db } = require("../../models/user");
const User = require("../../models/user");
const usersPayload = require("../usersPayload");

const getUsersList = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id
        const user = await User.findOne({ _id:user_id});
        // return res.status(200).json({error:"Error occured, Please try again"});
        if(user){
            const payload = await User.find({ _id: { $ne: user_id } });
            const response = payload?.map((item)=>{
                const Data =  usersPayload(item);
                return Data;
            })
            return res.status(200).json({
                data:response
            });
        }
        return res.status(403).json({error:"Token expired"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
} 
module.exports = getUsersList; 