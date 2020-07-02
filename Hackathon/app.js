//header
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine

app.set('view engine', 'hbs');
//Sets handlebars configurations 
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs'
    }));

//config
dotenv.config();
//Enabling port to listen
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Port running and listening on port number:${port}`);
});
//routes
const postRoutes=require("./routes");
//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/",postRoutes);
app.use(express.static('public'))

