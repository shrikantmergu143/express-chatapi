const Message = require("../../models/message");

const getMessages = async (req, res) => {
    try {
        const friendId = req.params.friend_id; // Assuming the friend_id is passed as a parameter
        const dateTime = req.query.dateTime || req.body.dateTime ; // Assuming dateTime is the date and time for pagination

        let updatedAtQuery = {};
        // Validate and set optional updated_at query
        if (dateTime) {
            const parsedDateTime = new Date(dateTime);
            if (isNaN(parsedDateTime)) {
                return res.status(400).json({ error: 'Invalid date and time format for dateTime' });
            }
            updatedAtQuery = { updated_at: { $lt: parsedDateTime } }; // Update the query to use $lt correctly
        }

        const messages = await Message.find({
            friend_id: friendId,
            ...updatedAtQuery // Include the updatedAtQuery in the query
        })
        .sort({ updated_at: -1 }) // Sort by updated_at in descending order for oldest to newest messages
        .limit(5); // Limit the results to 5 messages per page

        const totalMessageCount = await Message.countDocuments({ friend_id: friendId });

        if (!messages || messages.length === 0) {
            return res.status(400).json({ message: 'No messages found for the given friend_id' });
        }
        const SortMessage = messages.reverse();
        res.status(200).json({ data: SortMessage, totalMessageCount });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "An error occurred. Please try again." });
    }
};

module.exports = getMessages;
