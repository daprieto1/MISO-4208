var express = require('express');
var MonkeyService = require('./../services/MonkeyService');


var routes = function (Monkey) {
    var mokeyRouter = express.Router();

    mokeyRouter.route('/')
        .get((req, res) => {
            Monkey.find(function (err, monkeys) {
                if (err) res.send(err)
                res.json(monkeys);
            });
        })
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

    mokeyRouter.route('/:id')
    .get((req, res) => {
        var id = req.params.id;
        console.log(`file = ${id}`);
        res.sendfile(MonkeyService.pathFile(id));
    });

    return mokeyRouter;
};

module.exports = routes;