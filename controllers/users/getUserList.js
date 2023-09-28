const { db } = require("../../models/user");
const User = require("../../models/user");

const getUsersList = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id
        const user = await User.findOne({ _id:user_id});
        // return res.status(200).json({error:"Error occured, Please try again"});
        if(user){
            const payload = await User.find({ _id: { $ne: user_id } });
            const response = payload?.map((item)=>({
                user_id:item?._id,
                id:item?._id,
                email:item?.email,
                username:item?.username,
                profile_url:item?.profile_url?item?.profile_url:null,
                first_name:item?.first_name?item?.first_name:null,
                username:item?.last_name?item?.last_name:null,
            }))
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