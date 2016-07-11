/* Main Controller */

(function(){

    angular
        .module('cabbage')
        .controller('MainCtrl', mainCtrl);

        function mainCtrl(authSrv, userSrv, moneySrv, $rootScope){

            var vm = this;
            vm.logout = logout;
            vm.user = userSrv.getUser();
            vm.balance = 0;

            vm.isLoggedIn = false;

            function logout(){

                authSrv.logout();

            }

            load();

            function load(){
                checkLogin();
                watchLogin();
                checkBalance();
                watchBalance();
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
                        vm.user = userSrv.getUser();
                    } else {
                        vm.isLoggedIn = false;
                    }
                });
            }

            function checkBalance(){
                moneySrv.checkBalance()
                .then(function(res){
                    vm.balance = res.balance;
                    $rootScope.balance = res.balance;
                })
            }

            function watchBalance(){
                $rootScope.$on('updatedBalance', function(event, args){
                    checkBalance();
                })
            }

            
        }

})();