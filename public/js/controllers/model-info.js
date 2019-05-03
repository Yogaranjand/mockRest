'use strict';
(function() {
    angular.module('myApp')

    .controller('modelInfoCtrl', ['$scope', '$routeParams', 'Model', modelInfoCtrl]);

    function modelInfoCtrl($scope, $routeParams, Model) {
        const { modelId } = $routeParams;
        $scope.modelId = modelId;
        $scope.showtextbox = false;
        console.log("ngwfjhgwjh");
        Model.getLinks(modelId)
            .then((data) => {
                console.log("data in controller===", data);

                if (data) {
                    $scope.message = data;

                } else {
                    $scope.isApplicationExist = false;
                    $scope.message = 'No Api available';
                }
            });
        $scope.getInfo = getInfo;
        $scope.triggerApi = triggerApi;

        function triggerApi(dataid) {
            retriveData($scope.modelId, $scope.currentApi, dataid);
        }

        function getInfo(modelId, api, dataid = null) {
            console.log("modelID ======", modelId);
            $scope.currentApi = api;
            if (api.indexOf('POST') > -1) {
                $scope.getMessagedata = false;
                $scope.showtextbox = true;
            } else if (api.indexOf('{id}') > -1) {
                $scope.showtextbox = true;
            } else {
                retriveData(modelId, api, dataid)
            }

        }

        function retriveData(modelId, api, dataid) {
            Model.getAPIDetails(modelId, api, dataid)
                .then((res) => {
                    console.log("res 66666>>>>>", res);
                    $scope.getMessagedata = JSON.stringify(res.results).replace(/\//g, '');
                });
        }

    }

})();