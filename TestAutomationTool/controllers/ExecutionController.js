var express = require('express');

var ExecutionService = require('./../services/ExecutionService');

var routes = function (Execution) {
    var executionRouter = express.Router();

    executionRouter.route('/')
        .get((req, res) => {
            Execution.find(function (err, executions) {
                if (err) res.send(err)
                res.json(executions);
            });
        });

    executionRouter.route('/:id')
        .get((req, res) => {
            var id = req.params.id;
            console.log(`ExecutionController getById start: id = ${id}`);
            ExecutionService.getById(id)
                .then(execution => res.send(execution))
                .catch(err => res.status(500).send(err));
        });

    return executionRouter;
};

module.exports = routes;