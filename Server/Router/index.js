const express = require('express')
const User = require('../Controller/User/index.js');

const {authenticateToken} = require("../Config/token");
const router = express.Router();

router.get("/getUsers", authenticateToken, new User().getUsers);
router.get("/getUser", authenticateToken, new User().getUser);
router.post("/login", new User().login);
router.post("/register", new User().register);

module.exports = router;