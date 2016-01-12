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

app.controller('StoryController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
  $http.get('/api/stories/' + $routeParams.id).then(function(result) {
    $scope.story = result.data.rows[0];
  })

  $http.get('/api/opinions/' + $routeParams.id).then(function(result) {
    $scope.opinions = result.data.rows;
    var oneArray = [];
    for(var i = 0; i < $scope.opinions.length; i++) {
      $scope.opinions[i].opinion.replace(/[^\w\s]/gi, '').split(' ').forEach(function(word) {
        if(word != 'the' && word != 'a' && word != 'I' && word != 'it' && word != 'of' && word != 'not') {
          oneArray.push(word.toLowerCase());
        }
      })
    }
    var wordAnalysis = oneArray.reduce(function(obj, val) {
      obj[val] = obj[val] + 1 || 1;
      return obj;
    },{});

    $scope.wordAnalysis = [];
    for(var name in wordAnalysis) {
      $scope.wordAnalysis.push({word: name, occurance: wordAnalysis[name]});
    }
    console.log($scope.wordAnalysis);
  })

  $scope.submitOpinion = function() {
    $http.post('/api/opinions', {story_id: $routeParams.id, opinion: $scope.opinion.opinion}).then(function(result) {
      $scope.opinion = {};
    })
  }

  $scope.viewSite = function() {
    $window.open(this.story.link, '_blank');
  }
}])