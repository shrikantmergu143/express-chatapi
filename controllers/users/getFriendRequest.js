const FriendRequest = require('../../models/friendRequest');

const getFriendRequest = async (req, res) => {
  try {
    const userEmail = req?.user?.email;  // Assuming you can get the user's email from the request
    const { status } = req.query;

    const query = {
      $or: [{ email_to: userEmail }, { email_from: userEmail }]
    };

    if (status) {
      query.status = status;
    }
    if (req?.body?.status) {
      query.status = req?.body?.status;
    }

    const friendRequests = await FriendRequest.find(query);

    if (!friendRequests || friendRequests.length === 0) {
      return res.status(400).json({ message: 'No friend requests found' });
    }

    return res.status(200).json({ friendRequests });
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return res.status(500).json({ error: 'Error fetching friend requests' });
  }
};

module.exports = getFriendRequest;
