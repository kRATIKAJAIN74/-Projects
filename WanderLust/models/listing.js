const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
   type: String,
   require: true
    } ,
    

    description: String,
    image:{
   type: String,
   set: (v)=> v=== "" ? "https://www.wallartprints.com.au/blog/nature-pictures/" 
   : v,
    },
    
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.export = Listing;