const Group = require("../../models/group");

const groupsList = async (req, res) => {
    try {
        const { page, pageSize } = req.body;
        const user_id = req?.user?.user_id;

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required in the request body" });
        }

        const totalRecords = await Group.countDocuments({ 'members.user': user_id });
        const userGroups = await Group.find({ 'members.user': user_id })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({
            data: userGroups,
            totalRecords,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize)
        });
    } catch (err) {
        return res.status(500).json({ error: "Error occurred, please try again", err });
    }
};

module.exports = groupsList;
