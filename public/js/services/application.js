'use strict';
(function() {
    angular.module('myApp')

    .factory('Application', ['$http', '$window', Application]);

    function Application($http, $window) {

        const applicationsAPI = '/api/applications';

        function generateObjectForNotifyJs(message, isSuccess) {
            const colorClass = isSuccess ? 'success' : 'error';
            const NofyJsObj = { message, isSuccess, colorClass };
            return NofyJsObj;
        }

        function create(applicationName, acronym) {
            if (!applicationName || !acronym) {
                return Promise.reject('All Fields Are Mandatory');
            }
            const applicationObj = { applicationName: applicationName, acronym: acronym }

            return $http.post(applicationsAPI, applicationObj)
                .then(res => {
                    const { isSuccess, data } = res.data;
                    if (data) {
                        const message = isSuccess ? 'Application Successfully Created' : 'Sorry Try Again !';
                        return generateObjectForNotifyJs(message, isSuccess);
                    }
                }, error => {
                    console.log("error >>>>>>", err);
                })
        }

        function get(ApplicationId) {
            if (!ApplicationId) {
                const error = new TypeError('Application ID should Not Be Empty');
                return Promise.reject(error);
            }
            const apiUrl = `${applicationsAPI}/${ApplicationId}`;
            return $http.get(apiUrl)
                .then(res => {
                    const { data, isSuccess } = res.data;
                    if (data) {
                        const message = isSuccess ? 'Application Details Retrived Successfully' : 'Sorry!, Something Went Wrong';
                        const resData = generateObjectForNotifyJs(message, isSuccess);
                        resData.Application = Array.isArray(data) && data[0] || {};
                        return resData;
                    }
                })
        }

        function getAll() {
            return $http.get(applicationsAPI)
                .then(res => {
                    const { data, isSuccess } = res.data;
                    return data || [];
                })
        }

        function update(ApplicationObj, ApplicationId) {
            if (!ApplicationId) {
                const error = new TypeError('Application ID should Not Be Empty');
                return Promise.reject(error);
            }

            const keys = ['applicationName', 'acronym'];

            const apiUrl = `${applicationsAPI}/${ApplicationId}`;
            const Application = {};
            keys.forEach(key => Application[key] = ApplicationObj[key]);

            return $http.put(apiUrl, Application)
                .then(res => {
                    const { data, isSuccess } = res.data;
                    if (data) {
                        const message = isSuccess ? 'Application Updated Successfully' : 'Sorry!, Something Went Wrong';
                        return generateObjectForNotifyJs(message, isSuccess);
                    }
                })
        }

        function remove(ApplicationId) {
            if (!ApplicationId) {
                const error = new TypeError('Application ID should Not Be Empty');
                return Promise.reject(error);
            }

            const apiUrl = `${applicationsAPI}/${ApplicationId}`;

            return $http.delete(apiUrl)
                .then(res => {
                    const { data, isSuccess } = res.data;
                    if (data) {
                        const message = isSuccess ? 'Successfully Deleted' : 'Sorry!, Something Went Wrong';
                        return generateObjectForNotifyJs(message, isSuccess);
                    }
                })
        }

        return {
            create: create,
            getAll: getAll,
            get: get,
            update: update,
            remove: remove
        }

    }

})();