const User = require("../../models/user");
const userPayload = require("../userPayload");

const updateDocument = async (id, payload) => {
    try {
        const options = { returnNewDocument: true };
      const updatedResult =
          await User.findByIdAndUpdate(
              { _id: id },
              {
                ...payload
              },
              options
          );
      return updatedResult;
    } catch (error) {
      return false
    }
};
const updateEducation = async (req, res)=>{
    try{

        return res.status(200).json({error:"Token expired"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = updateEducation;