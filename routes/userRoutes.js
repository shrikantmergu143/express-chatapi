const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const Joi = require("joi");
// const { validate } = require("uuid");
const validator = require("express-joi-validation").createValidator({});
const userControllers = require("./../controllers/user/userControllers");
const App_url = require("../constant/App_url");

const experienceSchema = Joi.object({
    company_name:Joi.string().required(),
    company_address:Joi.string().required(),
    company_role:Joi.string().required(),
    company_type:Joi.string().required(),
    start_date:Joi.string().required(),
    end_date:Joi.string().required(),
    company_current:Joi.boolean().required(),
    description:Joi.string(),
    skills:Joi.string(),
})

const projectsSchema = Joi.object({
    project_name:Joi.string().required(),
    project_link:Joi.string().required(),
    project_image:Joi.string().required(),
    technology:Joi.string(),
    description:Joi.string(),
    skills:Joi.string(),
})
const educationSchema = Joi.object({
    university:Joi.string().required(),
    college:Joi.string().required(),
    college_type:Joi.string().required(),
    state:Joi.string().required(),
    district:Joi.string().required(),
    education_name:Joi.string().required(),
    education_type:Joi.string().required(),
    education_degree:Joi.string().required(),
    education_department:Joi.string().required(),
    education_cource_type:Joi.string().required(),
    education_skill:Joi.string().required(),
    education_description:Joi.string().required(),
    education_start_date:Joi.string().required(),
    education_end_date:Joi.string().required(),
    is_parsing:Joi.string(),
    skills:Joi.string(),
})
router.get(App_url.get_user,  auth, userControllers.controllers.getUser);
router.post(App_url.upload,  auth, userControllers.controllers.uploadProfile);
router.post(App_url.update_user,  auth, userControllers.controllers.updateUser);
router.post(App_url.add_experience,  validator.body(experienceSchema), auth, userControllers.controllers.updateUser);
router.post(App_url.add_projects,  validator.body(projectsSchema), auth, userControllers.controllers.updateUser);
router.post(App_url.add_education,  validator.body(educationSchema), auth, userControllers.controllers.updateUser);

module.exports = router;