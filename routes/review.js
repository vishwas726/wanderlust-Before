const express = require("express")
const router = express.Router({ mergeParams: true })

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressErr = require("../utils/ExpressErr.js")
const { listingSchema, reviewSchema } = require("../schema.js")
const Listing = require("../models/listing")
const Review = require("../models/review")
let { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")

const reviewsController = require("../controllers/reviews.js")

// router.route("/")
//     .post(isLoggedIn, validateReview, wrapAsync(reviewsController.createReview))


// router.route("/:reviewId")
//     .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview))


//For add Review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.createReview))

//to delete Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview))

 module.exports = router;