/* Login Controller */

(function(){

    angular
        .module('cabbage')
        .controller('LoginCtrl', loginCtrl);

        function loginCtrl(userSrv, authSrv, $state){

            var vm = this;

            vm.registration = {};
            vm.busy = false;
            vm.error = false;
            vm.toggleRegistrationForm = toggleRegistrationForm;
            vm.registerUser = registerUser;
            vm.loginUser = loginUser;

            function toggleRegistrationForm(){
                vm.showRegistrationForm = !vm.showRegistrationForm;
                vm.error = false;
            }

            function registerUser(){

                vm.busy = true;
                vm.error = false;

                userSrv.createUser(
                    vm.registration.firstname,
                    vm.registration.lastname,
                    vm.registration.email,
                    vm.registration.password
                ).then(function(res){
                    vm.busy = false;
                    
                    authSrv.login(vm.registration.email, vm.registration.password)
                    .then(function(res){
                        $state.go('home.users');
                    })

                }, function(err){
                    vm.busy = false;
                    console.log(err);
                });

            }

            function loginUser(){

                vm.busy = true;
                vm.error = false;

                authSrv.login(
                    vm.credentials.email,
                    vm.credentials.password
                ).then(function(res){
                    if(res.data == 'Login_Failed')
                    {
                        vm.error = 'Login Failed';
                    }

                    vm.busy = false;

                    $state.go('home.users');
                });

            }

            

               

        }

})();