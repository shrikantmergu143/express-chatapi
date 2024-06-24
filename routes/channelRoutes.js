const express  = require("express");
const router  = express.Router();
const ChannelController = require('../controllers/channels/ChannelController')
const auth = require("../middleware/auth")
const Joi = require("joi");
// const { validate } = require("uuid");
const validator = require("express-joi-validation").createValidator({});
const App_url = require("../constant/App_url");

const channelSchema = Joi.object({
    channel_name:Joi.string().required(),
    // created_by:Joi.string().required(),
})

router.post(App_url.addChannels, validator.body(channelSchema), auth, ChannelController.controllers.AddChannels);
router.get(App_url.getChannels, auth, ChannelController.controllers.GetChannels);
// router.post(App_url.login,  validator.body(loginSchema), ChannelController.controllers.postLogin);
// router.post("/login",  validator.body(loginSchema), ChannelController.controllers.postLogin);

module.exports = router;