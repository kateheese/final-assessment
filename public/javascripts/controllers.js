app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  function getStories() {
    $http.get('/api/stories').then(function(result) {
      $scope.stories = result.data.rows;
    })
  }

  getStories();

  $scope.submitForm = function() {
    $http.post('/api/stories', $scope.story).then(function(result) {
      $scope.story = {};
      $scope.showForm = false;
      getStories();
    })
  }
}])

app.controller('StoryController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
  $http.get('/api/stories/' + $routeParams.id).then(function(result) {
    $scope.story = result.data.rows[0];
  })
  function getOpinions() {
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
    })
  }

  getOpinions();

  $scope.submitOpinion = function() {
    $http.post('/api/opinions', {story_id: $routeParams.id, opinion: $scope.opinion.opinion}).then(function(result) {
      $scope.opinion = {};
      getOpinions();
    })
  }

  $scope.viewSite = function() {
    $window.open(this.story.link, '_blank');
  }
}])