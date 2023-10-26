<template>
  <input type="file" class="form-control" name="file" id="filedata" placeholder="upload"
         style="margin-bottom:5px;">
  <button onclick="uploadfile(this);">上传视频文件</button>
  <input type="hidden" class="form-control" name="videoUrl" id="urlId" placeholder="请输入视频链接"
         style="margin-bottom:5px;">
  <span id="isfile"></span>
  <div id="successAlertFile" class="alert alert-success"
       style="display:none;">
    <span id="successAlertFile_msg"></span>
  </div>
</template>


<script setup>
function uploadfile(el) {
  var formData = new FormData();
  var file = $(el).siblings().filter('#filedata').prop('files')[0];
  formData.append("file", $(el).siblings().filter('#filedata').prop('files')[0]);
  if(file != null && file != ''){
    if (file.size < 104857600) {
      $.ajax({
        url: '${s.base}/video/upload.html',
        type: 'POST',
        data: formData,
        processData: false, // 不要对data参数进行序列化处理，默认为true
        contentType: false, // 不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
        xhr: function () {
          myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            myXhr.upload.addEventListener('progress', function (e) {
              if (e.lengthComputable) {
                var percent = Math.floor(e.loaded / e.total * 100);
                $(el).siblings().filter('#isfile').html(percent.toString() + '%');
                if (percent == 100) {
                  $(el).siblings().filter('#isfile').html("正在上传：" + "<img src='${s.base}/res/i/loading.gif'/>");
                }
              }
            }, false);
          }
          return myXhr;
        },
        success: function (respText) {
          var resp = $.parseJSON(respText);
          if (resp.errcode == 0) {
            console.log(resp,"---success----");
            $(el).siblings().filter('#isfile').html('');
            $(el).siblings().filter('#successAlertFile').show().fadeOut(3000);//显示模态框
            $(el).siblings().filter('#successAlertFile').children().css('color', 'green').html('上传成功！');
            $(el).siblings().filter('#urlId').val(resp.data.path);
          } else {
            $(el).siblings().filter('#successAlertFile').show().fadeOut(3000);
            $(el).siblings().filter('#successAlertFile').children().css('color', 'red').html('文件名称重复，请重新上传！');
            $(el).siblings().filter('#isfile').html('');
          }
        },
        error: function (res) {
// 请求失败
          console.log(res);
          $(el).siblings().filter('#successAlertFile').show().fadeOut(3000);
          $(el).siblings().filter('#successAlertFile').children().css('color', 'red').html('上传失败，请重新上传！');
          $(el).siblings().filter('#isfile').html('');
        }
      });
    } else {
      $(el).siblings().filter('#successAlertFile').show().fadeOut(3000);
      $(el).siblings().filter('#successAlertFile').children().css('color', 'red').html('上传视频不能大于100MB！');
    }
  } else {
    $(el).siblings().filter('#successAlertFile').show().fadeOut(3000);
    $(el).siblings().filter('#successAlertFile').children().css('color', 'red').html('上传视频不能为空！');
  }
  /* var demo =  $(el).siblings().filter('#urlId').val()
  console.log(demo,"----demo---")*/
}

</script>
