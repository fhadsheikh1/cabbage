/* Login Service */

(function(){

    angular
        .module('cabbage')
        .factory('loginSrv', loginSrv);

        function loginSrv(){

            var service = {

                validateEmptyFields: validateEmptyFields

            }

            return service;

            ///////////////


            function validateEmptyFields(fields){
                for (var i = 0; i < fields.length; i++){

                    if(fields[i].$pristine){

                        fields[i].$invalid = true;
                        fields[i].$pristine = false;

                    }
                }
            }

        }

})();