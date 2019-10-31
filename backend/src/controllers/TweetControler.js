const Tweet = require("../models/Tweet");


module.exports = {
    // Recebe os Tweets por ordem de data, o mais atual sempre fica acima
    async index(req, res){
        const tweets = await Tweet.find({}).sort("-createdAt");
        return res.json(tweets);
    },

    async store(req, res){
        const tweet = await Tweet.create(req.body);
        // Avisar a todo mundo conectado que ouve mudança na aplicação, quando um tweet for criado.
        req.io.emit('tweet', tweet);
        return res.json(tweet);
    }
};