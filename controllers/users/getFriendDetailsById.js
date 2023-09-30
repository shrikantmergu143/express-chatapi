const FriendRequest = require('../../models/friendRequest');
const User = require('../../models/user');
const usersPayload = require('../usersPayload');

const getFriendDetailsById = async (req, res) => {
  try {
    const friendId = req.params.friend_id;

    // Find the friend request by its ID
    const friendRequest = await FriendRequest.findById(friendId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Find user details for the friend
    const userDetails = await User.findOne({
      $or: [{ email: friendRequest.email_to }, { email: friendRequest.email_from }]
    });
    const payload = {
      ...friendRequest?._doc,
      userDetails:usersPayload(userDetails),
    }
    return res.status(200).json({ data:payload });
  } catch (error) {
    console.error('Error fetching friend details by ID:', error);
    return res.status(500).json({ error: 'Error fetching friend details by ID' });
  }
};

module.exports = getFriendDetailsById;
