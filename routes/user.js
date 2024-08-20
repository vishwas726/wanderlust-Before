const express = require("express")
const router = express.Router()

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressErr = require("../utils/ExpressErr.js")

let User = require("../models/user.js")
const passport = require("passport")
const { saveredirectUrl } = require("../middleware.js")
const usersController = require("../controllers/users.js")



router.route("/signup")
    .get(usersController.renderSignUpForm)
    .post(wrapAsync(usersController.signUp))



router.route("/login")

    .get(usersController.renderLoginForm)
    .post(saveredirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        wrapAsync(usersController.login))
        
//Logout
router.get("/logout", usersController.logout)
// //SignUp
// router.get("/signup", usersController.renderSignUpForm)

// router.post("/signup", wrapAsync(usersController.signUp))




// //Login

// router.get("/login", usersController.renderLoginForm)

// router.post("/login", saveredirectUrl,
//     passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(usersController.login))

module.exports = router;
