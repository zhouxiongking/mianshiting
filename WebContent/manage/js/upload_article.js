$(function()
{
	//使用自定义的下拉列表
	mySelect.toMySelect("product-article-style", "video").pListEvent("product-article-style").topEvent();
});

/**
 * 首先进行校验填写的内容，校验通过后显示出等待上传的div
 * @return
 */
function showUploadingGif()
{
	//主题
	var title = $("#article-title").val();
	//内容
	var content = $("#article-content").val();
	// 标签
	var label = $("#article-label").val();
	var reg = new RegExp("^[0-9]*$");
	if(!title || title.trim().length == 0)
	{
		$(".fill-info").show();
		$("#article-title").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#article-title").css("border", "1px solid #ccc");
	}
	
	if(!label || label.trim().length == 0)
	{
		$(".fill-info").show();
		$("#article-label").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#article-label").css("border", "1px solid #ccc");
	}
	
	if(!content || content.trim().length == 0)
	{
		$(".fill-info").show();
		$("#article-content").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#article-content").css("border", "1px solid #ccc");
	}
	
	if(title && title.trim().length > 0 && content && content.trim().length > 0 
	  )
	{
		$(".shield_down_div").show();
		$(".uploading_tip").show();
		return true;
	}
	
	return false;
}

/**
 * 检测上传按钮
 */
function uploadPic(event) {
	var input = event.target;
    if (!input) {
        alert("找不到 fileinput 元素.");
    }
    else if (!input.files) {
        alert("该浏览器不支持input[`files`]属性.");
    }
    else if (!input.files[0]) {
        alert("请选择文件");
    }
    else {
        var files = input.files;
        handleFiles(files);
    }
}

/**
 * 辅助函数
 */
var util = {
    typeFlag: false,
    sizeFlag: false,
    isImage: function (type) {
        return type.indexOf('image') > -1;
    },
    isProperSize: function (size) {
        return Math.floor(size / 1024 / 1024) < 6;
    }
};

/**
 * 上传图片
 * @param files
 */
function handleFiles(files) {
	if (!files.length) { //判断拖拽的文件数
        return false;
    }

    for (var i = 0; i < files.length; i++) {
        if (!util.isProperSize(files[i].size)) {
            util.sizeFlag = true;
            break;
        }
    }
    
    if (util.sizeFlag) {
        alert('请保证每个文件小于20M');
        util.sizeFlag = false;
        return false;
    }
    
    // 判断图片类型
    if(files[0].type.indexOf('image') < 0) {
    	alert('请上传图片类型');
    	return false;
    }

    var formData = new FormData();
    formData.append('file', files[0]);
    formData.append('filename', files[0].name);
    //2.拖拽完自动上传
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('file_' + i, files[i]);
        formData.append('filename_' + i, files[i].name);
    }

    $.ajax({
        url: '/article-json/uploadPicToOSS',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            var list = response.split(',');
            list.forEach(function (str) {
                $(".result").append(copyEl(str));
            });
        },
        error: function (xhr, err) {
            
        }
    });
}

/**
 * 选择一个视频文件后的事件
 * @return
 */
function doChoose()
{
	//表示视频数的hidden元素值加1
	var curNum = parseInt($("#total-video-num").val());
	$("#total-video-num").val(curNum + 1);
}










