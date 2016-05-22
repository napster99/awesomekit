'use strict';

//认证审核
angular
  .module('app')
  .controller('reviewCtrl', reviewCtrl)

  reviewCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];

  function reviewCtrl($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var REVIEW_LIST = ROOT_URL + 'main/verify/lists?f=json&callback=JSON_CALLBACK';
    var REVIEW_INFO = ROOT_URL + 'main/verify/detail?f=json&callback=JSON_CALLBACK';
    var REVIEW_MODI = ROOT_URL + 'main/verify/verify?f=json&callback=JSON_CALLBACK';

    vm.operationObj = {};
    vm.s_operationObj = {};
    vm.typesObj = {};

    var innerCondi = {};

    vm.operation = [
        { name: '请选择', id: -1},
        { name: '审核通过', id: 1},
        { name: '审核失败', id: 2},
        { name: '禁止申请', id: 3}
    ];

    vm.types = [
        { name: '个人认证', id: 1},
        { name: '机构认证', id: 2},
        { name: '明星认证', id: 3},
        { name: '网红认证', id: 4}
    ];

    vm.objType = {
      '1' : '个人认证',
      '2' : '机构认证',
      '3' : '明星认证',
      '4' : '网红认证'
    }

   	//获得礼物模型列表
    // $http.jsonp(GIFT_MODEL_LIST).success(function(resp) {
    //     vm.mobans_m = resp.list;
    //     vm.mobans = resp.list;
    // }).error(function(data) {
    //     // alert('error')
    // });

    vm.isNullObj = function(obj) {
      for(var i in obj) {
        if(obj[i]) {
          console.log('false')
          return false;
        }
      }
      return true;  
    }

    vm.currentPage = 1;

    //加载
    vm.O_loadData = function(condition) {

      var params = {};

      if(!vm.isNullObj(innerCondi)) {
        params = Object.assign(innerCondi, {'page' : condition});
      }else if(typeof condition === 'number') {
        params = {status : -1,page : vm.currentPage || 1};
      }else{
        params = {status : -1,page : 1};
      }

      console.log(params);

      $http.jsonp(REVIEW_LIST, {
        params : params
      }).success(function(resp) {
        vm.datas = resp.list;
        vm.totalNum = resp.total_page;

        vm.$emit('initRender');
      }).error(function(data) {
        // alert('error')
      });
    }

    vm.O_loadData();


    vm.setCurId = function(id) {
      vm.curId = id;
    }

    

    vm.getAdInfo = function(id) {
      vm.curId = id;
      $http.jsonp(REVIEW_INFO, {
          params : {id : id}
        }).success(function(resp) {
          if(!resp.errcode) {

            vm.realName = resp.real_name;
            vm.mobile = resp.mobile;
            vm.id_number = resp.id_number;

            vm.photoes1 = 'http://'+resp.photos[0].replace(':','.qiniu.yddapp.com/');
            vm.photoes2 = 'http://'+resp.photos[1].replace(':','.qiniu.yddapp.com/');

            vm.reviewDesc = resp.verified_info;
            vm.sample_links = resp.sample_links;

            $timeout(function() {
              $('#reason').text(resp.reason)
            },100);

            //operationObj
            vm.operationObj.selected = vm.operation[resp.status];

            //types
            vm.typesObj.selected = vm.types[Number(resp.verify_type) - 1];

          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }

    vm.modiAd = function() {
    	var options = {
    		id : vm.curId,
    		status : vm.operationObj.selected ? vm.operationObj.selected['id'] : 0,
        type : vm.typesObj.selected ? vm.typesObj.selected['id'] : 0,
    		verified_info : vm.reviewDesc
    	}

      if(options['status'] == 2 || options['status'] == 3) {
        options['reason'] = $('#reason').val();
      }

    	$http.jsonp(REVIEW_MODI, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.O_loadData();
          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }

    vm.searchIt = function() {
      var condi = {};

      condi = {
        'page' : 1,
        'status' : vm.s_operationObj.selected ? vm.s_operationObj.selected['id'] : '-1',
        'no' : vm.s_id,
        'nickname' : vm.s_nickname,
        'real_name' : vm.s_realname
      }

      console.log(condi)
      innerCondi = condi;

      vm.O_loadData();
    }

    vm.resetIt = function() {
      vm.s_nickname = null;
      vm.s_id = null;
      vm.s_realname = null;
      vm.s_operationObj.selected = null;
      innerCondi = {};
      vm.currentPage = 1;

      vm.O_loadData();

    }


}
	