$(function()
{
	//使用自定义的下拉列表
	mySelect.toMySelect("product-article-style", "video").pListEvent("product-article-style").topEvent();
});

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
    formData.append('picture', files[0]);
    formData.append('pictureFileName', files[0].name);

    $.ajax({
        url: '/article-json/uploadPicToOSS',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            $("#return-pic-url").text(response.picUrl);
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











