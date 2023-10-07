const Group = require("../../models/group");
const User = require("../../models/user");
const usersPayload = require("./../usersPayload")
const getGroup = async (req, res) => {
    try {
        const group_id = req?.params?.group_id;
        const user_id = req?.user?.user_id;

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required in the request body" });
        }

        const GroupDetails = await Group.findById(group_id);
        const memberPresent = GroupDetails?.members?.find((item)=>item?.user == user_id);
        // return res.status(400).json({ error: 'You are not member in this group', GroupDetails, members:GroupDetails?.members });
        if(memberPresent){
            const memberId = GroupDetails?.members?.map((item)=>item?.user);
            // Find user details for the accepted friends
            const acceptedFriendDetails = await User.find({
                _id: { $in: memberId }
            });
            const UserDetails = acceptedFriendDetails?.map((item)=>{
                return usersPayload(item);
            });
            const Details = {
                ...GroupDetails?._doc,
                usersDetails:UserDetails
            }
            return res.status(200).json({ data: Details});
        }else{
            return res.status(400).json({ error: 'You are not member in this group' });
        }
    } catch (err) {
        return res.status(500).json({ error: "Error occurred, please try again", err });
    }
};

module.exports = getGroup;
