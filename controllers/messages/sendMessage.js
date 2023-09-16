const sendMessage = async (req, res)=>{
    try{
        return res.status(200).json({error:req.body});
    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = sendMessage;