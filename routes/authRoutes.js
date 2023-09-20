const express  = require("express");
const router  = express.Router();
const authControllers = require('../controllers/auth/authControllers')
const auth = require("../middleware/auth")
const Joi = require("joi");
// const { validate } = require("uuid");
const validator = require("express-joi-validation").createValidator({});
const App_url = require("../constant/App_url");

const registerSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().email().required(),
})

const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(100).required(),
})
router.post(App_url.register, validator.body(registerSchema), authControllers.controllers.postRegister);
router.post(App_url.login,  validator.body(loginSchema), authControllers.controllers.postLogin);
// router.post("/login",  validator.body(loginSchema), authControllers.controllers.postLogin);
// 
router.get("/test",  auth, (req, res)=>{
    console.log("req", req.user)
    res.status(200).json({error:"Demis"});
});

module.exports = router;