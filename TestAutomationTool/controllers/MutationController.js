var express = require('express');

var ExecutionService = require('./../services/mutationService');

var routes = function (Execution) {
    var mutationRouter = express.Router();

    mutationRouter.route('/')
        .get((req, res) => {
            Execution.find(function (err, executions) {
                if (err) res.send(err)
                res.json(executions);
            });
        }).post((req, res) => {
            console.log("test paula")
                // .then(testSuite => res.status(200).send(testSuite))
                // .catch(err => res.status(500).send(err));
        });
    // executionRouter.route('/:id')
    //     .get((req, res) => {
    //         var id = req.params.id;
    //         console.log(`ExecutionController getById start: id = ${id}`);
    //         ExecutionService.getById(id)
    //             .then(execution => res.send(execution))
    //             .catch(err => res.status(500).send(err));
    //     });

    return mutationRouter;
};

module.exports = routes;
