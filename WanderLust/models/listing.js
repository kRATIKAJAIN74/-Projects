const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
   type: String,
   required: true
    } ,
    

    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://www.wallartprints.com.au/blog/nature-pictures/",
            set: (v) => v === "" ? "https://www.wallartprints.com.au/blog/nature-pictures/" : v
        }
//     image:{
//         filename: String,
//         url: String
   
// //    default:
// //     "https://www.wallartprints.com.au/blog/nature-pictures/" ,
//    set: (v)=> v=== "" ? "https://www.wallartprints.com.au/blog/nature-pictures/" 
//    : v,
    },
    
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;