// public/core.js
var visualRegressionTesting = angular.module('visualRegressionTesting', []);

function mainController($scope, $http) {
    $scope.isExecuting = false;

    // when landing on the page, get all todos and show them
    $http.get('/api/execution')
        .success(function (data) {
            $scope.executions = data.map(item => parseExecution(item));
            console.log($scope.executions);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.execute = () => {
        $scope.isExecuting = true;
        $http.post('/api/execution', {})
            .success(function (data) {
                $scope.isExecuting = false;
                $scope.executions.push(parseExecution(data));
            })
            .error(function (data) {
                $scope.isExecuting = false;
                console.log('Error: ' + data);
            });
    };

    function parseExecution(execution) {
        execution.beforeImgUri = execution.beforeImgUri.replace('public/', '');
        execution.afterImgUri = execution.afterImgUri.replace('public/', '');
        execution.comparationImgUri = execution.comparationImgUri.replace('public/', '');
        execution.insertionDate = (new Date(execution.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
        return execution;
    }

}
