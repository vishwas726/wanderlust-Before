
const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.createReview=async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id)
    // console.log(listing)

    let rev = new Review(req.body.review);
    rev.author=req.user._id; //To store Author Of Review
    listing.reviews.push(rev)
    await rev.save()
    await listing.save();
    req.flash("success" , "Review Added Succefully")

    res.redirect(`/listings/${id}`)
}

module.exports.destroyReview=async (req, res) => {

    let { id, reviewId } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

    await Review.findByIdAndDelete(reviewId);

    req.flash("success" , "Review Deleted Succefully")

   return res.redirect(`/listings/${id}`)


}