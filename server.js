const express = require('express');
const app = express();

const mongoLib = require('./db/connect');
const notFound = require('./middlewares/not-found');
const urls = require('./routes/router-urls');

require('dotenv').config();

app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded( {extended: false} ));

// routes
app.use('/', urls);

app.use(notFound);


// connect to server
const port = process.env.PORT || 3000;

(async function () {
    try{
        // initialize database connections
        db = await mongoLib.connectMongo(process.env.MONGO_URI);
        console.log("######################  Mongo connected  ######################");

        // initialize express server
        app.listen(port, ()=> {
            console.log("######################  Express connected  ######################");
            console.log("Server Listening on PORT ", port, "...");
        });
    }
    catch(err){
        console.log("error connecting to the server ############ ", err);
    }
})();