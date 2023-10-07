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
const sendMessageSchema = Joi.object({
    message:Joi.string().required(),
    chat_type:Joi.string().required(),
    device_id:Joi.string().required(),
    message_type:Joi.string().required(),
    sender_name:Joi.string().required(),
})
router.post(App_url.AddGroup,  validator.body(groupValidation), auth, groupControllers.controllers.addGroup);
router.post(App_url.sendGroupMessage,  validator.body(sendMessageSchema), auth, groupControllers.controllers.sendGroupMessage);
router.get(App_url.GetGroupsList,  auth, groupControllers.controllers.groupsList);
router.get(App_url.getGroupDetails,  auth, groupControllers.controllers.getGroup);
router.get(App_url.getGroupMessage,  auth, groupControllers.controllers.getMessage);


module.exports = router;