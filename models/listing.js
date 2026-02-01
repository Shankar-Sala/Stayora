const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXNsYW5kfGVufDB8fDB8fHww",
    // docs-> mongoose -> schema -> virtuals scroll below yo find set 
    set: (v) => (v === "" ? "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXNsYW5kfGVufDB8fDB8fHww" : v),
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
