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

        function getAPIDetails(modelId, api, modelDataId) {
            if (!modelId) {
                const error = new TypeError('Model ID should Not Be Empty');
                return Promise.reject(error);
            }
            let modelApi = '/api/models/apilist';
            api = api.split('-').shift();
            console.log("api ====", api);
            modelDataId = (modelDataId) ? modelDataId : 0;
            const apiUrl = `${modelApi}/${modelId}/${api}/${modelDataId}`;
            console.log("apiUrl ====", apiUrl);
            return $http.get(apiUrl)
                .then(res => {
                    const { data, isSuccess } = res.data;
                    console.log("data 2222===", data);
                    return data;
                });
        }

        return {
            getLinks: getLinks,
            getAPIDetails: getAPIDetails
        }

    }

})();