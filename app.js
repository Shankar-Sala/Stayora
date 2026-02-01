const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

// https://mongoosejs.com/
const MONGO_URL = "mongodb://127.0.0.1:27017/stayora";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hi, I am Root Page");
});

//index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", async (req, res) => {
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//create Route
app.post("/listings", async (req, res) => {
  // let {title, description, image, price, location, country } = req.body;
  let listing = req.body.listing;
  const newListing = new Listing(listing);
  await newListing.save();
  res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
 let deleteListings = await Listing.findByIdAndDelete(id)
 console.log(deleteListings);
 
  res.redirect(`/listings`);
});


// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("sucessful test");
// });

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
