// public/core.js
angular.module('automationTestingTool', ['ui.bootstrap'])
    .controller('mainController', function ($scope, $http) {
        $http.get('/api/testsuite')
            .then(response => {
                $scope.testSuites = response.data;
                console.log($scope.testSuites);
            }, err => console.log(err));

    });
