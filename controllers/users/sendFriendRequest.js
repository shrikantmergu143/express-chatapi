const User = require("../../models/user");
const FriendRequest = require("../../models/friendRequest");

const sendFriendRequest = async (req, res) => {
  try {
    const user_id = req?.user?.user_id;
    const user = await User.findOne({ _id: user_id });
    const email_to = req?.body?.email_to;

    if (!user) {
      return res.status(403).json({ error: "Token expired" });
    }

    const payload = {
      email_to: email_to,
      email_from: user?.email,
      accepted_to: true,
      accepted_from: false,
      status: "pending",
      active: true,
      is_deleted: false,
    };

    const response = await FriendRequest.findOne({
      $or: [
        { email_to: email_to, email_from: user?.email },
        { email_from: email_to, email_to: user?.email },
      ],
    });

    if (response) {
      return res.status(400).json({ error: "A friend request exists between the two users." });
    }

    const createdFriendRequest = await FriendRequest.create(payload);

    if (!createdFriendRequest) {
      return res.status(400).json({ msg: 'Friend request inserted unsuccessfully' });
    }

    return res.status(200).json({ msg: 'Friend request inserted successfully', friend_id: createdFriendRequest._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error occurred, Please try again" });
  }
};

module.exports = sendFriendRequest;