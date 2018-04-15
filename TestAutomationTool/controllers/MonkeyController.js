var express = require('express');


var routes = function () {
    var mokeyRouter = express.Router();

    mokeyRouter.route('/')
        .post((req, res) => {
            monkeyCommand = req.body.monkeyCommand;
            console.log(monkeyCommand);
            res.status(200).send('OK');
        });

    return mokeyRouter;
};

module.exports = routes;