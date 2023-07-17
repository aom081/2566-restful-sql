const sql =require("./db.js");
//constructor

//Restaurant = name class
const restaurant = function (restaurant){
    //Atrributes
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.imageurl = restaurant.imageurl;
};

//Methods

restaurant.create = (newRestaurant, result) => {
    //INSERT INTO  restaurant SET name, type, imageurl VALUES () 
    sql.query("INSERT INTO  restaurant SET ?", newRestaurant, (err, res) =>{
        //there is an error
        if(err){
            console.log("err", err);
            result(err, null);
            return;
        }

        //no error
        console.log("successfully added information");
        result(null,{id:res.id, ...newRestaurant});
    });
}

restaurant.getAll = (result) => {
    //
    sql.query("SELECT * FROM restaurant", (err, res)=>{
        if (err) {
            console.log("err", err);
            result(err, null);
            return;
        }

        //no error
        console.log("get all restaurants");
        result(null,res);
    });
};


restaurant.getById = (restaurantId, result) =>{
    // SELECT * From restaurant WHERE id = restaurantId
    sql.query(`SELECT * From restaurant WHERE id = ${restaurantId}`,
        (err,res) => {
            //มี error
            if(err){
                console.log("err", err);
                result(err,null);
                return;
            }
            //found 1 
            console.log("get restaurant by id");
             if(res.length){
                result(null, res[0])
                return;
            }
            //not found
            result({kind: "not_found"}, null);
        }
    );

}

//update restaurant by id
restaurant.updateById =(id,restaurant, result) =>{
    //UPDATE `restaurant` SET "name","type","imageurl" WHERE id = "id"
    sql.query("UPDATE restaurant SET name = ?,type = ?,imageurl = ? WHERE id = ?",
    [restaurant.name, restaurant.type, restaurant.imageurl, id],
    (err, res) => {
        if(err){
            result(err,null)
            return;
        }
        if(res.affectedRows == 0){
            result({kind:"not_found"}, null)
            return;
        }
        //restaurant update
        result(null,{id: id,...restaurant})
    });
}


restaurant.deleteById =(id,result) =>{
    sql.query("DELETE FROM restaurant WHERE id = ?", id, (err, res)=>{
        if(err) {
            result(err,null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind:"not_found"},null);
        }

        console.log("restaurant id " + restaurant +" is daleted");
        result(null,res);
    });
}

module.exports = restaurant;