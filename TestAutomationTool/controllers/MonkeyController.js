var express = require('express');
var MonkeyService = require('./../services/MonkeyService');


var routes = function () {
    var mokeyRouter = express.Router();

    mokeyRouter.route('/')
        .post((req, res) => {
            monkeyCommand = req.body.monkeyCommand;
            console.log(monkeyCommand);
            MonkeyService.execute(monkeyCommand);
            res.status(200).send('OK');
        });

    return mokeyRouter;
};

module.exports = routes;