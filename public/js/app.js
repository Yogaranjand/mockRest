'use strict';
(function() {
    angular.module('myApp', ['ngRoute', 'ngFileUpload'])

    .config(['$routeProvider', config]);

    function config($routeProvider) {
        $routeProvider
            .when('/applications/new', {
                templateUrl: '../partials/application-create.html',
                controller: 'applicationCreationCtrl'
            })
            .when('/applications', {
                templateUrl: '../partials/application-list.html',
                controller: 'applicationListCtrl as aListCtrl'
            })
            .when('/applications/info/:applicationId', {
                templateUrl: '../partials/application-info.html',
                controller: 'applicationInfoCtrl'
            })
            .when('/applications/edit/:applicationId', {
                templateUrl: '../partials/application-update.html',
                controller: 'applicationUpdateCtrl'
            })
            .when('/models/new', {
                templateUrl: '../partials/model-create.html',
                controller: 'modelCreationCtrl'
            }).when('/models/info/:modelId', {
                templateUrl: '../partials/model-info.html',
                controller: 'modelInfoCtrl'
            })
            .otherwise('/models/new')
    }

})();