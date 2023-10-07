const addGroup = require("./addGroup");
const groupsList = require("./groupsList");
const sendGroupMessage = require("./../messages/sendGroupMessage");
const getGroup = require("./getGroup");
const getMessage = require("./getMessage");


exports.controllers = {
    addGroup,
    groupsList,
    sendGroupMessage,
    getGroup,
    getMessage,
}