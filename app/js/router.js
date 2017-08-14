app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('index',{
            url:'/index',
            templateUrl: 'views/home.html',
            controller:'homeController'
       });
    $urlRouterProvider.otherwise('index');
}])