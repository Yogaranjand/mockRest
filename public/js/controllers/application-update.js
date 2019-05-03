'use strict';
(function() {
    angular.module('myApp')

    .controller('applicationUpdateCtrl', ['$scope', '$location', '$timeout', '$routeParams', 'Application', applicationCtrl]);

    function applicationCtrl($scope, $location, $timeout, $routeParams, Application) {
        const { applicationId } = $routeParams;
        let application = {};

        Application.get(applicationId)
            .then(data => {
                const { isSuccess } = data;

                if (isSuccess) {
                    const { application_name, application_acronym } = data.application;

                    const applicationObj = {
                        applicationName: application_name,
                        acronym: application_acronym
                    };
                    $scope.application = Object.assign({}, applicationObj);
                    application = Object.assign({}, applicationObj);
                } else {
                    $scope.isApplicationExist = false;
                    $scope.message = data.message;
                }
            })

        $scope.updateApplication = function() {
            const isApplicationChanged = Object.keys(application).some(key => application[key] !== $scope.application[key]);

            function goToApplicationViewPage(next) {
                $location.url(next);
            }

            if (!isApplicationChanged) {
                const next = `/applications/info/${applicationId}`;
                $timeout(() => goToApplicationViewPage(next), 1000);
                return;
            }

            Application.update($scope.application, applicationId)
                .then(data => {
                    const { isSuccess, message } = data;
                    Object.assign($scope, { isSuccess, message, isSubmitted: true });
                    const next = `/applications/info/${applicationId}`;
                    if (isSuccess) {
                        $timeout(() => goToApplicationViewPage(next), 1000);
                    }
                })

        }

    }

})();