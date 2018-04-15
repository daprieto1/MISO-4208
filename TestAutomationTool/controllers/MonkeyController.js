var express = require('express');


var routes = function () {
    var mokeyRouter = express.Router();

    mokeyRouter.route('/')
        .post((req, res) => {
            monkeyCommand = req.monkeyCommand;
            console.log(monkeyCommand);
        });

    return mokeyRouter;
};

module.exports = routes;