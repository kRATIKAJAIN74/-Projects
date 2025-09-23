const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const flash = require("connect-flash");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.get("/signup", userController.renderSignup )

router.post("/signup", wrapAsync(userController.signupUser));

router.get("/login", userController.renderLogin);

router.post("/login",saveRedirectUrl,
     passport.authenticate("local",
         {failureRedirect: '/login', 
            failureFlash: true }),
        userController.signinUser);

router.get("/logout", userController.logout);

module.exports = router;