
angular
  .module('app')
  .directive('pagination', ['$interval', function($interval) {
    return {
      restrict: 'A',
      templateUrl: 'apps/mylibs/pagination.html',

      controller: function ($scope) {
        var vm = $scope;
        vm.initRender = function(first) {
          var pageSize = 5, startIndex = 1;
          var rangeSection = parseInt((vm.currentPage - 1)/pageSize);
          vm.pageBoxArray = [];

          if(vm.totalNum > pageSize) {
            if(vm.currentPage > pageSize) {
              vm.prevMoreHide = false;
            }else{
              vm.prevMoreHide = true;
            }

            if(vm.totalNum - rangeSection*pageSize - pageSize > 0) {
              vm.nextMoreHide = false;
            }else{
              vm.nextMoreHide = true;
            }
          }

          startIndex = rangeSection*pageSize + 1;
          var endIndex = (startIndex + pageSize) < vm.totalNum ? (startIndex + pageSize) : vm.totalNum;
          endIndex = endIndex > parseInt((vm.currentPage-1)/pageSize)*pageSize + pageSize ? rangeSection*pageSize + pageSize : endIndex;

          vm.whichIndex = vm.currentPage - rangeSection*pageSize;

          for(var i=startIndex; i<=endIndex; i++) {
            vm.pageBoxArray.push(i);
          }


          // setTimeout(function() {
          //   vm.pageBoxArray = [1,2,3,4];
          //   console.log('pageBoxArray 赋值', vm.pageBoxArray)
          // },2000)

          // console.log('load data...', vm.currentPage)
          // console.log('>>', vm.$apply)

          if(!first){
            vm.O_loadData(vm.currentPage);
          }

        }

        $scope.getPageShowArray = function (currentPage, len) {
          var result = [];
          if (currentPage - 1 === 0) {
            var resultLen = len > $scope.pageNum ? $scope.pageNum : len;
            for (var i = 0; i < resultLen; i++) {
              result.push(i + 1);
            }
          } else {
            var resultLen = len > $scope.pageNum ? $scope.pageNum : len;
            for (var i = 0; i < resultLen; i++) {
              result.push(currentPage - 1 + i);
            }
          }
          return result;
        };
        $scope.showPage = function (index) {
          $scope.currentPage = index;
          this.initRender();
          // var start = (Id - 1) * $scope.pageSize;
          // var end = Id * $scope.pageSize;
          // $scope.showItems = $scope.itemsSource.slice(start, end);
        };
        $scope.prevClick=function () {
          $scope.currentPage = ($scope.currentPage - 1) == 0 ? 1 : $scope.currentPage - 1;
          this.initRender();
        };
        $scope.nextClick = function () {
          $scope.currentPage = $scope.currentPage + 1 > $scope.totalNum ? $scope.totalNum : $scope.currentPage + 1;

          this.initRender();
        };

        $scope.firstPage = function() {
          $scope.currentPage = 1;
          this.initRender();
        }

        $scope.lastPage = function() {
          $scope.currentPage = $scope.totalNum;
          this.initRender();
        }

        $scope.prevMoreClick = function() {
          var vm = $scope;
          var pageSize = 5;
          var rangeSection = parseInt((vm.currentPage - 1)/pageSize);

          vm.currentPage = rangeSection*pageSize;
          this.initRender();

        }

        $scope.nextMoreClick = function() {
          var vm = $scope;
          var pageSize = 5;
          var rangeSection = parseInt((vm.currentPage - 1)/pageSize) + 1 + 1;
          vm.currentPage = rangeSection*pageSize - pageSize + 1;
          this.initRender();
        }
      },
      link: function (scope, element, attr) {
        var pageSize = 5;
        // scope.totalNum = 2;
        // scope.prevMoreHide = true;
        // scope.nextMoreHide = true;
        // scope.currentPage = 4;
        // scope.whichIndex = 1;
        scope.prevMoreHide = true;
        scope.nextMoreHide = true;
        scope.whichIndex = 1;
        scope.currentPage = 1;
        
        // var inserScope = scope;  

        // inserScope.initRender(true);

        // return;

        // alert($interval)

        scope.$on('initRender', function(event,data) {
          if(scope.totalNum > 0) {
            if(scope.totalNum > pageSize) {
              scope.nextMoreHide = false;
            }
            scope.initRender(true);
          }
        });



        // var timer = $interval(function() {
        //   if(scope.totalNum > 0) {
        //     $interval.cancel(timer)
        //     if(scope.totalNum > pageSize) {
        //       scope.nextMoreHide = false;
        //     }
        //     scope.initRender(true);
        //   }
        // },100);

        // var timer = setInterval(function(){
        //   if(inserScope.totalNum > 0) {
        //     clearInterval(timer);
        //     if(inserScope.totalNum > pageSize) {
        //       inserScope.nextMoreHide = false;
        //     }
        //     // inserScope.initRender(true);
        //     inserScope.initRender.call(inserScope, true)
        //   }
        // }.bind(inserScope),100);



      }
    }
  }])