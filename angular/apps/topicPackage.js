'use strict';

//话题包管理
angular
  .module('app')
  .controller('TopicPackageCtrl', TopicPackageCtrl)
  .controller('TopicPackageCtrl2', TopicPackageCtrl2);

  TopicPackageCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];

  function TopicPackageCtrl($scope, $http, ROOT_URL, $timeout) {

    var vm = $scope;

    var MODEL_ADD = ROOT_URL + 'main/gift/model_edit?f=json&callback=JSON_CALLBACK';
    var MODEL_LIST = ROOT_URL + 'main/gift/model_list?f=json&callback=JSON_CALLBACK';
    var MODEL_INFO = ROOT_URL + 'main/gift/model_detail?f=json&callback=JSON_CALLBACK';
    var GIFT_ADD = ROOT_URL + 'main/gift/gift_edit?f=json&callback=JSON_CALLBACK';



    vm.modelName_m = '';   //礼物名称
    vm.giftPrice_m = '';   //礼物价格
    vm.rate_m = '';   //金豆转换比例

    vm.status_m = true; //状态

    vm.typesObj_m = {};
    vm.typesObj = {};
    vm.keywordsObj1 = {};


    vm.keywords1 = [{'id' : 1, 'name' : '唱歌'},{'id' : 2, 'name' : '游戏'},{'id' : 3, 'name' : '兴趣'}];

    vm.types = [{'id' : 1, 'name' : '随机话题'},{'id' : 2, 'name' : '剧情话题'}]

    vm.openLuckyGift_m = true; //是否开启幸运礼物

    vm.luck_setting_m = [{'amount' : '','probability' : ''}];
    vm.delBtn_m = false;


    
    vm.datas = [];
    //FOR TEST DATA
    for(var i=1; i<10; i++) {
      vm.datas.push({'name' : '话题' + i, 'count' : 23425,'type' : (i%2 == 0) ?  1 : 2,'score' : 43235})
    }

    vm.totalNum = 1;
    vm.currentPage = 1;
    $timeout(function() {
      vm.$emit('initRender');
    },1000)



    //加载
    // vm.O_loadData = function() {

    //   $http.jsonp(MODEL_LIST, {
    //     params : {page : vm.currentPage || 1}
    //   }).success(function(resp) {
    //   	console.log(resp)
    //     vm.datas = resp.list;
    //     vm.totalNum = resp.total_page;

    //     vm.$emit('initRender');
    //   }).error(function(data) {
    //   });
    // }

    // vm.O_loadData();

    vm.setCurId = function(id) {
      vm.curId = id;
    }



    vm.modiAd = function() {
    	
    	
    }


    vm.newIt = function() {
      vm.luck_setting_m.push([{'amount' : '' , 'probability' : ''}]);
      if(vm.luck_setting_m.length > 0) {
        vm.delBtn_m = false;
      }else{
        vm.delBtn_m = true;
      }
    }


    vm.delIt = function() {
      vm.luck_setting_m.pop();
      if(vm.luck_setting_m.length > 0) {
        vm.delBtn_m = false;
      }else{
        vm.delBtn_m = true;
      }
    }


}
	// =========================================================================

  TopicPackageCtrl2.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];
  

  function TopicPackageCtrl2($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var MODEL_ADD = ROOT_URL + 'main/gift/model_edit?f=json&callback=JSON_CALLBACK';



    vm.modelName = '';   //礼物名称
    vm.giftPrice = '';   //礼物价格
    vm.rate = '';   //金豆转换比例

    vm.status = true; //状态

    vm.typesObj = {};

    vm.openLuckyGift = true; //是否开启幸运礼物

    vm.luck_setting = [{'amount' : '','probability' : ''}];
    vm.delBtn = false;


   
    
    vm.addIt = function() {

      var lunckys = [], 
          amountInputs = $('input[name=amount]'), 
          probabilityInputs = $('input[name=probability]');

      for(var i=0; i<amountInputs.length; i++) {
          lunckys.push({
            'amount' : amountInputs[i].value,
            'probability' : probabilityInputs[i].value
          })        
      }

    	var options = {
    		name : vm.modelName,
    		price : vm.giftPrice,
    		percentage : vm.rate,
    		status : vm.status ? 1 : 0,
    		type : vm.typesObj.selected['id'],
    		lucky : vm.openLuckyGift ? 1 : 0,
        luck_setting : []
    	}

    	if(vm.openLuckyGift) {
        options['luck_setting'] = JSON.stringify(lunckys);
    	}else{
        delete options['luck_setting'];
      }

    	$http.jsonp(MODEL_ADD, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {
          	vm.resetIt();
            //TODO reflash list
          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }

    vm.newIt = function() {
      vm.luck_setting.push([{'amount' : '' , 'probability' : ''}]);
      if(vm.luck_setting.length > 0) {
        vm.delBtn = false;
      }else{
        vm.delBtn = true;
      }
    }


    vm.delIt = function() {
      vm.luck_setting.pop();
      if(vm.luck_setting.length > 0) {
        vm.delBtn = false;
      }else{
        vm.delBtn = true;
      }
    }


    vm.resetIt = function() {
      vm.modelName = '';   //礼物名称
      vm.giftPrice = '';   //礼物价格
      vm.rate = '';   //金豆转换比例
      vm.status = true; //状态
      vm.typesObj = {};
      vm.openLuckyGift = true; //是否开启幸运礼物
      vm.luck_setting = [{'amount' : '','probability' : ''}];
      vm.delBtn = false;
    }


}