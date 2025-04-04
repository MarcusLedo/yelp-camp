"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
});

const Campground = mongoose.model("Campground", CampgroundSchema);

export { Campground };
