const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res)=>{
    try{
        const {username, email, password, first_name, last_name} = req.body;

        // check if user exits
        const useExists = await User.exists({email:email.toLowerCase(), });
        if(useExists){
            return res.status(400).json({error:"Email already exists!"});
        }

        //
        const encryptPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password:encryptPassword,
            last_name:last_name,
            first_name:first_name,
        });

        //create JWT token
        const token = await jwt.sign(
            {
                user_id:user._id,
                email:email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:"365d"
            }
        );

        res.status(200).json({
            userDetails:{
                email:user.email,
                token:token,
                username:user.username,
            }
        });
    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again", err:err});
    }
}
module.exports = postRegister;