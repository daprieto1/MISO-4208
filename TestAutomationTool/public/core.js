// public/core.js
angular.module('automationTestingTool', ['ui.bootstrap'])
    .controller('mainController', function ($scope, $http) {
        $scope.androidRandomTest = {
            seed: {
                command: '-s'
            },
            throttle: {
                command: '--throttle'
            },
            pcttouch: {
                command: '-pct-touch'
            },
            pctmotion: {
                command: '--pct-motion'
            },
            pcttrackball: {
                command: '--pct-trackball'
            },
            pctnav: {
                command: '--pct-nav'
            },
            pctmajornav: {
                command: '--pct-majornav'
            },
            pctsyskeys: {
                command: '--pct-syskeys'
            },
            pctappswitch: {
                command: '--pct-appswitch'
            },
            pctanyevent: {
                command: '--pct-anyevent'
            },
            allowedpackagename: {
                command: '-p'
            }
        };

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
                    $scope.selectedExecution.failures = parseInt($scope.selectedExecution.failures)
                    $scope.selectedExecution.successTests = $scope.selectedExecution.assertions - $scope.selectedExecution.failures
                    new Chart('success-vs-failures-chart', {
                        type: 'doughnut',
                        data: {
                            labels: ["Success", "Fail"],
                            datasets: [{
                                data: [$scope.selectedExecution.successTests, $scope.selectedExecution.failures],
                                backgroundColor: [
                                    '#dff0d8',
                                    '#f2dede'
                                ]
                            }]
                        }
                    });
                }, err => console.log(err));
        }

        $scope.execute = testSuite => {
            $http.post(`/api/testsuite/${testSuite._id}/execute/${testSuite.providerName}`);
        }

        $scope.generateRandomTestingCommand = () => {       
            var command = 'adb shell monkey'
            for (var key in $scope.androidRandomTest) {
                var element = $scope.androidRandomTest[key]
                if(element.visible){
                    command += ` ${element.command} ${element.value}`
                }
            }
            command += ` ${$scope.androidRandomTest.eventcount.value}`
            $scope.command = command
            console.log(command)
        }

        function parseExecution(execution) {
            execution.failures = parseInt(execution.failures);
            execution.timestamp = (new Date(execution.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
            return execution;
        }

    });
