
if(process.env.NODE_ENV !="production"){

require('dotenv').config()

}

// console.log(process.env) 

const express = require("express")
const app = express();
const Listing = require("./models/listing")
const Review = require("./models/review")

const mongoose = require("mongoose")
const path = require("path")
var methodOverride = require('method-override')
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressErr = require("./utils/ExpressErr.js")
const { listingSchema, reviewSchema } = require("./schema.js")

//possport
const passport = require("passport")
const User = require("./models/user.js")
const LocalStrategy =require("passport-local")


const listingRouter = require("./routes/listing.js") //to require listingRouter routes
const reviewRouter = require("./routes/review.js") //to require reviewRouter routes
const userRouter = require("./routes/user.js") //to require userRouter routes



app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const ejsMate = require('ejs-mate')
app.engine('ejs', ejsMate);
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "public")))

//Show Toast Message
const flash = require("connect-flash")
app.use(flash())
const session = require("express-session")

const sessionOptions = {

    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {

        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions))  //Sesion 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connectoin to database
main().then(() => {
    console.log("Connected to db")
}).catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

//connectoin to server 
app.listen(3000, () => {

    console.log("Listening server")

})

app.get("/", (req, res) => {

    res.send("Working")
})


//Show Toast Messages
app.use((req, res, next) => {

    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")

    res.locals.currUser = req.user


    next()
})

//jaise hi /listing ko call jayegi waise hi ye /route/listing maise call karege jo bhi match  hoga
app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/" , userRouter)

////Demo Of Register 
// app.get("/demo", async (req, res) => {

//     const fakeuser = new User({

//         email: "v@gmail.co",
//         username: "vishwas766"

//     })

//     let reguser = await User.register(fakeuser, "pass123")
//     res.send(reguser)

// })



//page not found
app.all("*", (req, res, next) => {
    next(new ExpressErr(404, "Page Not Found------------"))
})

//for error
app.use((err, req, res, next) => {

    let { status = 500, message = "Some Error Occured" } = err
    // res.status(status).send(message)
    res.status(status).render("Error.ejs", { err })


})

