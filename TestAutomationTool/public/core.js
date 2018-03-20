// public/core.js
angular.module('automationTestingTool', ['ui.bootstrap'])
    .controller('mainController', function ($scope, $http) {
        $http.get('/api/testsuite')
            .then(response => {
                $scope.testSuites = response.data;                
            }, err => console.log(err));

        $http.get('/api/execution')
            .then(response => {
                $scope.executions = response.data;                
            }, err => console.log(err));

    });
