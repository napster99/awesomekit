'use strict';

//敏感词库管理
angular
  .module('app')
  .controller('SensitiveCtrl', SensitiveCtrl)
  .controller('SensitiveCtrl2', SensitiveCtrl2);

  SensitiveCtrl.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];
  
  var file_src1 = '', file_src2 = '';

  function SensitiveCtrl($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var FILE_UP = ROOT_URL + 'main/badword/upload?f=json';
    var FILE_DOWNLOAD = ROOT_URL + 'main/badword/down?f=json&callback=JSON_CALLBACK';

    function uploadPic(el, callback) {
      el.uploadify({
        'buttonText' : '上传房间敏感词',
        'swf': './apps/mylibs/uploadify.swf',
        'height' : 38,
        'width' : 130,
        'formData' : {
          'type' : 'room'
        },
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

  	uploadPic($("#file_upload1"), function(data, response) {
        if(response) {
          alert('上传成功')
        }
    });

    vm.downFile1 = function() {
      $http.jsonp(FILE_DOWNLOAD, {
        params : {'type' : 'room'}
      }).success(function(resp) {
        console.log(resp)
        window.location.href = resp.down_file;
      }).error(function(data) {
      });
    }


}
	// =========================================================================

  SensitiveCtrl2.$inject = ['$scope', '$http', 'ROOT_URL', '$timeout'];


  function SensitiveCtrl2($scope, $http, ROOT_URL, $timeout) {
    var vm = $scope;

    var FILE_UP = ROOT_URL + 'main/badword/upload?f=json';
    var FILE_DOWNLOAD = ROOT_URL + 'main/badword/down?f=json&callback=JSON_CALLBACK';


    function uploadPic(el, callback) {
      el.uploadify({
        'buttonText' : '上传昵称敏感词',
        'swf': './apps/mylibs/uploadify.swf',
        'height' : 38,
        'width' : 130,
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

    uploadPic($("#file_upload2"), function(data, response) {
        if(response) {
          alert('上传成功')
        }
    });

    vm.downFile2 = function() {
      $http.jsonp(FILE_DOWNLOAD, {
        params : {'type' : 'nickname'}
      }).success(function(resp) {
        console.log(resp)
        window.location.href = resp.down_file;
      }).error(function(data) {
      });
    }


}