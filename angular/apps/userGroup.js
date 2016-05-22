'use strict';

//用户群组设置
angular
	.module('app')
	.controller('UserCtrl',	UserCtrl);

	UserCtrl.$inject = ['$scope'];

	function UserCtrl($scope) {
		var vm = $scope;
		vm.parentPageShow = true;
		vm.childPageShow = false;


    vm.totalNum = 12;
    vm.prevMoreHide = true;
    vm.nextMoreHide = true;
    vm.currentPage = 4;
    vm.whichIndex = 1;

    vm.datas = [
    {'id' : 42324, 'groupName' : 11111,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 11:34'},
    {'id' : 15223, 'groupName' : 22222,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
    {'id' : 65472, 'groupName' : 33333,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
    {'id' : 63424, 'groupName' : 44444,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
    {'id' : 78924, 'groupName' : 55555,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'}
    ]


		vm._toggleShow = function() {
			vm.parentPageShow = !vm.parentPageShow;
			vm.childPageShow = !vm.childPageShow;
		}


		vm.seeDetail = function() {
			vm._toggleShow();


		}

    //加载
    vm.O_loadData = function() {

      vm.datas =  [
      {'id' : 65224, 'groupName' : 66666,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
      {'id' : 67453, 'groupName' : 77777,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
      {'id' : 67453, 'groupName' : 88888,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
      {'id' : 67453, 'groupName' : 99999,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'},
      {'id' : 67453, 'groupName' : 10101,'groupDesc' : 'xxxx', 'args' : '11,22', 'time' : '2016-05-03 12:34'}
      ]

    }

	}  



//某个群组下的用户设置
angular
  .module('app')
  .controller('UserCtrl2', UserCtrl2);

  UserCtrl2.$inject = ['$scope'];

  function UserCtrl2($scope) {
    var vm = $scope;



    vm.LOADDATA = function() {

    }
  }
