const FriendRequest = require('../../models/friendRequest');
const User = require('../../models/user');
const usersPayload = require('../usersPayload');

const setFriendRequest = async (req, res) => {
  try {
    const { friend_id, status } = req;

    // Validate input parameters
    if (!friend_id || !status) {
      return { error: 'Friend request ID and new status are required', status: 400, }
    }

    // Update the friend request status
    const updatedFriendRequest = await FriendRequest.findByIdAndUpdate(
      { _id: friend_id },
      { $set: { status: status } },
      { new: true }
    );

    if (!updatedFriendRequest) {
      return { error: 'Friend request not found', status: 400, }
    }

    return { data:updatedFriendRequest, status: 200 }
  } catch (error) {
    return { error: 'Error updating friend request status', errors: error, status: 500, }
  }
};
const getFriendRequest = async (req, res) => {
  const { page = 1, limit = 20, status } = req;
  try {
    const userEmail = req?.user?.email;
    const query = {
      $or: [{ email_to: userEmail }, { email_from: userEmail }]
    };
    if (status) {
      query.status = status;
    }
    const total_records = await FriendRequest.countDocuments(query);
    const friendRequests = await FriendRequest.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    if (!friendRequests || friendRequests.length === 0) {
      return { message: 'No friend requests found', status:400 };
    }
    const pagination = {
      total_records,
      limit: parseInt(limit),
      page: parseInt(page),
      total_pages: Math.ceil(total_records / limit),
    };
    // return res.status(200).json({ data: friendRequests, pagination });
    return { status: 200, data: { data: friendRequests, pagination } };

  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return { error: 'Error fetching friend requests', status:400 };
  }
};


const updateFriendRequests = async (req, res) => {
  const formData = req.body || req.query;
  const payload = {
    user: req?.user
  }
  if(formData?.friendRequestId){
    payload.friend_id = formData?.friendRequestId;
  }
  if(formData?.status){
    payload.status = formData?.status;
  }
  const response = await setFriendRequest(payload, res);
  res.status(response?.status).json(response);
};

const getFriendsRequestList = async (req, res) => {
  const formData = req.body || req.query;
  const payload = {
    user: req?.user
  }
  if(formData?.status){
    payload.status = formData?.status;
  }
  if(formData?.page){
    payload.page = formData?.page;
  }
  if(formData?.limit){
    payload.limit = formData?.limit;
  }
  const response = await getFriendRequest(payload, res);
  res.status(response?.status).json(response);
};

const getAcceptedFriendRequestsCount = async (userEmail) => {
  return await FriendRequest.countDocuments({
    $or: [
      { email_to: userEmail, status: 'accepted' },
      { email_from: userEmail, status: 'accepted' }
    ]
  });
};

const getAcceptedFriendRequests = async (userEmail, skip, limit) => {
  return await FriendRequest.find({
    $or: [
      { email_to: userEmail, status: 'accepted' },
      { email_from: userEmail, status: 'accepted' }
    ]
  })
  .skip(skip)
  .limit(limit);
};

const getFriendListAccepted = async (payload) => {
  try {
    const userEmail = payload?.user?.email;  // Assuming you can get the user's email from the request
    const { page, limit } = payload;

    const parsedPage = parseInt(page, 10) || 1;
    const parsedPageSize = parseInt(limit, 10) || 10;

    const skip = (parsedPage - 1) * parsedPageSize;

    // Find the total count of accepted friend requests
    const total_records = await getAcceptedFriendRequestsCount(userEmail);

    // Find accepted friend requests with pagination
    const friendRequests = await getAcceptedFriendRequests(userEmail, skip, parsedPageSize);

    if (!friendRequests || friendRequests.length === 0) {
      return { status: 404, message: 'No accepted friend requests found', total_records: total_records };
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
      const data = acceptedFriendDetails.find(user => user.email === id);
      return {
        ...item._doc,
        userDetails: usersPayload(data)
      };
    });

    return {
      status: 200,
      data: {
        data: acceptedId,
        page: parsedPage,
        limit: parsedPageSize,
        total_records: total_records
      }
    };
  } catch (error) {
    console.error('Error fetching accepted friend details:', error);
    return { status: 500, error: 'Error fetching accepted friend details' };
  }
};

const getFriendAcceptDetails = async (req, res) => {
  const formData = req.body || req.query;
  const payload = {
    user: req?.user,
    page: formData?.page,
    limit: formData?.limit
  };

  const response = await getFriendListAccepted(payload);
  res.status(response.status).json(response);
};

module.exports = {
  updateFriendRequests: updateFriendRequests,
  setFriendRequest: setFriendRequest,
  getFriendsRequestList: getFriendsRequestList,
  getFriendRequest: getFriendRequest,
  getFriendAcceptDetails: getFriendAcceptDetails,
  getFriendListAccepted: getFriendListAccepted
};
