const express  = require("express");
const router  = express.Router();
const auth = require("../middleware/auth")
const listControllers = require("./../controllers/list/listControllers")

router.get("/colleges",  auth, listControllers.controllers.getColleges);


module.exports = router;