'use strict';
(function() {
    angular.module('myApp')

    .controller('modelInfoCtrl', ['$scope', '$routeParams', 'Model', modelInfoCtrl]);

    function modelInfoCtrl($scope, $routeParams, Model) {
        const { modelId } = $routeParams;
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

    }

})();