/* Login Controller */

(function(){

    angular
        .module('cabbage')
        .controller('LoginCtrl', loginCtrl);

        function loginCtrl(loginSrv){

            var vm = this;

            vm.toggleRegistrationForm = toggleRegistrationForm;

            function toggleRegistrationForm(){

                vm.showRegistrationForm = !vm.showRegistrationForm;

            }

            // loginSrv.validateEmptyFields([userForm.username, userForm.password]);

               

        }

})();