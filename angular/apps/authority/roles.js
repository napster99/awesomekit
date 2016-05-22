// code style: https://github.com/johnpapa/angular-styleguide 
//角色管理

(function() {
    'use strict';
    angular
      .module('app')
      .controller('UserCtrl', UserCtrl);


      UserCtrl.$inject = ['$scope', '$http'];

      function UserCtrl($scope){
        var vm = $scope;
        alert(24)

        vm.name = "zxj"
      }
      
})();
