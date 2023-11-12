const express = require('express');
const mongoose = require('mongoose');

const shortUrl = require('./models/shortUrl');

const app = express();

mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

const PORT = process.env.PORT || 3000;

app.use(router);
router.use(express.urlencoded( {extended: false} ));
app.set('view engine', 'ejs');

router.get('/', async (req, res)=> {
    console.log("home route");
    const shortUrls = await shortUrl.find();
    console.log("######## shortUrls = ", shortUrls);
    res.render('index', {
        shortUrls: shortUrls,
        error: false
    });
});

router.post('/shortUrls', async (req, res) => {
    await shortUrl.create({full: req.body.fullUrl});
    res.redirect('/');
});


router.get('/:shortUrl', async (req, res) => {
    const getUrl = await shortUrl.findOne({
        short: req.params.shortUrl
    });
    if(getUrl == null || getUrl == undefined) return res.sendStatus(404);

    getUrl.clicks++;
    getUrl.save();
    res.redirect(getUrl.full);
});




// connection to express server

app.listen(PORT, (error)=> {
    if(!error){
        console.log("################# Express Connected");
        console.log("Server Listening on PORT: ", PORT);
    }
    else console.log("ERROR OCCURRED, Connection to Server Failed: ", error);
});
