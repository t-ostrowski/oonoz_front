/**
 * Created by Jeremy on 23/11/2016.
 */

services.factory('createAccountService', ['$resource','$location',
    function($resource){
        return {
            createPlayerAccount: function () {
     //           return $resource("http://localhost:8080/admin/createPlayerAccount", {}, {
                    return $resource("http://5.135.165.108:8092/Oonoz/admin/createPlayerAccount", {}, {
                    save: {
                        method: 'POST',
                        cache: false,
                        isArray: false
                    }
                });
            },
            createSupplierAccount: function () {
     //           return $resource("http://localhost:8080/admin/createSupplierAccount",{}, {
                    return $resource("http://5.135.165.108:8092/Oonoz/admin/createSupplierAccount",{}, {
                    save: {
                        method: 'POST',
                        cache: false,
                        isArray: false
                    }
                });
            },
            validationSignUp: function (mail,key) {
                // return $resource("http://localhost:8080/user/validationMail?mail="+mail+"&key="+key, {}, {
                return $resource("http://5.135.165.108:8092/Oonoz/user/validationMail?mail="+mail+"&key="+key, {}, {

                    query: {
                        method: 'GET',
                        cache: false, isArray: false
                    }
                });
            }
        }}]);

