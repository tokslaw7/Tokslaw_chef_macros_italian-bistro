// Import express
const express = require("express");

//Instantiate a new instance of express
const app = express(); 

//Create a new endpoint on the root route
app.get("/", function (request, response) {

// Send back to the client "Hello world"
response.send("Welcome to Chef Marco's Italian Bistro!").end();
});

//Tell the express app that you want it to listen on port 8080 of your computer
app.listen(4560, function () {

    //This function gets executed when the app starts listening
    console.log("Server is listening on 4560");
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
    res.json(menu);
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