const fetch = require("node-fetch");
require('dotenv').config();
const api_key=process.env.API_KEY
// console.log(process.env.API_KEY);

let homepageController= {
    
    //When user first visits the homepage or come back
    //need to read database
    start:(req, res) => {
        
        
        res.render("index",{ movieName: null, resultMovieArr: null});
    },

    //When user search a movie
    update: async (req, res) => {
        

        const movieName =await req.body.movieName;
        // fetch api
        const data = await fetch(`http://www.omdbapi.com/?s=${movieName.toLowerCase()}&page=2&apikey=${api_key}` );
        const jsonData = await data.json();
        // console.log(jsonData["Search"].slice(0,Math.min(jsonData["Search"].length,3)));
        const resultMovieArr=await jsonData["Search"].slice(0,Math.min(jsonData["Search"].length,3));
        res.render("index", { movieName: movieName, resultMovieArr: resultMovieArr});
    },

    
}

module.exports = homepageController;