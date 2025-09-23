const Listing =  require("../models/listing");

module.exports.index = async (req, res)=> {
      const allListings = await Listing.find({});
      res.render("listings/index.ejs", {allListings});
    }

    module.exports.renderNewForm = (req, res)=> {
    res.render("./listings/new.ejs");
    }

    module.exports.showListing = async(req, res)=> {
        let {id} = req.params;
        const listing = await Listing.findById(id).populate("reviews").populate("owner");
        if(!listing){
          req.flash("error", "Listing you requested does not exist.");
          res.redirect("/listings");
        }
        console.log(listing);
        res.render("./listings/show.ejs", {listing});
    }

    module.exports.postListing = async (req, res, next)=> {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
       
    }

    module.exports.editListing = async(req,res)=> {
            let {id} = req.params;
            const listing = await Listing.findById(id);
            if(!listing){
              req.flash("error", "Listing you requested does not exist.");
             return res.redirect("/listings");
            }
            res.render("./listings/edit.ejs", {listing});
        }

        module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    // If image field is missing or empty, preserve the old image object
    if (!req.body.listing.image || req.body.listing.image === "") {
      req.body.listing.image = listing.image;
    } else if (typeof req.body.listing.image === "string") {
      // If only URL is provided, update just the url property
      req.body.listing.image = {
        ...listing.image,
        url: req.body.listing.image
      };
    }

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", " Listing Updated.");
    res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing = async (req,res)=> {
      let {id} = req.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
    req.flash("success", " Listing Deleted");
   res.redirect("/listings");
    }