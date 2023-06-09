const User = require("../../models/user");
const userPayload = require("../userPayload");

const getUser = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id
        const user = await User.findOne({ _id:user_id});
        // return res.status(200).json({error:"Error occured, Please try again"});
        if(user){
            const payload = userPayload(user);
            return res.status(200).json({
                userDetails:payload
            });
            // return res.status(200).json({
            //     userDetails:payload
            // });
        }
        return res.status(403).json({error:"Token expired"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = getUser;