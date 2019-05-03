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
            api = api.split('-').shift().trim();
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

        function create(payload, modelId) {
            if (!modelId || !payload) {
                return Promise.reject('All Fields Are Mandatory');
            }
            const payloadObj = { data: payload, modelId: payload }
            let url = '/api/models/createRecord';
            return $http.post(url, payloadObj)
                .then(res => {
                    const { isSuccess, data } = res.data;
                    console.log(" data createcreatecreatecreate====", data);
                    if (data) {
                        const message = isSuccess ? 'Application Successfully Created' : 'Sorry Try Again !';
                        return generateObjectForNotifyJs(message, isSuccess);
                    }
                }, error => {
                    console.log("error >>>>>>", err);
                })
        }

        return {
            getLinks: getLinks,
            getAPIDetails: getAPIDetails
        }

    }

})();