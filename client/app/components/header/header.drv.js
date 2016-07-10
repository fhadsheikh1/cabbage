/* Header Directive */

(function(){

    angular
        .module('cabbage')
        .directive('header', header);

        function header(){
            return {
                templateUrl: 'app/components/header/header.view.html',
                restrict: 'E',
                replace: true
            }
        }

})();