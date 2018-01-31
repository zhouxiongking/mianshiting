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
 * 选择一个视频文件后的事件
 * @return
 */
function doChoose()
{
	//表示视频数的hidden元素值加1
	var curNum = parseInt($("#total-video-num").val());
	$("#total-video-num").val(curNum + 1);
}










