const getUserList = require("./getUserList");
const friendRequest = require("./sendFriendRequest");
const getFriendRequest = require("./getFriendRequest");
const getReceivedFriendRequests = require("./getReceivedFriendRequests");
const updateFriend = require("./updateFriendRequests");
const getAcceptedFriendDetails = require("./getAcceptedFriendDetails");
const getFriendDetailsById = require("./getFriendDetailsById");


exports.controllers = {
    getUserList,
    sendFriendRequest: friendRequest?.sendFriendRequest,
    setFriendRequest: friendRequest?.setFriendRequest,
    getFriendRequest,
    getReceivedFriendRequests,
    updateFriendRequests: updateFriend?.updateFriendRequests,
    getFriendAcceptDetails: updateFriend?.getFriendAcceptDetails,
    getFriendRequestList: updateFriend?.getFriendRequest,
    setStoreFriendRequest: updateFriend?.setFriendRequest,
    getFriendListAccepted: updateFriend?.getFriendListAccepted,
    getAcceptedFriendDetails,
    getFriendDetailsById,
}