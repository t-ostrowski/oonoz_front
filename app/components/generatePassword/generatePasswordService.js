/**
 * Created by Jeremy on 12/10/2016.
 */
/**
 * Created by tostrowski on 05/10/2016.
 */
services.factory('generatePasswordService', ['$resource','$location',
    function($resource){
       // return $resource("http://localhost:8080/user/generatePassword", {}, {
            return $resource("http://5.135.165.108:8092/Oonoz/user/generatePassword", {}, {
            generate: {
                method: 'POST',
                cache: false, isArray: false
            }
        });
    } ,
]);