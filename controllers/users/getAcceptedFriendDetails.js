const FriendRequest = require('../../models/friendRequest');
const User = require('../../models/user');
const usersPayload = require('../usersPayload');

const getAcceptedFriendDetails = async (req, res) => {
  try {
    const userEmail = req?.user?.email;  // Assuming you can get the user's email from the request
    const { page, pageSize } = req.query;

    const parsedPage = parseInt(page, 10) || 1;
    const parsedPageSize = parseInt(pageSize, 10) || 10;

    const skip = (parsedPage - 1) * parsedPageSize;

    // Find the total count of accepted friend requests
    const totalRecordsCount = await FriendRequest.countDocuments({
      $or: [
        { email_to: userEmail, status: 'accepted' },
        { email_from: userEmail, status: 'accepted' }
      ]
    });

    // Find accepted friend requests with pagination
    const friendRequests = await FriendRequest.find({
      $or: [
        { email_to: userEmail, status: 'accepted' },
        { email_from: userEmail, status: 'accepted' }
      ]
    })
    .skip(skip)
    .limit(parsedPageSize);

    if (!friendRequests || friendRequests.length === 0) {
      return res.status(404).json({ message: 'No accepted friend requests found', totalRecords: totalRecordsCount });
    }

    const acceptedFriendEmails = friendRequests.map(request => {
      return request.email_to === userEmail ? request.email_from : request.email_to;
    });

    // Find user details for the accepted friends
    const acceptedFriendDetails = await User.find({
      email: { $in: acceptedFriendEmails }
    });

    const acceptedId = friendRequests.map(item => {
      const id = item.email_to === userEmail ? item.email_from : item.email_to;
      const data = acceptedFriendDetails?.find((item)=>item?.email === id);
      return {
        ...item._doc,
        userDetails:usersPayload(data)
      };
    });

    return res.status(200).json({
      data:acceptedId,
      page: parsedPage,
      pageSize: parsedPageSize,
      totalRecords: totalRecordsCount
    });
  } catch (error) {
    console.error('Error fetching accepted friend details:', error);
    return res.status(500).json({ error: 'Error fetching accepted friend details' });
  }
};

module.exports = getAcceptedFriendDetails;
