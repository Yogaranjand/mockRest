'use strict';
(function() {
    angular.module('myApp')

    .controller('modelInfoCtrl', ['$scope', '$routeParams', 'Model', modelInfoCtrl]);

    function modelInfoCtrl($scope, $routeParams, Model) {
        const { modelId } = $routeParams;
        $scope.modelId = modelId;
        $scope.showtextbox = false;
        $scope.dataid ='';
        console.log("ngwfjhgwjh");
        Model.getLinks(modelId)
            .then((data)=> {
                console.log("data in controller===", data );
                if (data) {
                    $scope.message = data;

                } else {
                    $scope.isApplicationExist = false;
                    $scope.message = 'No Api available';
                }
            });
        $scope.getInfo = getInfo;
        $scope.triggerApi = triggerApi;
        $scope.postModeldata = postModeldata;

        function postModeldata(data) {
            Model.create(data, $scope.modelId) 
                .then((res) => {
                    console.log("res post 000000>>>>>", res);
                    //$scope.getMessagedata = JSON.stringify(res.results).replace(/\//g, '');
                });
        }

        function triggerApi(dataid) {
            console.log("$scope.dataid", dataid);
            retriveData($scope.modelId, $scope.currentApi, dataid);
        }

        function getInfo(modelId, api, dataid=null) {
            $scope.getMessagedata = '';
            console.log("modelID ======", modelId);
            $scope.showtextbox = false;
            $scope.postPayload = false;
            $scope.currentApi = api;
            if (api.indexOf('POST') > -1) {
                $scope.getMessagedata = false;
                $scope.showtextbox = false;
                $scope.postPayload = true;

            } else if (api.indexOf('{id}') > -1) {
                $scope.showtextbox = true;
                $scope.getMessagedata = false;
            } else {
                $scope.showtextbox = false;
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