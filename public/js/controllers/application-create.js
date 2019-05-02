'use strict';
(function() {
    angular.module('myApp')

    .controller('applicationCreationCtrl', ['$scope', '$timeout', 'Application', applicationCreationCtrl]);

    function applicationCreationCtrl($scope, $timeout, Application) {
        $scope.application = {};
        $scope.createApplication = function() {
            const { applicationName, acronym } = $scope.application;
            Application.create(applicationName, acronym)
                .then(data => {
                    $scope.isSubmitted = true;
                    $scope.isSuccess = data.isSuccess;
                    $scope.message = data.message
                    $.notify(data.message, data.colorClass);

                    if (data.isSuccess) {
                        $scope.application = {}
                    }

                    $timeout(hideSubmitMessage, 1000);

                    function hideSubmitMessage() {
                        $scope.isSubmitted = false;
                    }

                })

        };

    }

})();