
const mongoose = require("mongoose")
const idata = require("./data.js")
const Listing = require("../models/listing.js")




main().then(() => {
    console.log("Connected to db")
}).catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');



}
const initDB = async () => {

    await Listing.deleteMany({})

    idata.data=idata.data.map((obj)=> ({...obj , owner : "66bccfd7ddef660e3b4631d5"}))

    await Listing.insertMany(idata.data)

    // let user= new Listing( {
    //     title: "Cozy Beachfront Cottage",
    //     description:
    //       "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    //     image:
          
    //  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        
    //     price: 1500,
    //     location: "Malibu",
    //     country: "United States",
    //   })
    // await user.save()


    console.log("Data is Initialised")
}
initDB()