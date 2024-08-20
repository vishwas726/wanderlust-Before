const Listing = require("./models/listing");
const ExpressErr = require("./utils/ExpressErr.js")
const { listingSchema, reviewSchema } = require("./schema.js")
const Review = require("./models/review")



//to validate listings
module.exports.validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        //  console.log(error) 
        throw new ExpressErr(400, errMsg);
    } else {

        next();
    }
}


//to validate review
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        //  console.log(error) 
        throw new ExpressErr(400, errMsg);
    } else {

        next();
    }
}
module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {

        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "You Must Logged In To Create Listing");
        return res.redirect("/login")

    }
    next()

}




module.exports.saveredirectUrl = (req, res, next) => {

    if (req.session.redirectUrl) {

        res.locals.redirectUrl = req.session.redirectUrl;
    }


    next()


}


module.exports.isOwner = async (req, res, next) => {


    let { id } = req.params;

    let listing = await Listing.findById(id);


    if (!listing.owner._id.equals(res.locals.currUser._id)) {

        req.flash("error", "You Don't Have Permision")

        return res.redirect(`/listings/${id}`);

    }

    next()


}


module.exports.isReviewAuthor = async (req, res, next) => {


    let { id, reviewId } = req.params;

    let review = await Review.findById(reviewId);


    if (!review.author._id.equals(res.locals.currUser._id)) {

        req.flash("error", "You Are Not Author Of This Review")

        return res.redirect(`/listings/${id}`);

    }

    next()


}
