const express = require("express");
const router = express.Router();
const restaurant =require("../models/restaurant.modle");

//insert restaurant to database
router.post("/restaurants014", (req,res)=>{
    const newRestaurant = new restaurant({
        name: req.body.name,
        type: req.body.type,
        imageurl: req.body.imageurl
    })

    //Insert to DB
    //http://localhost:5000
    restaurant.create(newRestaurant, (err, data) =>{
        if (err) {
            res.status(500).send({
                message: err.message || "ERrOr"
            })
        }else{

        }
    })
})



router.get("/restaurants014", (req,res)=>{
    restaurant.getAll((err,data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || "ERrOr"
            })
        } else {
            res.send(data);
        }
    })
});

//Get restaurant by id http://localhost:5000/restaurants014/2
router.get("/restaurants014/:id", (req,res) => {
    //Number.parseInt เปลี่น text เป็น int
    const restaurantId =Number.parseInt(req.params.id);
    restaurant.getById(restaurantId,(err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: "Restaurant not found with this id" + restaurantId
                })
            } else {
                res.status(500).send({
                    message: err.message || "ERrOr"
                });
            }
        }else{
            res.send(data)
        }       
    })
});




router.put("/restaurants014/:id", (req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            message:"Attributes can't be empty!"
        })
    }
    restaurant.updateById(restaurantId, new restaurant(req.body), (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: "Restaurant not found with this id" + restaurantId
                })
            } else {
                res.status(500).send({
                    message: err.message || "ERrOr"
                });
            }
        } else {
            res.send(data)
        }
    })
})



router.delete("/restaurants014/:id", (req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    restaurant.deleteById(restaurantId, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: "Restaurant not found with this id" + restaurantId
                })
            } else {
                res.status(500).send({
                    message: err.message || "ERrOr"
                });
            }
        } else {
            res.send({
                message: "Restaurant id:" +restaurantId +"is deleted"
            })
        } 
    })
})

module.exports =router;