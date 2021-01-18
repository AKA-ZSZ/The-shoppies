const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");

const homepageController=require("./controllers/homepage_controller");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

//Case 1: user goes to main page
app.get("/", homepageController.start);

//Case 2: user search for a movie
app.post("/", homepageController.update);


app.listen(3000, () => {
    console.log("Our server is running on http://localhost:3000/ 🚀");
});

