/* Main Controller */

(function(){

    angular
        .module('cabbage')
        .controller('MainCtrl', mainCtrl);

        function mainCtrl(){

            var vm = this;

            vm.isLoggedIn = false;
            
        }

})();