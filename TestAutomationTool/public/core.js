// public/core.js
angular.module('automationTestingTool', ['ui.bootstrap'])
    .controller('mainController', function ($scope, $http) {
        $scope.conta =[0, 0, 0, 0, 0, 0, 0, 0]
        $scope.command = "";
        $scope.ErrorCommand = "";
        $scope.androidRandomTest = {
            seed: {
                command: '-s'
            },
            throttle: {
                command: '--throttle'
            },
            pcttouch: {
                command: '--pct-touch',
                value: 0
            },
            pctmotion: {
                command: '--pct-motion',
                value: 0
            },
            pcttrackball: {
                command: '--pct-trackball',
                value: 0
            },
            pctnav: {
                command: '--pct-nav',
                value: 0
            },
            pctmajornav: {
                command: '--pct-majornav',
                value: 0
            },
            pctsyskeys: {
                command: '--pct-syskeys',
                value: 0
            },
            pctappswitch: {
                command: '--pct-appswitch',
                value: 0
            },
            pctanyevent: {
                command: '--pct-anyevent',
                value: 0
            },
            allowedpackagename: {
                command: '-p'
            },
            verbosity:{
                command: '-v'
            }

        };

        $scope.mutation = {
            js: {
                repository: '',
                conditionalsBoundary: '',
                deletion: '',
                increments: '',
                invertNegatives: '',
                math: '',
                negateConditionals: '',
                removeConditionals: '',
                returnValues: '',
                switchCases: '',
                concurrency: 1
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


        $http.get('/api/mdroid')
            .then(response => {
                $scope.mdroidExecutions = response.data;
                console.log($scope.mdroidExecutions)
            }, err => console.log(err));

        $http.get('/api/mutation/').then(response =>{
          var result = [];
          for(var i=0;  i<response.data.length; i++){
            var project = response.data[i];
            project.executions = project.executions.map(execution => parseMutodeResults(execution)).reverse(function(r1, r2){
              return r1.timestamp -r2.timestamp;
            });
            result.push(project);
          }

          $scope.mutodeResults = result;
        }, err => console.log(err));
        
        loadInfoHistoricMonkey();


        $scope.selectedExecution = undefined;
        $scope.selectedME = undefined;
        $scope.mdroid = {}

        $scope.createME = () => {
            $http.post('/api/mdroid', $scope.mdroid)
                .then(response => {
                    console.log(response.data)
                }, err => console.log(err));
        }
        $scope.selectME = (me) => { $scope.selectedME = me }
        $scope.showMoreMutant = (mutant) => {
            $scope.selectedMutant = mutant;
            $http.get(`/api/mdroid/${$scope.selectedME._id}/codeline/${$scope.selectedMutant.id}`)
                .then(response => {
                    var one = response.data.original,
                        other = response.data.change,
                        color = '',
                        span = null;

                    var diff = JsDiff.diffChars(one, other),
                        display = document.getElementById(`display${mutant.id}`),
                        fragment = document.createDocumentFragment();

                    diff.forEach(function (part) {
                        color = part.added ? 'green' :
                            part.removed ? 'red' : 'grey';
                        span = document.createElement('span');
                        span.style.color = color;
                        span.appendChild(document
                            .createTextNode(part.value));
                        fragment.appendChild(span);
                    });
                    display.appendChild(fragment);
                }, err => console.log(err));
        }

        $scope.selectExecution = (execution) => {
            $scope.selectedExecution = execution;
            $http.get(`/api/execution/execution._id}`)
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
            $http.post(`/api/testsuite/testSuite._id}/execute/testSuite.providerName}`);
        }

        $scope.executeMutationTestingJS = () => {
            console.log("mutation testing " + $scope.mutation.js.repository);
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
                var element = $scope.androidRandomTest[key]
                if (element.visible) {
                    command += ` element.command} element.value}`
                }
            }
            if($scope.androidRandomTest.eventcount == undefined){
                $scope.ErrorCommand = "Enter the event count!";
                return;
            }

            command += ` ${$scope.androidRandomTest.eventcount.value}`;
            
            var porcentaje = 0;
            $scope.conta.forEach(element => {
                porcentaje += element;
            });
            if(porcentaje > 100){
                $scope.ErrorCommand = "The sum of the percentages should be <= 100%!";
                return;
            }

            $scope.ErrorCommand = "";
            $scope.command = command;
            comando.monkeyCommand = command;
        }
        $scope.executeRandomTestingCommand = () => {
            
            if ($scope.command == ""){
                $scope.ErrorCommand = "First generates the command!";
                return;
            }
            var comando = {};
            comando.monkeyCommand = $scope.command;
            console.log(comando);
            $http.post('/api/monkey/', comando);
        }
        $scope.executeMonkeyAgain = (commandSend) => {
            
            var comando = {};
            comando.monkeyCommand = commandSend;
            console.log(commandSend);
            $http.post('/api/monkey/', comando);
        }
        $scope.printValue = (posicion, valor) => {
            $scope.conta[posicion] = valor;
        }
        $scope.refreshHistoricMonkey = () => {
            loadInfoHistoricMonkey()
        }
        function parseExecution(execution) {
            execution.failures = parseInt(execution.failures);
            execution.timestamp = (new Date(execution.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
            return execution;
        }


        function parseMutodeResults(result){
          result.timestamp = (new Date(result.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
          return result;
        }

        function parseMonkeyResults(result){
            result.timestamp = (new Date(result.timestamp)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
            result.error = parseInt(result.error);
            return result;
        }

        function loadInfoHistoricMonkey(){
            $http.get('/api/monkey/').then(response =>{
                $scope.monkeyResults = response.data.map(result => parseMonkeyResults(result)).reverse(function(r1, r2){
                  return r1.timestamp -r2.timestamp;
                });
                $scope.monkeyReportDate =  (new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }));
                console.log($scope.monkeyResults);
            }, err => console.log(err));
        }
        
    });
