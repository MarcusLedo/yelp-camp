"use strict";
import mongoose, { get } from "mongoose";
import { cities } from "./cities.js";
import { firstNames, secondNames } from "./seedHelpers.js";
import { Campground } from "../models/campgroung.js";

main().catch((err) => console.log("Oh no! Error " + err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Mongo connected!");
  await seedDB();
  mongoose.connection.close();
}

async function seedDB() {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${getRandomName(firstNames)} ${getRandomName(secondNames)}`,
    });

    await camp.save();
  }
}

function getRandomName(names) {
  return names[Math.floor(Math.random() * names.length)];
}
