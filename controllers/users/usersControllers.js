const getUserList = require("./getUserList");
const sendFriendRequest = require("./sendFriendRequest");
const getFriendRequest = require("./getFriendRequest");
const getReceivedFriendRequests = require("./getReceivedFriendRequests");
const updateFriendRequests = require("./updateFriendRequests");


exports.controllers = {
    getUserList,
    sendFriendRequest,
    getFriendRequest,
    getReceivedFriendRequests,
    updateFriendRequests,
}