// public/core.js
angular.module('automationTestingTool', ['ui.bootstrap'])
    .controller('mainController', function ($scope) {
        $scope.testSuites = [
            {
                name: 'Dolibarr login',
                description: 'This is a very interesting test suite ovet Dolibarr login',
                provider: 'cypress',
                lastExecution: {
                    date: (new Date()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
                    state: 'success'
                }
            }, {
                name: 'Dolibarr login',
                description: 'This is a very interesting test suite ovet Dolibarr login',
                provider: 'nigthwatch',
                lastExecution: {
                    date: (new Date()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
                    state: 'success'
                }
            },
            {
                name: 'Dolibarr login',
                description: 'This is a very interesting test suite ovet Dolibarr login',
                provider: 'cucumber',
                lastExecution: {
                    date: (new Date()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
                    state: 'success'
                }
            },
            {
                name: 'Dolibarr login',
                description: 'This is a very interesting test suite ovet Dolibarr login',
                provider: 'calabash',
                lastExecution: {
                    date: (new Date()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
                    state: 'success'
                }
            }
        ];
    });
