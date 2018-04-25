var express = require('express');

var MdroidService = require('../services/MdroidService')

var routes = function (MdroidExecution) {
    var executionRouter = express.Router();

    executionRouter.route('/')
        .get((req, res) => {
            MdroidExecution.find(function (err, execution) {
                if (err) res.send(err)
                res.json(execution);
            });
        })
        .post((req, res) => {
            MdroidService.create(req.body)
                .then(mdroidExecution => res.status(200).send(mdroidExecution))
                .catch(err => res.status(500).send(err));
        });

    executionRouter.route('/:meId/codeline/:mId')
        .get((req, res) => {
            MdroidService.codeline(req.params.meId, req.params.mId)
                .then(result => res.status(200).send(result))
                .catch(err => res.status(500).send(err));
        })

    return executionRouter;
};

module.exports = routes;