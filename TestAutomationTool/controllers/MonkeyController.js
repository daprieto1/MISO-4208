var express = require('express');
var MonkeyService = require('./../services/MonkeyService');


var routes = function () {
    var mokeyRouter = express.Router();

    mokeyRouter.route('/')
        .post((req, res) => {
            monkeyCommand = req.body.monkeyCommand;
            console.log(monkeyCommand);
            MonkeyService.execute(monkeyCommand)
            .then(() => res.status(200).send('OK'))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
        });

    return mokeyRouter;
};

module.exports = routes;