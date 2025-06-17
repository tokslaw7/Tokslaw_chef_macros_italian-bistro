// Import express
const express = require("express");
//Instantiate a new instance of express
const app = express(); 
const port = 4560;

app.use (express.json());

//Create a new endpoint on the root route
app.get("/", function (request, response) {

// Send back to the client "Hello world"
response.send("Welcome to Chef Marco's Italian Bistro!").end();
});


//Basic Menu
const menu = [
 {
   id: 1,
   dish: "Baked Shrimp Scampi",
   price: 20
 },
 {
   id: 2,
   dish: "Chicken Parmigiana",
   price: 14
 },
 {
   id: 3,
   dish: "Margherita Pizza",
   price: 17
 },
 {
   id: 4,
   dish: "Penne with Vodka Sauce",
   price: 18
 }
]


app.get("/menu", (req, res) => {
    const {price} = req.query;
    if (!price){
       res.json(menu); 
    }

//Convert parameters to number because params is String by Default
const priceInt = parseInt(price);    

const filteredPrices = menu.filter(menu => menu.price === priceInt);

if (filteredPrices.length === 0){
    return res.status(404).json({error: "There is no food at that price"});
}
    res.json(filteredPrices);
});


app.get("/menu/:menuItem", function(req, res){

    // Access the parameter value using req.params
    const menuItem = parseInt(req.params.menuItem);

    const eachItem = menu.find(menu => menu.id === menuItem);

    if (eachItem) {
        res.json(eachItem);
    }else {
        res.sendStatus(404).json({error: "Menu not found"});
    }
});

//A Not Implemented response 
//Implemented 
app.post("/reservations", (req,res) => {
    // res.status(501).json({error: "Route exists but isn't implemented yet"});
    const {name, date, time} = req.body;
    //console.log(req.body);
    if (!name || !date || !time){
        res.status(400).json({error: "Missing name, date,time"})
    }else{
        res.status(201).json({Congratulations:`${name}, thank you for reserving at Chef Marco's Restuarant on ${date} at ${time}! Your reservation is confirmed`});
    }
});


//Tell the express app that you want it to listen on port 8080 of your computer
app.listen(port, function () {
    //This function gets executed when the app starts listening
    console.log(`Server is running at http://localhost:${port}`);
});
