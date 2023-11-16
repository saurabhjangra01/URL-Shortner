const shortUrl = require('./../models/shortUrl');


const getAllUrls = async (req, res)=> {
    try {
        const shortUrls = await shortUrl.find();
        res.render('index', {
            shortUrls: shortUrls,
            error: false
        });    
    }
    catch (error) {
        res.render('index', {
            shortUrls: [],
            error: error
        });
    }
}

const createUrl = async (req, res) => {
    try {
        await shortUrl.create({full: req.body.fullUrl});
        res.redirect('/');    
    }
    catch (error) {
        res.status(500).send("Something Went Wrong");
    }
}

const getUrl = async (req, res) => {
    try {
        const getUrl = await shortUrl.findOne({
            short: req.params.shortUrl
        });
        if(getUrl == null || getUrl == undefined) return res.sendStatus(404);
        
        getUrl.clicks++;
        getUrl.save();
        res.redirect(getUrl.full);
    }
    catch (error) {
        res.status(404).send("This page does not exist");
    }
}

module.exports = {
    getAllUrls,
    createUrl,
    getUrl
}