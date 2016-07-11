/* Main Controller */

(function(){

    angular
        .module('cabbage')
        .controller('MainCtrl', mainCtrl);

        function mainCtrl(authSrv, userSrv, $rootScope){

            var vm = this;
            vm.logout = logout;
            vm.user = userSrv.getUser();

            vm.isLoggedIn = false;

            function logout(){

                authSrv.logout();

            }

            load();

            function load(){
                checkLogin();
                watchLogin();
            }

            function checkLogin(){
                authSrv.checkLogin()
                .then(function(){
                    vm.isLoggedIn = true;
                }, function(){
                    vm.isLoggedIn = false;
                })
            }

            function watchLogin(){
                $rootScope.$on('userLoggedIn',function(event,args){
                    if(args){
                        vm.isLoggedIn = true;
                    } else {
                        vm.isLoggedIn = false;
                    }
                });
            }

            
        }

})();