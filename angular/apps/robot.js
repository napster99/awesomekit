'use strict';

//机器人状态
angular
  .module('app')
  .controller('RobotCtrl', RobotCtrl)
  .controller('RobotCtrl2', RobotCtrl2);

  RobotCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];

  function RobotCtrl($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var AD_LIST = ROOT_URL + 'main/ad/banner_list?f=json&callback=JSON_CALLBACK';
    var AD_MODI = ROOT_URL + 'main/ad/banner?f=json&callback=JSON_CALLBACK';
    var AD_DEL = ROOT_URL + 'main/ad/banner_del?f=json&callback=JSON_CALLBACK';
    var AD_INFO = ROOT_URL + 'main/ad/banner_detail?f=json&callback=JSON_CALLBACK';




    vm.currentPage = 1;

    vm.datas = [
    {'id' : 34325,'account' : '机器人1号','password' : 111111,'roomid' : '2342154' ,'status' : 0, 'count' : 34},
    {'id' : 62824,'account' : '机器人2号','password' : 222222,'roomid' : '3476347' ,'status' : 1, 'count' : 23},
    {'id' : 26753,'account' : '机器人3号','password' : 333333,'roomid' : '7659969' ,'status' : 1, 'count' : 46},
    {'id' : 68562,'account' : '机器人4号','password' : 444444,'roomid' : '1424575' ,'status' : 0, 'count' : 36},
    {'id' : 72445,'account' : '机器人5号','password' : 555555,'roomid' : '1668456' ,'status' : 0, 'count' : 13},
    {'id' : 34688,'account' : '机器人6号','password' : 666666,'roomid' : '3577363' ,'status' : 1, 'count' : 65},
    {'id' : 12567,'account' : '机器人7号','password' : 777777,'roomid' : '3673266' ,'status' : 0, 'count' : 76},
    {'id' : 14547,'account' : '机器人8号','password' : 888888,'roomid' : '7863455' ,'status' : 1, 'count' : 23},
    {'id' : 45234,'account' : '机器人9号','password' : 999999,'roomid' : '9414364' ,'status' : 0, 'count' : 63},
    {'id' : 23577,'account' : '机器人10号','password' : 101010,'roomid' : '3446523' ,'status' : 1, 'count' : 58},
    {'id' : 24367,'account' : '机器人11号','password' : 111111,'roomid' : '3267242' ,'status' : 1, 'count' : 89}
    ]

    vm.totalNum = 1;
    $timeout(function() {
      vm.$emit('initRender');
    },1000)

    //加载
    // vm.O_loadData = function() {
    //   $http.jsonp(AD_LIST, {
    //     params : {page : vm.currentPage || 1}
    //   }).success(function(resp) {
    //   	console.log(resp)
    //     // vm.datas = resp.list;
    //     vm.totalNum = resp.total_page;

    //     vm.$emit('initRender');
    //   }).error(function(data) {
    //   });
    // }

    // vm.O_loadData();

    vm.setCurId = function(id) {
      vm.curId = id;
    }


    vm.clickIt = function(which) {
    	if(vm.clients[which]) {
    	  vm.clients[which] = false;
    	}
    }


    vm.modiAd = function() {
    	var clients = [];
    	if(vm.first) {
    		clients.push(1);
    	}else{
    		if(vm.clients[1]) {
    			clients.push(1);
    		}
    	}

    	if(vm.second) {
    		clients.push(2);
    	}else{
    		if(vm.clients[2]) {
    		clients.push(2);
    		}
    	}

    	if(vm.third) {
    		clients.push(3);
    	}else{
    		if(vm.clients[3]) {
    		clients.push(3);
    		}
    	}

    	if(vm.four) {
    		clients.push(4);
    	}else{
    		if(vm.clients[4]) {
    			clients.push(4);
    		}
    	}

    	if(vm.five) {
    		clients.push(5);
    	}else{
    		if(vm.clients[5]) {
    		clients.push(5);
    		}
    	}

    	if(vm.six) {

    		clients.push(6);
    	}else{
    		if(vm.clients[6]) {
    			clients.push(6);
    		}
    	}

    	if(vm.six) {
    		clients.push(6);
    	}else{
    		if(vm.clients[6]) {
    		clients.push(6);
    		}
    	}

    	var options = {
    		id : vm.curId,
    		title : vm.adTitle_m,
    		start_datetime : vm.selectedDateAsNumber1,
    		end_datetime : vm.selectedDateAsNumber2,
        open_url : vm.openUrl_m,
    		weight : vm.weight_m,
    		image : vm.images['750_300'],
    		clients : clients.toString()
    	}
    	
    	$http.jsonp(AD_MODI, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.O_loadData();
          }else{
            toastr.error(resp.errmsg)
          }
        }).error(function(data) {
        });
    }

    vm.removeAd = function() {
       $http.jsonp(AD_DEL, {
          params : {id : vm.curId}
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.O_loadData();
          }else{
            oastr.error(resp.errmsg)
          }
        }).error(function(data) {
        });
    }


}



  RobotCtrl2.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];


  Array.prototype.removeIt = function(arrs, el) {
  	for( var i=0; i<arrs.length; i++) {
  		if(el == arrs[i]) {
  			arrs.splice(i,1);
  			break;
  		}
  	}
  	return arrs;
  }


  function RobotCtrl2($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var AD_MODI = ROOT_URL + 'main/ad/banner?f=json&callback=JSON_CALLBACK';
    var FILE_UP = ROOT_URL + 'main/attachment/pic_form?f=json';


    vm.derail = true;

    vm.clients = [1,2,3,4,5,6,7];
    vm.first = true;
    vm.second = true;
    vm.third = true;
    vm.four = true;
    vm.five = true;
    vm.six = true;

    vm.images_720_1280 = false;
    vm.images_1080_1920 = false;
    vm.images_1280_720 = false;
    vm.images_1920_1080 = false;


    vm.curImageUrl = ''

    var images = '';

    function uploadPic(el, callback) {
      el.uploadify({
        'buttonText' : '上传',
        'swf': './apps/mylibs/uploadify.swf',
        'height' : 38,
        'width' : 72,
        'fileObjName' : 'file',
        'uploader'    : FILE_UP,
        'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            $('#progress').html(totalBytesUploaded + ' bytes uploaded of ' + totalBytesTotal + ' bytes.');
        },
        'onUploadError' :  function(file, errorCode, errorMsg, errorString) {
        },
        'onUploadSuccess' : function(file, data, response) {
          callback(data, response);
        }

      });
    }


    // $timeout(function() {
      uploadPic($("#file_upload1"), function(data, response) {
          if(response) {
            images = JSON.parse(data).src;
            // self.images_720_1280 = false;
          }
      });
    // },0)

    //预览图片
    vm.preview = function() {
      if(images) {
        var imageUrl = images.replace(':','.qiniu.yddapp.com/');
        vm.curImageUrl = 'http://'+imageUrl;
      }else{
        vm.curImageUrl = 'null'
      }
    }
    
    vm.addIt = function() {

    	var clients = [1,2,3,4,5,6];

    	if(!vm.first) {
    		clients.removeIt(clients, 1);
    	}
      
    	if(!vm.second) {
    		clients.removeIt(clients, 2);
    	}

    	if(!vm.third) {
    		clients.removeIt(clients, 3);
    	}

    	if(!vm.four) {
    		clients.removeIt(clients, 4);
    	}

    	if(!vm.five) {
    		clients.removeIt(clients, 5);	
    	}

    	if(!vm.six) {
    		clients.removeIt(clients, 6);	
    	}

    
    	var options = {
    		title : vm.adTitle,
    		start_datetime : vm.selectedDateAsNumber12,
    		end_datetime : vm.selectedDateAsNumber22,
    		open_url : vm.openUrl,
        weight : vm.weight,
    		image : images,
        status : vm.derail ? 1 : 0,
    		clients : clients.toString()
    	}
			//2016-05-05 15:37:26

    	$http.jsonp(AD_MODI, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.adTitle = null;
            vm.selectedDateAsNumber12 = null;
            vm.selectedDateAsNumber22 = null;
            vm.openUrl = null;
            vm.derail = 1;
            vm.weight = 0;
            vm.clients = [1,2,3,4,5,6,7];
            
            images = null;

            toastr.success('操作成功')
          }else{
            toastr.error(resp.errmsg)
          }
        }).error(function(data) {
        });
    }


    vm.resetIt = function() {
      images = null;
    }


}