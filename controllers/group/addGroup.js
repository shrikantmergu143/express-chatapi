const GroupSchema = require("../../models/group");

const addGroup = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id;
        const data = req?.body;
        const MembersList = req?.body?.members;
        const MemberData = [{
            _id:user_id,
            user:user_id,
            role:"admin",
            is_removed:false
        }]
        MembersList?.map((item)=>{
            MemberData.push({
                _id:item,
                user:item,
                role:"user",
                is_removed:false
            })
        })
        const payload = {
            create_by:user_id,
            members:MemberData,
            name:data?.name,
            description:data?.description,
        }
        const GroupCollection = await GroupSchema.create(payload);
        if(GroupCollection){
            return res.status(200).json({data:GroupCollection, message:"Group created successfully"});
        }
        return res.status(403).json({error:"Error occured, Please try again"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again", err});
    }
} 
module.exports = addGroup; 