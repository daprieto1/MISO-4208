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

        $scope.mutation={
          js:{
            repository:'',
            conditionalsBoundary:'',
            deletion:'',
            increments:'',
            invertNegatives:'',
            math:'',
            negateConditionals:'',
            removeConditionals:'',
            returnValues:'',
            switchCases:'',
            concurrency:1
          }
        }

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

        $scope.executeMutationTestingJS = () =>{
          console.log("mutation testing "+$scope.mutation.js.repository);
          var data = {};
          data.repository = $scope.mutation.js.repository;
          data.conditionalsBoundary = $scope.mutation.js.conditionalsBoundary;
          data.deletion = $scope.mutation.js.deletion;
          data.increments = $scope.mutation.js.increments;
          data.invertNegatives = $scope.mutation.js.invertNegatives;
          data.math = $scope.mutation.js.math;
          data.negateConditionals = $scope.mutation.js.negateConditionals;
          data.removeConditionals = $scope.mutation.js.removeConditionals;
          data.returnValues = $scope.mutation.js.returnValues;
          data.switchCases = $scope.mutation.js.switchCases;
          data.concurrency = $scope.mutation.js.concurrency;

          $http.post('/api/mutation/', data);
        }

        $scope.generateRandomTestingCommand = () => {
            var command = 'adb shell monkey'
            for (var key in $scope.androidRandomTest) {
                var element = $scope.androidRandomTest[key];
                if(element.visible){
                    command += ` ${element.command} ${element.value}`;
                }
            }
            command += ` ${$scope.androidRandomTest.eventcount.value}`;
            $scope.command = command;
            console.log(command);
            var comando = {};
            comando.monkeyCommand = command;
            console.log(comando);
            $http.post('/api/monkey/', comando);
        }

        function parseExecution(execution) {
            execution.failures = parseInt(execution.failures);
            execution.timestamp = (new Date(execution.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
            return execution;
        }

    });
