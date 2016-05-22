// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('LoginCtrl', LoginCtrl);

      LoginCtrl.$inject = ['$scope', '$interval', '$http', '$state', 'ROOT_URL'];

      function LoginCtrl($scope, $interval, $http, $state, ROOT_URL){
        var vm = $scope;
        
        vm.button_clicked = false;
        vm.text = '发送验证码';

        var SEND_QRCODE = ROOT_URL + 'main/auth/send_code?f=json&callback=JSON_CALLBACK';
        var SEND_LOGIN = ROOT_URL + 'main/auth/login?f=json&callback=JSON_CALLBACK';

        //发送验证码
        vm.sendQR = function() {
        	if(vm.mobile) {
        		$http.jsonp(SEND_QRCODE, {
        			params : {mobile : vm.mobile}
        		}).success(function(datas) {
  						console.log(datas)
  						vm.button_clicked = true;
          		vm.text = '已发送(60s)';
          		vm.count = 6;
          		var timer = $interval(function(){
          			if(vm.count > 0) {
          				vm.count--;
          				vm.text = '已发送('+vm.count+'s)';
          			}
  						},1000, 6);
  						timer.then(function() {
  							vm.button_clicked = false;
          			vm.text = '发送验证码';
  						});
  					}).error(function(data) {
  						alert('error')
  					});

        		
        	}
        }

        //登录
        vm.login = function() {
        	if(vm.mobile && vm.qrcode) {
        		console.log(vm.mobile, vm.qrcode)
        		$http.jsonp(SEND_LOGIN, {
        			params : {
	        			mobile : vm.mobile,
	        			verify : vm.qrcode
        			}
        		}).success(function(datas) {
							
							if(datas.errcode != 0) {
								alert(datas.errmsg)
							}else{
								$state.go('app.dashboard');
							}
						}).error(function(data) {
							alert('error')
						});
        	}
        }




      }
      
})();
