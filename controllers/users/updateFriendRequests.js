const FriendRequest = require('../../models/friendRequest');

const updateFriendRequests = async (req, res) => {
  try {
    const { friendRequestId, status } = req.body;

    // Validate input parameters
    if (!friendRequestId || !status) {
      return res.status(400).json({ error: 'Friend request ID and new status are required' });
    }

    // Update the friend request status
    const updatedFriendRequest = await FriendRequest.findByIdAndUpdate(
      { _id: friendRequestId },
      { $set: { status: status } },
      { new: true }
    );

    if (!updatedFriendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    return res.status(200).json({ data:updatedFriendRequest });
  } catch (error) {
    console.error('Error updating friend request status:', error);
    return res.status(500).json({ error: 'Error updating friend request status' });
  }
};

module.exports = updateFriendRequests;
