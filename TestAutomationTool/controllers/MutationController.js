var express = require('express');

var MutationService = require('./../services/mutationService');

var routes = function (Mutode) {
    var mutationRouter = express.Router();

    mutationRouter.route('/')
        .get((req, res) => {
            Mutode.find(function (err, mutodes) {
                if (err) res.send(err)
                res.json(mutodes);
            });
        })
        .post((req, res) => {
            var mutationData = req.body;
            var mutode = {};
            mutode.repository = mutationData.repository;
            mutode.index = mutationData.index;
            mutode.mutators = [];
            if(mutationData.conditionalsBoundary.length>0) mutode.mutators.push(mutationData.conditionalsBoundary);
            if(mutationData.deletion.length>0) mutode.mutators.push(mutationData.deletion);
            if(mutationData.increments.length>0) mutode.mutators.push(mutationData.increments);
            if(mutationData.invertNegatives.length>0) mutode.mutators.push(mutationData.invertNegatives);
            if(mutationData.math.length>0) mutode.mutators.push(mutationData.math);
            if(mutationData.removeConditionals.length>0) mutode.mutators.push(mutationData.removeConditionals);
            if(mutationData.negateConditionals.length>0) mutode.mutators.push(mutationData.negateConditionals);
            if(mutationData.returnValues.length>0) mutode.mutators.push(mutationData.returnValues);
            if(mutationData.switchCases.length>0)  mutode.mutators.push(mutationData.switchCases);
            mutode.concurrency = mutationData.concurrency;

            if(mutode.mutators.length==0)
              res.status(500).send('Select at least one mutator');

            MutationService.ExecuteMutode(mutode)
            .then(() => res.status(200).send('ok'))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });

        });

    return mutationRouter;
};

module.exports = routes;
