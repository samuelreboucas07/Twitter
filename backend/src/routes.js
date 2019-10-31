const express = require('express');
const routes = express.Router();

const tweetController = require("./controllers/TweetControler");
const likeController = require("./controllers/LikeControler");

routes.get('/tweets', tweetController.index);
routes.post('/tweets', tweetController.store);

routes.post('/likes/:id', likeController.store);

module.exports = routes;