'use strict';
(function() {
    angular.module('myApp')

    .factory('Model', ['$http', '$window', Model]);

    function Model($http, $window) {
        const modelApi = '/api/models/links';
        
        function getLinks(modelId) {
            console.log("getLinks ====", modelId);
            if (!modelId) {
                const error = new TypeError('Model ID should Not Be Empty');
                return Promise.reject(error);
            }
            const apiUrl = `${modelApi}/${modelId}`;
            console.log("apiUrl ====", apiUrl);
            return $http.get(apiUrl)
                .then(res => {
                    const { data, isSuccess } = res.data;
                    console.log("data ===", data);
                    return data;
                });
        }



        return {
            getLinks: getLinks
        }

    }

})();