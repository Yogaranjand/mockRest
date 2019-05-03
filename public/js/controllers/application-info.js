'use strict';
(function() {
    angular.module('myApp')

    .controller('applicationInfoCtrl', ['$scope', '$timeout', '$location', '$routeParams', 'Application', applicationInfoCtrl]);

    function applicationInfoCtrl($scope, $timeout, $location, $routeParams, Application) {
        const { applicationId } = $routeParams;
        let application = {};

        Application.get(applicationId)
            .then(data => {

                const { isSuccess } = data;

                if (isSuccess) {
                    const { application_id, application_name, application_acronym } = data.application;
                    const applicationObj = {
                        id: application_id,
                        applicationName: application_name,
                        acronym: application_acronym,
                        models: data.models
                    };
                    $scope.applicationProperties = Object.keys(applicationObj);

                    $scope.application = Object.assign({}, applicationObj);

                } else {
                    $scope.isApplicationExist = false;
                    $scope.message = data.message;
                }
            })

        $scope.deleteApplication = function deleteApplication(application) {
            var applicationId = application.id;
            Application.remove(applicationId)
                .then(function(data) {
                    $scope.isSubmitted = true;
                    const { isSuccess, message, colorClass } = data;
                    Object.assign($scope, { isSuccess, message });
                    $.notify(message, colorClass);

                    function goToApplicationList() {
                        $location.url('/applications')
                    }

                    $timeout(goToApplicationList, 900);
                })
        }

        $scope.goToUpdateApplicationView = function goToUpdateApplicationView(e, application) {
            e.preventDefault();
            var applicationId = application.id;
            $location.url('/applications/edit/' + applicationId);
        }

    }

})();