const mongoose = require('mongoose');

function connectMongo(url){
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}


exports.connectMongo = connectMongo;