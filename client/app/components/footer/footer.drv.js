/* Footer Directive */

(function(){

    angular
        .module('cabbage')
        .directive('footer', footer);

        function footer(){
            return {
                templateUrl: 'app/components/footer/footer.view.html',
                restrict: 'E',
                replace: true
            }
        }

})();