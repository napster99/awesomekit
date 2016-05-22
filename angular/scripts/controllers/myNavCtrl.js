// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('MyNavCtrl', MyNavCtrl);


      MyNavCtrl.$inject = ['$scope', '$http', 'ROOT_URL'];

      function MyNavCtrl($scope, $http, ROOT_URL){
        var vm = $scope;

        var url = ROOT_URL + 'main/auth/info?f=json&callback=JSON_CALLBACK';

        $http.jsonp(url).success(function(resp) {
          // vm.datas = resp.menu;
        }).error(function(data) {
        });

        
        vm.datas = {
            'xxxx' : [
                {'name' : 'xxxxx','icon' : 'fa-users', 'ui_sref' : 'app.robot'},
                {'name' : 'xxxxx','icon' : 'fa-fire', 'ui_sref' : 'app.topicPackage'},
                {'name' : 'xxxxx','icon' : 'fa-warning', 'ui_sref' : 'app.keywords'},
            ]
        }



      }
      
})();
