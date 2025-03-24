"use strict";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { Campground } from "./models/campgroung.js";

const __file = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__file);
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campground/index", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  res.render("campground/show", { campground });
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    description: "cheap camping!",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

main().catch((err) => console.log("Oh no! Error " + err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Mongo connected!");
}
