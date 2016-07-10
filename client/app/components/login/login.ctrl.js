/* Login Controller */

(function(){

    angular
        .module('cabbage')
        .controller('LoginCtrl', loginCtrl);

        function loginCtrl(loginSrv){

            var vm = this;

            vm.registration = {};
            vm.busy = false;
            vm.toggleRegistrationForm = toggleRegistrationForm;
            vm.registerUser = registerUser;

            function toggleRegistrationForm(){
                vm.showRegistrationForm = !vm.showRegistrationForm;
            }

            function registerUser(){

                vm.busy = true;

                loginSrv.createUser(
                    vm.registration.firstname,
                    vm.registration.lastname,
                    vm.registration.email,
                    vm.registration.password
                ).then(function(res){
                    vm.busy = false;
                    console.log(res);
                }, function(err){
                    vm.busy = false;
                    console.log(err);
                });

            }

            

               

        }

})();