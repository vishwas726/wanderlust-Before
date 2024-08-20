
let User = require("../models/user.js")


module.exports.renderSignUpForm=async (req, res) => {

    // res.send("form")
    res.render("users/signup.ejs")
}



module.exports.signUp=async (req, res) => {

    try {
        let { username, email, password } = req.body;

        let newUser = new User({ email, username })

        let registerUser = await User.register(newUser, password)
        console.log(registerUser)

        req.login(registerUser , (err)=>{

               if(err){
                return next(err)
               }

        })

        req.flash("success", "Welcome To WonderLust!!")
        res.redirect("/listings")
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }
}


module.exports.logout=(req, res, next) => {

    req.logout((err) => {

        if (err) {
            next(err)
        }
        req.flash("success", "You Are Succefully Logged Out")
        res.redirect("/listings")
    })

}


module.exports.renderLoginForm=async (req, res) => {

    // res.send("form")
    res.render("users/login.ejs")
}

module.exports.login=async (req, res) => {

    req.flash("success", "WellCome Back To WanderLust !! You Are Loged In ");
       
    let redirectUrl=res.locals.redirectUrl || "/listings";
       res.redirect(redirectUrl)

    // res.redirect("/listings")

}