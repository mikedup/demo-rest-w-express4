// public/core.js
var meanBears = angular.module('meanBears', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all bears and show them
  $http.get('/api/bears')
    .success(function(data) {
      $scope.bears = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createBear = function() {
    $http.post('/api/bears', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.bears = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // delete a bear after checking it
  $scope.deleteBear = function(id) {
    $http.delete('/api/bears/' + id)
      .success(function(data) {
        $scope.bears = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
