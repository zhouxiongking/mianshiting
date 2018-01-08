/**
 * 首先进行校验填写的内容，校验通过后显示出等待上传的div
 * @return
 */
function showUploadingGif()
{
	//主题
	var title = $("#audio-title").val();
	//总时长
	var time = $("#audio-totaltime").val();
	var reg = new RegExp("^[0-9]*$");
	//上传音频总数
	var totalNum = parseInt($("#total-audio-num").val());
	if(!title || title.trim().length == 0)
	{
		$(".fill-info-title").show();
		$("#audio-title").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info-title").hide();
		$("#audio-title").css("border", "1px solid #ccc");
	}
	
	if(!time || time.trim() == "" || !reg.test(time))
	{
		$(".fill-info-time").show();
		$("#audio-totaltime").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info-time").hide();
		$("#audio-totaltime").css("border", "1px solid #ccc");
	}
	
	if(totalNum == 0)
	{
		$(".upload-audio-tip").text("请上传音频");
	}
	else
	{
		$(".upload-audio-tip").text("");
	}
	
	if(title && title.trim().length > 0 && time && time.trim().length > 0 && totalNum > 0)
	{
		$(".shield_down_div").show();
		$(".uploading_tip").show();
		return true;
	}
	
	return false;
}

/**
 * 选择一个音频文件后的事件
 * @return
 */
function doChoose()
{
	//表示视频数的hidden元素值加1
	var curNum = parseInt($("#total-audio-num").val());
	$("#total-audio-num").val(curNum + 1);
	$(".upload-audio-tip").hide();
}
