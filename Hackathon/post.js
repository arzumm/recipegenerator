//header
const assert=require('assert');
const mongo=require('mongodb');
const mongoose=require("mongoose");
const app=require("./app");
var path = require('path');
var clientt=require('mongodb').MongoClient;
const csv = require('csv-parser'); 
const fs = require('fs'); 
let recipes = []
let results = []
//just an example to get Search.html
exports.getPosts=(req,res)=>{
    res.sendFile(path.join(__dirname + '/Search.html'));
}
//Just battery temp example
exports.getbattery=(req,res,next)=>{
mongoose.connect(process.env.Mongo_Uri,{useUnifiedTopology: true},function(err,db){
assert.equal(null,err);
var query = { parameter_id: "116" };
  cursor=db.collection('Csample').find(query)
  .toArray(function(err, result) {
    if (err) throw err;
    res.json({
          result
        });
  });;
});
};

//Api to get recipe
exports.getrecipe=(req,res,next)=>{
  let ingredients = req.query.ingredients; 
  console.log(ingredients)
  ingredients = ingredients.split(","); 

  fs.createReadStream('data/recipes.csv')
    .pipe(csv())
    .on('data', (row) => {
        recipes.push(row)
    })
    .on('end', () => {
        console.log('CSV file successfully processed'); 
        recipes.forEach((r) => {
            count = 0
            ingredients.forEach((i) => { 
                if (r.ingredients.includes(i.trim())) { 
                    count++
                    results.push([count, r])
                }
            })
        })
        results.sort(function(a,b){ 
            return b[0] - a[0];
        })
        res.send(results.slice(0,10))
    })
}
