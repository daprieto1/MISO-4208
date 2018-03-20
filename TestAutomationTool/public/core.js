// public/core.js
angular.module('automationTestingTool', ['ui.bootstrap'])
    .controller('mainController', function ($scope, $http) {
        $http.get('/api/testsuite')
            .then(response => {
                $scope.testSuites = response.data;
            }, err => console.log(err));

        $http.get('/api/execution')
            .then(response => {
                $scope.executions = response.data.map(execution => parseExecution(execution));
            }, err => console.log(err));

        $scope.selectedExecution = undefined;

        $scope.selectExecution = (execution) => {
            $scope.selectedExecution = execution;
            $http.get(`/api/execution/${execution._id}`)
                .then(response => {
                    $scope.selectedExecution = parseExecution(response.data);
                    var myDoughnutChart = new Chart('success-vs-failures-chart', {
                        type: 'doughnut',
                        data: {
                            labels: ["Success", "Fail"],
                            datasets: [{
                                data: [10, 20],
                                backgroundColor: [
                                    '#dff0d8',
                                    '#f2dede'
                                ]
                            }]
                        }
                    });
                }, err => console.log(err));
        }

        function parseExecution(execution) {
            execution.failures = parseInt(execution.failures);
            execution.timestamp = (new Date(execution.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
            return execution;
        }

    });
