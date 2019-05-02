'use strict';
(function() {
    angular.module('myApp')

    .controller('applicationListCtrl', ['$location', 'Application', applicationListCtrl]);

    function applicationListCtrl($location, Application) {

        const vm = this;

        Application.getAll()
            .then(applications => {
                vm.applications = [];
                angular.forEach(applications, function(application) {
                    vm.applications.push({
                        id: application.application_id,
                        applicatioName: application.application_name,
                        acronym: application.application_acronym
                    })
                })
            });

        vm.deleteApplication = function deleteApplication(e, application) {
            e.preventDefault();
            var applicationId = application.id;
            var index = vm.applications.indexOf(application);
            Application.remove(applicationId)
                .then(data => {
                    vm.applications.splice(index, 1);
                    vm.isSubmitted = true;
                    vm.isSuccess = data.isSuccess;
                    vm.message = data.message
                    $.notify(data.message, data.colorClass);
                })
        }

        vm.goToUpdateApplicationView = function goToUpdateApplicationView(e, application) {
            e.preventDefault();
            var applicationId = application.id;
            $location.url('/applications/edit/' + applicationId);
        }

    }

})();