const Message = require("../../models/message");
const friendRequest = require("../../models/friendRequest");
const messagePayload = require("../messagePayload");

const sendMessage = async (req, res) => {
    try {
        const payload = {
            seen: false,
            delivered: false,
            is_deleted: [],
        };

        // Extract request body properties and assign them to the payload
        const {
            message,
            to_id,
            message_type,
            chat_type,
            device_id,
            sender_name,
        } = req.body;

        if (message) payload.message = message;
        if (to_id) payload.to_id = to_id;
        if (message_type) payload.message_type = message_type;
        if (chat_type) payload.chat_type = chat_type;
        if (device_id) payload.device_id = device_id;
        if (sender_name) payload.sender_name = sender_name;

        // Assign friend_id from params if available
        if (req.params.friend_id) payload.friend_id = req.params.friend_id;

        // Assign from_id from user if available
        if (req.user) payload.from_id = req.user.user_id;
        const FriendData = await  friendRequest?.findById(payload.friend_id);
        if(FriendData?.status === "accepted"){
            const savedMessage = await Message.create(payload);
            FriendData.last_message = messagePayload(savedMessage);
            await FriendData.save();
            return res.status(200).json({ data: savedMessage });
        }else{
            return res.status(400).json({ error: "You can`t send message your friend request is not " });
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "An error occurred. Please try again." });
    }
};

module.exports = sendMessage;
