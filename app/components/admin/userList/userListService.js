services.factory('UserListService', ['$resource','$location',
    function($resource) {
        return {
            filteredSearch: function () {
              return $resource("http://localhost:8092/admin/filteredSearch", {}, {
                   // return $resource("http://localhost:8092/admin/filteredSearch", {}, {
                    query: {
                        method: 'POST',
                        cache: false,
                        isArray: false
                    }
                });
            },
            updatePlayer: function(){
             return $resource("http://localhost:8092/admin/updatePlayer", {}, {
                   // return $resource("http://localhost:8092/admin/updatePlayer", {}, {
                    query: {
                        method: 'PUT',
                        cache: false,
                        isArray: false
                    }
                });
            },
            updateSupplier: function(){
             return $resource("http://localhost:8092/admin/updateSupplier", {}, {
                   // return $resource("http://localhost:8092/admin/updateSupplier", {}, {
                    query: {
                        method: 'PUT',
                        cache: false,
                        isArray: false
                    }
                });
            },
            deleteUser: function(idPlayer){
            return $resource("http://localhost:8092/admin/deleteUser", {}, {
                   // return $resource("http://localhost:8092/admin/deleteUser", {}, {
                    query: {
                        method: 'DELETE',
                        cache: false,
                        isArray: false,
                        params:{
                            "idPlayer":idPlayer
                        }

                    }
                });
            },
            changeStatusUser: function(idPlayer){
                return $resource("http://localhost:8092/admin/changeStatusUser", {}, {
                //return $resource("http://localhost:8092/admin/changeStatusUser", {}, {
                    query: {
                        method: 'GET',
                        cache: false,
                        isArray: false,
                        params:{
                            "idPlayer":idPlayer
                        }

                    }
                });
            }
        };
    }]);