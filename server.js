const express = require("express");
const cors = require("cors");
const PORT = 5000;
const restaurantRouter = require("./router/restaurant.router");

//create service
const app = express();


//user middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.send("<h1>This is a restaurant API</h1>");
});
//add router
app.use("/",restaurantRouter);

app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:"+PORT);
    return;
});