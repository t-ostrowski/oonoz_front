/**
 * Created by Jeremy on 23/11/2016.
 */

controllers.controller('createAccountCtrl', ['$scope', '$location', 'createAccountService', 'PlayerModel','SupplierModel','dialogs',
    function ($scope, $location, createAccountService, PlayerModel,SupplierModel, dialogs) {

        $scope.submit = function () {

            if ($scope.wannaBeSupplier == true) {
                var supplier = new SupplierModel($scope);
                if ($scope.typeAccount.toString() == "professional") {
                    supplier.isPrivateIndividual = "false";
                }

                createAccountService.createSupplierAccount().save(supplier)
                    .$promise
                    .then(
                        function success(response) {
                            notifySucces();
                            $location.path('admin/userList');
                        },
                        function error(response) {
                            if (response.status == 409) {
                                notifyUsernameMailUnavailable();
                            }
                            else {
                                notifyInternalErrorOccurs ();
                            }
                        }
                    );

            }
            else {
                var player = new PlayerModel($scope);

                createAccountService.createPlayerAccount().save(player)
                    .$promise
                    .then(
                        function success(response) {
                            notifySucces();
                            $location.path('admin/userList');
                        },
                        function error(response) {
                            if (response.status == 409) {
                                notifyUsernameMailUnavailable();
                            }
                            else {
                                notifyInternalErrorOccurs ();
                            }
                        }
                    );
            }
        }

        function notifySucces () {
            dialogs.notify("Succès Inscription", "Le compte a bien été créé.")
        }

        function notifyUsernameMailUnavailable () {
            dialogs.error("Erreur", "Le username/adresse mail n'est pas disponible !")
        }


        function notifyInternalErrorOccurs () {
            dialogs.error("Erreur", "Une erreur interne s'est produite !");
        }
        $scope.kindTerm = 'player';

        $scope.updateStatus = function () {
            if ($scope.wannaBeSupplier) {
                $scope.kindTerm = 'supplier';
            } else {
                $scope.kindTerm = 'player';
            }
        };

        $scope.passwordsMatch = false;

        $scope.checkPasswords = function () {
            if ($scope.password === $scope.passwordConfirmation) {
                $scope.passwordsMatch = false;
            } else {
                $scope.passwordsMatch = true;
            }

        }
    }]);