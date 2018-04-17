var express = require('express');

var MutationService = require('./../services/mutationService');

var routes = function (Execution) {
    var mutationRouter = express.Router();

    mutationRouter.route('/')
        .get((req, res) => {
            Execution.find(function (err, executions) {
                if (err) res.send(err)
                res.json(executions);
            });
        })
        .post((req, res) => {
            var mutationData = req.body;
            MutationService.ExecuteMutode(mutationData)
            .then(() => res.status(200).send('ok'))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

        });

    return mutationRouter;
};

module.exports = routes;
