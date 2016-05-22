// code style: https://github.com/johnpapa/angular-styleguide 
//用户管理

(function() {
    'use strict';
    angular
      .module('app')
      .controller('RoleCtrl', RoleCtrl);

      
      RoleCtrl.$inject = ['$scope', '$http'];
      
      function RoleCtrl($scope){
        var vm = $scope;
        alert(2)

        vm.name = "zxj"
      }
      
})();
