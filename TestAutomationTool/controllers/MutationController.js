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
            var repositorio = req.body.repository;
            var version = req.body.versionPrueba;
            console.log("test paula");
            console.log(repositorio);    
            console.log(version);
            res.status(200).send('OK');
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
