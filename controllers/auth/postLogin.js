const User = require("../../models/user");
const userPayload = require("../userPayload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res)=>{
    try{
        const {email, password} = req.body;

        // check if user exits
        const user = await User.findOne({email:email.toLowerCase(), });
    //   console.log("user", user);
        if(user &&(  await bcrypt.compare(password, user.password) )){
             //create JWT token
            const token = jwt.sign(
                {
                    user_id:user._id,
                    email:email,
                    is_admin:user?.is_admin,
                    user_type:user?.user_type,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn:"365d"
                }
            );
            const payload = userPayload(user);
            return res.status(200).json({
                userDetails:{
                    ...payload,
                    token:token,
                }
            });
        }

        return res.status(400).json({error:"Invalid credentials, Please try again"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = postLogin;