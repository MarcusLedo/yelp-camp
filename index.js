"use strict";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __file = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__file);
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.send("I'm alive");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
