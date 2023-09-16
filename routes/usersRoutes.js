const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const Joi = require("joi");
// const { validate } = require("uuid");
const usersControllers = require("../controllers/users/usersControllers");

const App_url = require("../constant/App_url");

router.get(App_url.get_users,  auth, usersControllers.controllers.getUserList);

module.exports = router;