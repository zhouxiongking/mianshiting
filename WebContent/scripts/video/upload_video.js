$(function()
{
	//使用自定义的下拉列表
	mySelect.toMySelect("product-video-style", "video").pListEvent("product-video-style").topEvent();
});

/**
 * 首先进行校验填写的内容，校验通过后显示出等待上传的div
 * @return
 */
function showUploadingGif()
{
	//主题
	var title = $("#video-title").val();
	//视频描述
	var description = $("#video-description").val();
	//视频剪辑时间
	var time = $("#cliptime").val();
	var reg = new RegExp("^[0-9]*$");
	//上传视频总数
	var totalNum = parseInt($("#total-video-num").val());
	if(!title || title.trim().length == 0)
	{
		$(".fill-info").show();
		$("#video-title").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#video-title").css("border", "1px solid #ccc");
	}
	
	if(!description || description.trim().length == 0)
	{
		$(".fill-info").show();
		$("#video-description").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#video-description").css("border", "1px solid #ccc");
	}
	
	if(!time || time.trim() == "")
	{
		$(".fill-info").show();
		$("#cliptime").css("border", "1px solid red");
	}
	else if(!reg.test(time))
	{
		$("#error-time").show();
		$("#cliptime").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#error-time").hide();
		$("#cliptime").css("border", "1px solid #ccc");
	}
	
	if(totalNum == 0)
	{
		$(".upload-video-tip").text("请上传视频");
	}
	else
	{
		$(".upload-video-tip").text("");
	}
	
	if(title && title.trim().length > 0 && description && description.trim().length > 0 
			 && time && time.trim().length > 0 && reg.test(time) && totalNum > 0)
	{
		$(".shield_down_div").show();
		$(".uploading_tip").show();
		return true;
	}
	
	return false;
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










