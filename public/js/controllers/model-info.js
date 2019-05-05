'use strict';
(function() {
    angular.module('myApp')

    .controller('modelInfoCtrl', ['$scope', '$routeParams', 'Model', modelInfoCtrl]);

    function modelInfoCtrl($scope, $routeParams, Model) {
        const { modelId } = $routeParams;
        $scope.modelId = modelId;
        $scope.showtextbox = false;
        $scope.invalidData = false;
        $scope.dataid = '';
        $scope.requiredArr;
        $scope.putId;
        console.log("ngwfjhgwjh");
        Model.getLinks(modelId)
            .then((data) => {
                console.log("data in controller===", data);
                if (data) {
                    let linkArr = [];
                    data.links.forEach((item) => {
                        let link = item.method + " - " + item.href;
                        linkArr.push(link);
                    });
                    console.log("linkArr ===", linkArr);
                    $scope.requiredArr = data.required;
                    $scope.message = linkArr;

                } else {
                    $scope.isApplicationExist = false;
                    $scope.message = 'No Api available';
                }
            });
        $scope.getInfo = getInfo;
        $scope.triggerApi = triggerApi;
        $scope.postModeldata = postModeldata;
        $scope.putModeldata = putModeldata;

        function postModeldata(data) {
            console.log('data ===', data);
            console.log('typeof data ===', typeof data);
            let dataArr;
            try {
                dataArr = JSON.parse(data);
            } catch (e) {
                $scope.invalidData = true;
            }
            console.log('dataArr ===', dataArr);
            $scope.requiredArr.forEach((field) => {
                console.log('filed ===', field);
                console.log('data[field] ===', dataArr[field])
                if (!dataArr[field]) {
                    $scope.invalidData = true;
                    console.log("please provide correct format!!.");
                    return false;
                }
            });
            if (!$scope.invalidData) {
                Model.create(data, $scope.modelId)
                    .then((res) => {
                        $scope.postPayload = false;
                    });
            }
        }

        function putModeldata(data, id) {
            let dataArr;
            try {
                dataArr = JSON.parse(data);
            } catch (e) {
                $scope.invalidData = true;
            }
            console.log('dataArr ===', dataArr);
            $scope.requiredArr.forEach((field) => {
                console.log('filed ===', field);
                console.log('data[field] ===', dataArr[field])
                if (!dataArr[field]) {
                    $scope.invalidData = true;
                    console.log("please provide correct format!!.");
                    return false;
                }
            });
            if (!$scope.invalidData) {
                Model.update(data, id)
                    .then((res) => {
                        $scope.postPayload = false;
                    });
            }
        }

        function triggerApi(dataid) {
            console.log("$scope.dataid", dataid);
            retriveData($scope.modelId, $scope.currentApi, dataid);
        }

        function getInfo(modelId, api, dataid = null) {
            $scope.getMessagedata = '';
            console.log("modelID ======", modelId);
            $scope.showtextbox = false;
            $scope.postPayload = false;
            $scope.putPayload = false;
            $scope.currentApi = api;
            if (api.indexOf('POST') > -1) {
                $scope.getMessagedata = false;
                $scope.showtextbox = false;
                $scope.postPayload = true;

            } else if (api.indexOf('PUT') > -1) {
                $scope.getMessagedata = false;
                $scope.showtextbox = false;
                $scope.putPayload = true;

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
                    var results = res.results;
                    var formattedResult = [];
                    angular.forEach(results, function(result) {
                        formattedResult.push({
                            model_data_id: result.model_data_id,
                            data: JSON.parse(result.data.replace(/\\/g, ''))
                        });
                    })
                    $scope.getMessagedata = formattedResult;
                });
        }
    }

})();