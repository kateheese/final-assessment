var app = angular.module('gazette', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/home.html',
        controller: 'HomeController'
      })
      .when('/stories/:id', {
        templateUrl: '/partials/story.html',
        controller: 'StoryController'
      })
      .otherwise({
        redirectTo:'/'
      })
    $locationProvider.html5Mode(true);
  });