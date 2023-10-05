const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const Joi = require("joi");
// const { validate } = require("uuid");
const validator = require("express-joi-validation").createValidator({});
const messagesControllers = require("./../controllers/messages/messagesControllers")
const App_url = require("../constant/App_url");


const sendMessageSchema = Joi.object({
    message:Joi.string().required(),
    chat_type:Joi.string().required(),
    device_id:Joi.string().required(),
    message_type:Joi.string().required(),
    sender_name:Joi.string().required(),
    to_id:Joi.string().required(),
})
router.post(App_url.send_message,  validator.body(sendMessageSchema), auth, messagesControllers.controllers.sendMessage);
router.get(App_url.get_message, auth, messagesControllers.controllers.getMessages);
router.get(App_url.friend_chat, auth, messagesControllers.controllers.getFriendChatList);

module.exports = router;