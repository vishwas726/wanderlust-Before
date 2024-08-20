const express = require("express")
const router = express.Router()

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressErr = require("../utils/ExpressErr.js")
const { listingSchema, reviewSchema } = require("../schema.js")
const Listing = require("../models/listing")
const Review = require("../models/review")

const listingsController = require("../controllers/listings.js")
const multer = require('multer')

const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

// const upload = multer({ dest: 'uploads/' })

//middleware
let { isLoggedIn, isOwner, validateListing } = require("../middleware.js")

router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn,  upload.single('listing[image]'),validateListing, wrapAsync(listingsController.createListing))
//  .post(upload.single('listing[image]'), (req,res)=>{

//         res.send(req.file)

//  })

router.route("/new")
    .get(isLoggedIn, listingsController.renderNewForm)


router.route("/:id")
    .patch(isLoggedIn, isOwner, wrapAsync(listingsController.updateListing))
    .get(wrapAsync(listingsController.showListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing))

router.route("/:id/edit")
    .get(isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm))


// router.get("/", wrapAsync(listingsController.index))

// router.get("/new", isLoggedIn, listingsController.renderNewForm)
// router.post("/", validateListing, wrapAsync(listingsController.createListing))

// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm))


// router.patch("/:id", isLoggedIn, isOwner, wrapAsync(listingsController.updateListing))


// router.get("/:id", wrapAsync(listingsController.showListing))


// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing))

module.exports = router;