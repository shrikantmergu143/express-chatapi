const FriendRequest = require('../../models/friendRequest');
const User = require('../../models/user');
const Message = require("../../models/message");
const usersPayload = require('../usersPayload');

const getFriendChatList = async (req, res) => {
    try {
        const userEmail = req?.user?.email;
        if (!userEmail) {
            return res.status(400).json({ error: "User email not provided." });
        }
        const pages = req.query.page || req.body.page;
        const Limit = req.query.limit || req.body.limit;
        // Parse query parameters for pagination and limit
        const page = parseInt(pages) || 1; // default to page 1
        const limit = parseInt(Limit) || 4; // default to 10 records per page
        const skip = (page - 1) * limit;

        const friendships = await FriendRequest.find({
            $or: [{ email_to: userEmail, status: 'accepted' }, { email_from: userEmail, status: 'accepted' }]
        })
            .skip(skip)
            .limit(limit);

        if (!friendships || friendships.length === 0) {
            return res.status(404).json({ error: "No friend requests found." });
        }

        const friendEmails = friendships.map(friendship =>
            friendship.email_to === userEmail ? friendship.email_from : friendship.email_to
        );

        const friendDetails = await User.find({ email: { $in: friendEmails } });

        const lastMessagePromises = friendships.map((friendship) => {
            // const lastMessage = await Message.findOne(
            //     {
            //         friend_id: friendship._id.toString() // Convert to string for comparison
            //     },
            //     {},
            //     { sort: { created_at: -1 } }
            // );
            const FriendEmail =  friendship.email_to === userEmail ? friendship.email_from : friendship.email_to;
            const details = friendDetails?.find((item)=>item?.email == FriendEmail);
            return { ...friendship?._doc, friend_id:friendship?._id, details:usersPayload(details) };
        });

        const lastMessages = lastMessagePromises;

        // Assuming total records in the collection
        const totalRecords = await FriendRequest.countDocuments({
            $or: [{ email_to: userEmail, status: 'accepted' }, { email_from: userEmail, status: 'accepted' }]
        });

        return res.status(200).json({
            data: lastMessages,
            page,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "An error occurred. Please try again." });
    }
};

module.exports = getFriendChatList;
