'use strict';

// Declare app level module which depends on views, and components
var services = angular.module('services', []);
var models = angular.module('models', []);
var controllers = angular.module('controllers', []);
var oonozApp = angular.module('oonozApp', [
    'ngRoute',
    'ngResource',
    'services',
    'controllers',
    'models',
    'dialogs.main',
    'ui.bootstrap'
]);

oonozApp.config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'components/login/loginView.html',
            controller: 'LoginCtrl'
        })
        .when('/home', {
            templateUrl: 'components/home/homeView.html'
            //controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'components/signup/signupView.html',
            controller: 'SignUpCtrl'
        })
        .when('/mailValidation/:mail/:mailKey', {
            templateUrl: 'components/signup/validationSignupView.html',
            controller: 'ValidationSignUpCtrl'
        })
        .when('/generatePassword', {
            templateUrl: 'components/generatePassword/generatePasswordView.html',
            controller: 'generatePasswordCtrl'
        })
        .when('/terms/:type', {
            templateUrl: 'components/term/termView.html',
            controller: 'TermCtrl'
        })
        .when('/themes', {
            templateUrl: 'components/admin/themes/themeList/themeListView.html',
            controller: 'ThemeListCtrl'
        })
        .when('/themes/new', {
            templateUrl: 'components/admin/themes/addTheme/addThemeView.html',
            controller: 'AddThemeCtrl'
        })
        .when('/themes/:id/subthemes/new', {
            templateUrl: 'components/admin/themes/addSubTheme/addSubThemeView.html',
            controller: 'AddSubThemeCtrl'
        })
        .when('/themes/:id/edit', {
            templateUrl: 'components/admin/themes/editTheme/editThemeView.html',
            controller: 'EditThemeCtrl'
        })
        .when('/themes/:idTheme/subthemes/:idSubTheme/edit', {
            templateUrl: 'components/admin/themes/editSubTheme/editSubThemeView.html',
            controller: 'EditSubThemeCtrl'
        })
        .otherwise({redirectTo: '/login'});
}]);
