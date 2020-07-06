var express = require('express');
var app = express();
const csv = require('csv-parser'); 
var fs = require("fs");

let recipes = []
let results = []
let ret = {}

app.get('/getrecipe', function (req, res, next) {
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
		results.slice(0,20).forEach((recipe, i) => {
			ret[i.toString()] =recipe[1]
		})
		res.end(JSON.stringify(ret))
	})
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})