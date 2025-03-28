"use strict";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import { Campground } from "./models/campgroung.js";

const __file = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__file);
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campground/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campground/new");
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  res.render("campground/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  res.render("campground/edit", { campground });
});

app.post("/campgrounds", async (req, res) => {
  const campParams = req.body.campground;
  const campground = new Campground(campParams);

  await campground.save();
  res.redirect("/campgrounds/" + campground._id);
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect("/campgrounds/" + campground._id);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);

  res.redirect("/campgrounds");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

main().catch((err) => console.log("Oh no! Error " + err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Mongo connected!");
}
