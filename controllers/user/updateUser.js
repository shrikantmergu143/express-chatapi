const User = require("../../models/user");
const userPayload = require("../userPayload");

const updateDocument = async (id, payload) => {
    try {
      const updatedResult =
          await User.findByIdAndUpdate(
              { _id: id },
              {
                ...payload
              }
          );
      return updatedResult;
    } catch (error) {
      return false
    }
};
const updateUser = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id
        const user = await User.findOne({ _id:user_id});
        // return res.status(200).json({error:"Error occured, Please try again"});
        if(user){
            const payload = userPayload(req.body);
            const response = await updateDocument(user_id, payload)
            console.log("req.body", payload)
            if(response){
                return res.status(200).json({data:{userDetails:payload}});
            }else{
            return res.status(400).json({error:"update details failed"});
            }
        }
        return res.status(403).json({error:"Token expired"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = updateUser;