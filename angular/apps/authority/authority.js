// code style: https://github.com/johnpapa/angular-styleguide 
//角色管理
'use strict';
angular
  .module('app')
  .controller('AuthorityCtrl', AuthorityCtrl);

  AuthorityCtrl.$inject = ['$scope', '$http'];

  function AuthorityCtrl($scope){
    var vm = $scope;

  }







//用户管理
angular
  .module('app')
  .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$scope', '$http', 'ROOT_URL'];

  function UserCtrl($scope, $http, ROOT_URL) {
    var vm = $scope;

    var USER_LIST = ROOT_URL + 'main/user/list?f=json&callback=JSON_CALLBACK';
    var USER_DEL = ROOT_URL + 'main/user/delete?f=json&callback=JSON_CALLBACK';
    var USER_DIS = ROOT_URL + 'main/user/banned?f=json&callback=JSON_CALLBACK';
    var USER_INFO = ROOT_URL + 'main/user/info?f=json&callback=JSON_CALLBACK';
    var USER_MODI = ROOT_URL + 'main/user/update?f=json&callback=JSON_CALLBACK';
    var USER_ADD = ROOT_URL + 'main/user/create?f=json&callback=JSON_CALLBACK';

    var ROLE_LIST = ROOT_URL + 'main/role/list?f=json&callback=JSON_CALLBACK';

    vm.rolesArr = [];
    vm.userRole = {};

    var oldRoleObj = {};

    $http.jsonp(ROLE_LIST).success(function(resp) {
        for(var i in resp) {
          vm.rolesArr.push(resp[i]);
        }
      }).error(function(data) {
        // alert('error')
      });


    vm.currentPage = 1;

    //加载
    vm.O_loadData = function() {
      $http.jsonp(USER_LIST, {
        params : {page : vm.currentPage || 1}
      }).success(function(resp) {
        vm.datas = resp.user_list
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

    vm.getUserInfo = function(id) {
      vm.curId = id;
      vm.userTitle = '修改用户';

      $http.jsonp(USER_INFO, {
          params : {user_id : id}
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.userName = resp.user.name;
            vm.userPhone = resp.user.phone;
            // vm.userRole = resp.user.role;

            // vm.userRole = oldRoleObj;

            for(var i=0; i<vm.rolesArr.length; i++) {
              if(vm.rolesArr[i]['id'] == resp.user.role) {
                vm.userRole.selected = vm.rolesArr[i];
                break;
              }
            }

            // oldRoleObj = vm.userRole;


          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }

    vm.disUser = function(id, status) {
      $http.jsonp(USER_DIS, {
          params : {user_id : id,is_banned : status == 'ACTIVE'? 1 : 0}
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

    vm.removeUser = function() {
       $http.jsonp(USER_DEL, {
          params : {user_id : vm.curId}
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

    vm.addUser = function() {
      vm.userTitle='添加用户';
      vm.userRole.selected = [];
      delete vm.userName;
      delete vm.userPhone;
    }


    vm.saveUser = function() {
      var URL = vm.userTitle === '添加用户' ? USER_ADD : USER_MODI;

      if(vm.userPhone.replace(/\s+/g,'') === '') {
        alert('手机号不能为空！')
        return;
      }


      if(vm.userRole.selected.length == 0) {
        alert('角色不能为空！')
        return;
      }

      $http.jsonp(URL, {
          params : {
            user_id : vm.curId,
            name : vm.userName,
            phone : vm.userPhone,
            role : vm.userRole.selected['id']
          }
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.userRole.selected = [];
            delete vm.userName;
            delete vm.userPhone;
            vm.O_loadData();
          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });
    }

    vm.searchIt = function() {
      if(vm.searchKey.replace(/\s+/g,'') === '') {
        alert('关键字不能为空');
        return;
      }
      $http.jsonp(USER_LIST, {
        params : {page : 1, name : vm.searchKey}
      }).success(function(resp) {
        vm.datas = resp.user_list
        vm.totalNum = resp.total_page;

        vm.$emit('initRender');
      }).error(function(data) {
        // alert('error')
      });
    }
}

//角色管理
angular
  .module('app')
  .controller('RoleCtrl', RoleCtrl);

  RoleCtrl.$inject = ['$scope', '$http', 'ROOT_URL'];

  function RoleCtrl($scope, $http, ROOT_URL) {
    var vm = $scope;
    var treeObj = null;

    var ROLE_LIST = ROOT_URL + 'main/role/list?f=json&callback=JSON_CALLBACK';
    var ROLE_DEL = ROOT_URL + 'main/role/delete?f=json&callback=JSON_CALLBACK';
    var ROLE_DIS = ROOT_URL + 'main/role/banned?f=json&callback=JSON_CALLBACK';
    var ROLE_INFO = ROOT_URL + 'main/role/get?f=json&callback=JSON_CALLBACK';
    var ROLE_ADD = ROOT_URL + 'main/role/add?f=json&callback=JSON_CALLBACK';
    var ROLE_AUTH_INFO = ROOT_URL + 'main/role/priv_list?f=json&callback=JSON_CALLBACK';


    var setting = {
      check: {
        enable: true
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };

    vm.currentPage = 1;

    //加载
    vm.O_loadData = function() {
      $http.jsonp(ROLE_LIST).success(function(resp) {
        vm.datas = resp;
      }).error(function(data) {
        // alert('error')
      });
    }

    vm.O_loadData();

    vm.setCurId = function(id) {
      vm.curId = id;
    }

    vm.getUserInfo = function(id) {
      vm.curId = id;
      vm.roleTitle = '修改角色';

      $http.jsonp(ROLE_INFO, {
          params : {id : id}
        }).success(function(resp) {
          if(!resp.errcode) {
            vm.roleName = resp.name;
            vm.roleDesc = resp.desc;

            $http.jsonp(ROLE_AUTH_INFO, {
              params : {role_id : id}
            }).success(function(resp) {
              var zNodes = []
              for(var i in resp) {
                zNodes.push(resp[i]);
              }


              treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            })
          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          // alert('error')
        });

    }

    vm.removeRole = function() {
       $http.jsonp(ROLE_DEL, {
          params : {id : vm.curId}
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

    vm.addRole = function() {
      vm.roleTitle='添加角色';

      vm.roleName = null;
      vm.roleDesc = null;
      vm.curId = null;

      $http.jsonp(ROLE_AUTH_INFO).success(function(resp) {
        var zNodes = []
        for(var i in resp) {
          zNodes.push(resp[i]);
        }


        treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      })

    }

    vm.saveRole = function() {
      var options = {
        role_id : vm.curId,
        name : vm.roleName,
        desc : vm.roleDesc,
        operations : []
      }

      if(vm.roleTitle === '添加角色') {
        delete options['role_id'];
      }

      if(!vm.roleName || vm.roleName.replace(/\s+/g,'') === '') {
        toastr.error('角色名不能为空！')
        return;
      }

      var nodes = treeObj.getCheckedNodes(true);
      for(var i=0; i<nodes.length; i++) {
        options['operations'].push(nodes[i]['id']);
      }

      options['operations'] = options['operations'].toString();


      $http.jsonp(ROLE_ADD, {
          params : options
        }).success(function(resp) {
          if(!resp.errcode) {
            delete vm.roleName;
            delete vm.roleDesc;
            vm.O_loadData();
          }else{
            alert(resp.errmsg)
          }
        }).error(function(data) {
          alert('error')
        });
    }

}
