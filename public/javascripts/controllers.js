app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/stories').then(function(result) {
    $scope.stories = result.data.rows;
  })

  $scope.submitForm = function() {
    $http.post('/api/stories', $scope.story).then(function(result) {
      $scope.story = {};
      $scope.showForm = false;
    })
  }
}])

app.controller('StoryController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('/api/stories/' + $routeParams.id).then(function(result) {
    $scope.story = result.data.rows[0];
  })

  $http.get('/api/opinions/' + $routeParams.id).then(function(result) {
    $scope.opinions = result.data.rows;
  })

  $scope.submitOpinion = function() {
    $http.post('/api/opinions', {story_id: $routeParams.id, opinion: $scope.opinion.opinion}).then(function(result) {
      $scope.opinion = {};
    })
  }
}])