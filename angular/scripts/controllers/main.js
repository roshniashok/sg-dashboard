angular.module( 'sample.home', [
  'ui.router',
  'angular-storage',
  'angular-jwt'
])
.config(function($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    controller: 'mainCtrl',
    templateUrl: 'views/main.html',
    data: {
      requiresLogin: true
    }
  });
})
.controller( 'mainCtrl', function MainController( $scope, $state, $http, store, jwtHelper) {

  $scope.jwt = store.get('jwt');
  $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

  $scope.callAnonymousApi = function() {
    // Just call the API as you'd do using $http
    callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  }

  $scope.callSecuredApi = function() {
    callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  }

  function callApi(type, url) {
    $scope.response = null;
    $scope.api = type;
    $http({
      url: url,
      method: 'GET'
    }).then(function(quote) {
      $scope.response = quote.data;
    }, function(error) {
      $scope.response = error.data;
    });
  }

});
