var express = require('express');


var routes = function (Execution) {
    var executionRouter = express.Router();

    executionRouter.route('/')
        .get((req, res) => {
            Execution.find(function (err, executions) {
                if (err) res.send(err)
                res.json(executions);
            });
        });

    return executionRouter;
};

module.exports = routes;