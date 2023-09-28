const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

// const { validate } = require("uuid");
const usersControllers = require("../controllers/users/usersControllers");

const App_url = require("../constant/App_url");
const projectsSchema = Joi.object({
    email_to:Joi.string().email().required(),
})
router.get(App_url.get_users,  auth, usersControllers.controllers.getUserList);
router.post(App_url.send_request,  validator.body(projectsSchema), auth, usersControllers.controllers.sendFriendRequest);

module.exports = router;