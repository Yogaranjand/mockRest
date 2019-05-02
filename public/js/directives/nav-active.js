'use strict';
(function() {
    angular.module('myApp')
        .directive('navActive', ['$rootScope', '$window', navActive]);

    function navActive($rootScope, $window) {

        function link(scope, element, attr) {
            var li = element.parent();
            if (li[0].nodeName === 'LI') {
                $rootScope.$on('$routeChangeSuccess', function(e) {
                    if (element[0].href === $window.location.href) {
                        li.addClass('active');
                    } else {
                        li.removeClass('active');
                    }
                })

            }
        }

        return {
            restrict: 'A',
            link: link
        }
    }

})();