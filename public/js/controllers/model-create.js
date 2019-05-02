'use strict';
(function() {
    angular.module('myApp')

    .controller('modelCreationCtrl', ['Upload', '$window', modelCreationCtrl]);

    function modelCreationCtrl(Upload, $window) {

        var vm = this;
        vm.submit = function() {
            if (vm.upload_form.file.$valid && vm.file) {
                vm.upload(vm.file);
            }
        }
        vm.upload = function(file) {
            Upload.upload({
                url: 'http://localhost:3030/api/models?appId =1',
                data: { file: file, appId: 1 },

            }).then(function(resp) {
                if (resp.data.error_code === 0) {
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% ';
            });
        };

    }

})();