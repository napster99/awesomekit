'use strict';

//话题包管理
angular
  .module('app')
  .controller('TopicConfigCtrl', TopicConfigCtrl)

  TopicConfigCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];

  function TopicConfigCtrl($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var TOPIC_GET = ROOT_URL + 'main/topic/get_top?f=json&callback=JSON_CALLBACK';
    var TOPIC_SET = ROOT_URL + 'main/topic/set_top?f=json&callback=JSON_CALLBACK';
    
    var SEARCH_LIST = ROOT_URL + 'main/topic/top_search?f=json&callback=JSON_CALLBACK';  //query

    vm.topicsObj1 = {};
    vm.topicsObj2 = {};
    vm.topicsObj3 = {};

    vm.topics1 = [];
    vm.topics2 = [];
    vm.topics3 = [];




    // $timeout(function() {
      $('div[name=search] input').on('keyup',  function(event) {
        var curValue = this.value;
        var index = $(this).parents('div.form-group').index() + 1;
        if(!curValue|| curValue.replace(/\s+/g,'') === '') 
          return;

        $http.jsonp(SEARCH_LIST, {
          params : {
            query : curValue
          }
        }).success(function(resp) {
            console.log(resp)
            vm['topics'+index] = resp.list;
        })

      });
    // },0)
    
   	//获得礼物模型列表
    $http.jsonp(TOPIC_GET).success(function(resp) {

      console.log('>>get', resp)

        vm.topics1.push(resp['0'])
        vm.topics2.push(resp['1'])
        vm.topics3.push(resp['2'])

        vm.topicsObj1.selected = [vm.topics1[0]];
        vm.topicsObj2.selected = [vm.topics2[0]];
        vm.topicsObj3.selected = [vm.topics3[0]];

    }).error(function(data) {
    });


    
    //保存
    vm.saveIt = function() {
        var topicText1 = $('div[name=search] input').first().val().replace(/\s+/g,'');
        var topicText2 = $('div[name=search] input').eq(1).val().replace(/\s+/g,'');
        var topicText3 = $('div[name=search] input').eq(2).val().replace(/\s+/g,'');

        var topicSelectObj1 = vm.topicsObj1;
        var topicSelectObj2 = vm.topicsObj2;
        var topicSelectObj3 = vm.topicsObj3;

        var options = {'topics' : []};


        for(var i=1; i<4; i++) {
          if(eval('topicSelectObj'+i).selected.length > 0) {
              options['topics'].push({
                'id' : eval('topicSelectObj'+i).selected[0]['id'],
                'topic' : eval('topicSelectObj'+i).selected[0]['topic']
              });
          } else {
              if(eval('topicText'+i) === '') {
                  toastr.error('请输入自定义话题内容');
                  return;
              }else if( eval('topicText'+i).length > 32) {
                  toastr.error('自定义话题内容字数不得超过32个');
                  return;
              }else{
                  options['topics'].push({'topic' : eval('topicText'+i)});
              }
          }
        }


        console.log(options)

        options['topics'] = JSON.stringify(options['topics']);

        $http.jsonp(TOPIC_SET,{
          params : options
        }).success(function(resp) {
          toastr.success('操作成功');
        }).error(function(data) {
        });

    }

    // $(_searchInput).val('');  //清空选项 支持napster1

    // ctrl.close = function(skipFocusser) {
    //   if (!ctrl.open) return;
    //   _resetSearchInput();

    //   var tipDom =  $(_searchInput).parents('div[nap=tip]');
    //   console.log('>>>>>>', tipDom.attr('flag'))

    //   if(skipFocusser !== false) {
    //     //支持1 不在数据范围内 enter有效 napster
    //     // console.log('value>>>',$(_searchInput).val())
    //     if($(_searchInput).val().replace(/\s+/g,'') !== '' && ctrl.items.length == 0) {
    //       // var tipDom =  $(_searchInput).parents('div[nap=tip]');
    //       if(tipDom[0]) {
    //         var flag = tipDom.attr('flag');

    //         console.log('flag',flag)
    //         if(flag == preSameDom) {
    //           ctrl.open = false;
    //         }else{
    //           ctrl.open = true;
    //         }

    //       }else{
    //         ctrl.open = true;
    //       }
    //     }else{
    //       ctrl.open = true;
    //     }
    //   }else{
    //     ctrl.open = false;
    //   }

    //   if (!ctrl.multiple){
    //     $timeout(function(){
    //       ctrl.focusser.prop('disabled', false);
    //       if (!skipFocusser) ctrl.focusser[0].focus();
    //     },0,false);
    //   }

    //   preSameDom = flag;
      

    // };


}