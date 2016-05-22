'use strict';

//礼物管理
angular
  .module('app')
  .controller('GiftConfigCtrl', GiftConfigCtrl)
  .controller('GiftConfigCtrl2', GiftConfigCtrl2);

  GiftConfigCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];

  function GiftConfigCtrl($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var GIFT_LIST = ROOT_URL + 'main/gift/gift_list?f=json&callback=JSON_CALLBACK';
    var GIFT_MODEL_LIST = ROOT_URL + 'main/gift/model_list?f=json&callback=JSON_CALLBACK';
    var AD_MODI = ROOT_URL + 'main/ad/banner?f=json&callback=JSON_CALLBACK';
    var GIFT_DEL = ROOT_URL + 'main/gift/model_detail?f=json&callback=JSON_CALLBACK';
    var GIFT_INFO = ROOT_URL + 'main/gift/gift_detail?f=json&callback=JSON_CALLBACK';
    var GIFT_ADD = ROOT_URL + 'main/gift/gift_edit?f=json&callback=JSON_CALLBACK';

    var FILE_UP = ROOT_URL + 'main/attachment/pic_form?f=json';
    var SEARCH_LIST = ROOT_URL + 'main/user/id_nickname_search?f=json&callback=JSON_CALLBACK';  //query

    vm.derail_m = true;
    vm.personality_m = true;
    vm.mobans_m = [];
    vm.people_m = [];
    vm.multipleDemo = {};

    vm.curImageUrl = ''

    var images_m = '';


    // vm.mobans = [
    //     { name: 'Adam',      id: 12},
    //     { name: 'Amalie',    id: 12},
    //     { name: 'Estefanía', id: 21},
    //     { name: 'Adrian',    id: 21},
    //     { name: 'Wladimir',  id: 30},
    //     { name: 'Samantha',  id: 30},
    //     { name: 'Nicole',    id: 43},
    //     { name: 'Natasha',   id: 54},
    //     { name: 'Michael',   id: 15},
    //     { name: 'Nicolás',   id: 43}
    // ];

   	//获得礼物模型列表
    $http.jsonp(GIFT_MODEL_LIST).success(function(resp) {
        vm.mobans_m = resp.list;
        vm.mobans = resp.list;
    }).error(function(data) {
        // alert('error')
    });


    vm.currentPage = 1;

    //加载
    vm.O_loadData = function() {

      $http.jsonp(GIFT_LIST, {
        params : {page : vm.currentPage || 1}
      }).success(function(resp) {
      	console.log(resp)
        vm.datas = resp.list;
        vm.totalNum = resp.total_page;

        vm.$emit('initRender');
      }).error(function(data) {
        // alert('error')
      });
    }

    vm.O_loadData();

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
          // alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
        },
        'onUploadSuccess' : function(file, data, response) {
          callback(data, response);
        }

      });
    }
    // $timeout(function() {
	    	uploadPic($("#file_upload1_m"), function(data, response) {
	          if(response) {
	            images_m = JSON.parse(data).src;
	            // self.images_720_1280 = false;
	          }
	      });
    // }, 0)



    vm.setCurId = function(id) {
      vm.curId = id;
    }


    


    vm.getAdInfo = function(id) {

      vm.curId = id;
      $http.jsonp(GIFT_INFO, {
          params : {id : id}
        }).success(function(resp) {
          if(!resp.errcode) {

          	console.log(resp)
          	vm.giftName_m = resp.name;

            vm.giftDesc_m = resp.desc;
            images_m = resp.icon;
            vm.personality_m = resp.is_default == 1 ? true : false; 

            var selectedArr = [];
            for(var i in resp.members) {
              for(var j in vm.people_m) {
                if(resp['members'][i]['uid'] == vm.people_m[j]['uid']) {
                  selectedArr.push(vm.people_m[j])
                }
              }
            }
            console.log(selectedArr)

            vm.multipleDemo.selected = selectedArr;

            //TO DO FOR TEST
            for(var i in vm.mobans_m) {
            	if(vm.mobans_m[i]['id'] == resp.model_id) {
            		vm.mobans_m.selected = vm.mobans_m[i];
            	}
            }

            vm.derail_m = resp.status == 1 ? true : false;

            if(resp.is_default != 1) {
            	vm.switchClick();
            }

          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }

    vm.switchClick = function() {
    	$('#relation_m input').on('keyup',	function(event) {
    		var curValue = this.value;
    		if(!curValue|| curValue.replace(/\s+/g,'') === '') 
    			return;

    		$http.jsonp(SEARCH_LIST, {
    			params : {
    				query : curValue
    			}
    		}).success(function(response) {
    				vm.people_m = response.list;
    		})

    	});
    }

    vm.modiAd = function() {
    	
    	var options = {
    		id : vm.curId,
    		name : vm.giftName_m,
    		desc : vm.giftDesc_m,
    		model_id : vm.mobans_m.selected && vm.mobans_m.selected.id,
    		icon : images_m,
    		status : vm.derail_m ? 1 : 0,
    		is_default : vm.personality_m ? 1 : 0,
    		uids : []
    	}


    	if(vm.personality_m) {
    		delete options['uids'];
    	}else{
    		for(var i in vm.people_m.selected) {
    			options['uids'].push(vm.people_m.selected[i]['uid']);
    		}

    		options['uids'] = options['uids'].toString();
    	}
    	
    	$http.jsonp(GIFT_ADD, {
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


}
	// =========================================================================

  GiftConfigCtrl2.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];


  function GiftConfigCtrl2($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var AD_MODI = ROOT_URL + 'main/ad/banner?f=json&callback=JSON_CALLBACK';
    var FILE_UP = ROOT_URL + 'main/attachment/pic_form?f=json';
		var SEARCH_LIST = ROOT_URL + 'main/user/id_nickname_search?f=json&callback=JSON_CALLBACK';  //query
    var GIFT_ADD = ROOT_URL + 'main/gift/gift_edit?f=json&callback=JSON_CALLBACK';



    vm.personality = true;
    vm.derail = true;

    vm.peopleObj = {};
		vm.people = [];

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
          // alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
        },
        'onUploadSuccess' : function(file, data, response) {
          callback(data, response);
        }

      });
    }

    vm.switchClick = function() {

    	$('#relation input').on('keyup',	function(event) {
    		var curValue = this.value;
    		console.log(curValue)
    		if(!curValue|| curValue.replace(/\s+/g,'') === '') 
    			return;

    		$http.jsonp(SEARCH_LIST, {
    			params : {
    				query : curValue
    			}
    		}).success(function(resp) {
    				vm.people = resp.list;
    		})

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

    	var options = {
    		name : vm.giftName,
    		desc : vm.giftDesc,
    		model_id : vm.mobans.selected && vm.mobans.selected.id,
    		icon : images,
    		status : vm.derail ? 1 : 0,
    		is_default : vm.personality ? 1 : 0,
    		uids : []
    	}

    	if(vm.personality) {
    		delete options['uids'];
    	}else{
    		for(var i in vm.peopleObj.selected) {
    			options['uids'].push(vm.peopleObj.selected[i]['uid']);
    		}

    		options['uids'] = options['uids'].toString();
    	}

    	$http.jsonp(GIFT_ADD, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {

          	vm.giftName = null;
            vm.mobans.selected = [];
            vm.giftDesc = null;
            images = null;
            vm.personality = true;
            vm.peopleObj.selected = [];
            vm.derail = true;

            //TODO reflash

          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }


    vm.resetIt = function() {
      vm.giftName = null;
	    vm.mobans.selected = [];
	    vm.giftDesc = null;
	    images = null;
	    vm.personality = true;
	    vm.peopleObj.selected = [];
	    vm.derail = true;
    }


}