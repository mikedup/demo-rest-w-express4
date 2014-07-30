// To avoid polluting the global namespace, wrap your functions inside an immediately-invoked function expression
(function () {

  // Instantiate main app module (setter)
  angular.module('meanBears', []);


  // Named MainController definition to ensure module methods aren't anonymous
  function MainController ($scope, DataService) {
    $scope.formData = {};
    $scope.bears;

    // when landing on the page, get all bears and show them
    $scope.getBears = function () {
      DataService.getBears()
        .success(function (bears) {
          $scope.bears = bears;
        })
        .error(function (err) {
          console.log('Error:' + err);
        });
    };
    $scope.getBears();

    // when submitting the add form, send the text to the node API
    $scope.createBear = function () {
      DataService.createBear($scope.formData)
        .success(function (bears) {
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.bears = bears;
        })
        .error(function (err) {
          console.log('Error:' + err);
        });
    };

    // delete a bear after checking it
    $scope.deleteBear = function (id) {
      DataService.deleteBear(id)
        .success(function (bears) {
          $scope.bears = bears;
        })
        .error(function (err) {
          console.log('Error:' + err);
        });
    };
  }

  // Inject dependencies for the main controller
  MainController.$inject = ['$scope', 'DataService'];


  // Named DataService defintion to ensure module methods aren't anonymous
  function DataService ($http) {

    var urlBase = '/api/bears/';

    this.getBears = function () {
      return $http.get(urlBase);
    };

    this.createBear = function (name) {
      return $http.post(urlBase, name);
    };

    this.deleteBear = function (id) {
      return $http.delete(urlBase + id);
    };

  };

  // Inject dependencies for the main controller
  DataService.$inject = ['$http'];


  angular
    // Reference main app module
    .module('meanBears')
    // Set MainController controller method with function defined above
    .controller('MainController', MainController)
    // Set DataService service method with function defined above
    .service('DataService', DataService);

})();
