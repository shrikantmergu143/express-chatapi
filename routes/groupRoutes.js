const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

// const { validate } = require("uuid");
const groupControllers = require("../controllers/group/groupControllers");

const App_url = require("../constant/App_url");
const groupValidation = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    members:Joi.array().required(),
})
// router.get(App_url.get_users,  auth, usersControllers.controllers.getUserList);
router.post(App_url.AddGroup,  validator.body(groupValidation), auth, groupControllers.controllers.addGroup);
router.get(App_url.GetGroupsList,  auth, groupControllers.controllers.groupsList);
// router.get(App_url.ReceivedFriendRequests,  auth, usersControllers.controllers.getReceivedFriendRequests);
// router.put(App_url.FriendRequestUpdate,  auth, usersControllers.controllers.updateFriendRequests);
// router.get(App_url.acceptedFriends,  auth, usersControllers.controllers.getAcceptedFriendDetails);
// router.get(App_url.get_details,  auth, usersControllers.controllers.getFriendDetailsById);

module.exports = router;