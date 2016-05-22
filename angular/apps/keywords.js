'use strict';

//关键词
angular
  .module('app')
  .controller('KeywordsCtrl', KeywordsCtrl)
  .controller('KeywordsCtrl2', KeywordsCtrl2);

  KeywordsCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];

  function KeywordsCtrl($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var APP_LIST = ROOT_URL + 'main/app/list?f=json&callback=JSON_CALLBACK';

    var GIFT_MODEL_LIST = ROOT_URL + 'main/gift/model_list?f=json&callback=JSON_CALLBACK';
    var AD_MODI = ROOT_URL + 'main/ad/banner?f=json&callback=JSON_CALLBACK';
    var GIFT_DEL = ROOT_URL + 'main/gift/model_detail?f=json&callback=JSON_CALLBACK';
   
    var APP_INFO = ROOT_URL + 'main/app/detail?f=json&callback=JSON_CALLBACK';
    var APP_ADD = ROOT_URL + 'main/app/edit?f=json&callback=JSON_CALLBACK';

    vm.datas = [
        { name: '唱歌', id: 1},
        { name: '游戏', id: 2},
        { name: '兴趣',  id: 3}
    ];

    vm.totalNum = 1;
    vm.currentPage = 1;
    $timeout(function() {
      vm.$emit('initRender');
    },1000)
   

    vm.setCurId = function(id) {
      vm.curId = id;
    }
    
   

}
	// =========================================================================

  KeywordsCtrl2.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];


  function KeywordsCtrl2($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var APP_ADD = ROOT_URL + 'main/app/edit?f=json&callback=JSON_CALLBACK';


    vm.clientsObj_m = {};


    vm.addIt = function() {

    	var options = {
    		client : vm.clientsObj_m.selected['name'],
    		version : vm.version_m,
        release_time : vm.publishTime_m,
        file_size : vm.fileSize_m,
        file_url : vm.fileUrl_m,
        desc : vm.desc_m,
        update_force : vm.updateForce_m ? 1 : 0,
        force_before : vm.forceBefore_m,
        status : vm.status_m ? 1 : 0
    	}

    	
    	$http.jsonp(APP_ADD, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {

            vm.clientsObj_m.selected = [];
            vm.version_m = null;
            vm.publishTime_m = null;
            vm.fileSize_m = null;
            vm.fileUrl_m = null;
            vm.desc_m = null;
            vm.updateForce_m = false;
            vm.forceBefore_m = null;
            vm.status_m = false;

            toastr.success('操作成功')
            //TODO reflash

          }else{
            toastr.error(resp.errmsg);
          }
        }).error(function(data) {
        });
    }


    vm.resetIt = function() {

      vm.clientsObj_m.selected = [];
      vm.version_m = null;
      vm.publishTime_m = null;
      vm.fileSize_m = null;
      vm.fileUrl_m = null;
      vm.desc_m = null;
      vm.updateForce_m = false;
      vm.forceBefore_m = null;
      vm.status_m = false;


    }


}