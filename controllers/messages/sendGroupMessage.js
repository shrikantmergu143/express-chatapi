const Group = require('../../models/group');
const GroupMessage = require('../../models/groupMessage');
const groupMessagePayload = require('./../groupMessagePayload');

const sendGroupMessage = async (req, res) => {
    try {
        const { message, message_type, device_id, sender_name, chat_type } = req.body;
        const sender_id = req?.user?.user_id;
        const group_id = req?.params?.group_id;
        const Payload = {
            message,
            group_id,
            message_type,
            device_id,
            sender_id,
            sender_name,
            chat_type
        }
        const GroupSchema = await  Group?.findById(group_id);
        const memberPresent = GroupSchema?.members?.find((item)=>item?.user == sender_id);
        if(memberPresent){
            Payload.seen = [{user:sender_id, _id:sender_id}];
            Payload.delivered = [{user:sender_id, _id:sender_id}];
            const savedMessage = await GroupMessage.create(Payload);
            GroupSchema.last_message = groupMessagePayload(savedMessage);
            await GroupSchema.save();
            return res.status(200).json({ data: savedMessage, message:"Message sent successfully" });
        }else{
            return res.status(400).json({ error: 'You are not member in this group' });
        }
        // const savedGroupMessage = await groupMessage.save();
        return res.status(200).json({ data: Payload, GroupSchema, memberPresent:memberPresent });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
};

module.exports = sendGroupMessage;
