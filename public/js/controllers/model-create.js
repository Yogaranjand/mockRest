'use strict';
(function() {
    angular.module('myApp')

    .controller('modelCreationCtrl', ['Upload', '$window', 'Application', modelCreationCtrl]);

    function modelCreationCtrl(Upload, $window, Application) {

        Application.getAll()
            .then(applications => {
                vm.applications = [];
                angular.forEach(applications, function(application) {
                    vm.applications.push({
                        id: application.application_id,
                        applicationName: application.application_name,
                        acronym: application.application_acronym
                    })
                });
                vm.selectedApp = vm.applications[0];
            });


        var vm = this;

        vm.submit = function() {
            if (vm.upload_form.file.$valid && vm.file) {
                vm.upload(vm.file);
            }
        }
        vm.upload = function(file) {
            var appId = vm.selectedApp.id;
            Upload.upload({
                url: 'http://localhost:3030/api/models?appId=' + appId,
                data: { file: file, appId: appId },

            }).then(function(resp) {
                var isSuccess = false;
                if (resp.data.error_code === 0) {
                    isSuccess = true;
                }
                const message = isSuccess ? 'Model is uploaded successfully' : 'Sorry Try Again !';
                const colorClass = isSuccess ? 'success' : 'error';
                $.notify(message, colorClass);

            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% ';
            });
        };

        function generateObjectForNotifyJs(message, isSuccess) {

            const NofyJsObj = { message, isSuccess, colorClass };
            return NofyJsObj;
        }

    }

})();