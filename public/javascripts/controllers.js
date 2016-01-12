app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  $scope.submitForm = function() {
    console.log($scope.story)
    $http.post('/api/stories', $scope.story).then(function(response) {
      $scope.story = {};
    })
  }

  $http.get('/api/stories').then(function(result) {
    console.log(result.data.rows)
    $scope.stories = result.data.rows;
  })
}])

app.controller('StoryController', ['$scope', function($scope) {
  
}])