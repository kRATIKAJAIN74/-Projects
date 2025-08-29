const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main()
.then(()=> {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
await mongoose.connect(MONGO_URL);
}



app.get("/", (req,res)=> {
    res.send("Hii, I am root.");
});

app.get("/testListing", (req,res)=> {
 let sampleListing = new Listing ({
    title: "My New Villa",
    descrition: "By the beach",
    price: 1200,
    location: "Calangute, Goa",
    country: "India"
 });
});


app.listen(8080, ()=> {
    console.log("Server is listening to port 8080.");
});