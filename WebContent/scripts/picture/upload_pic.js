$(function()
{
	//使用自定义的下拉列表
	mySelect.toMySelect("product-style", "picture").pListEvent("product-style").topEvent();
	
	/**
	 * 点击‘添加图片’，添加相应的上传图片的div
	 */
	$(".png24").click(function()
	{
		var $obj = $(".add-picture-div");
		var content = [];
		content.push("<div><a href='javascript:;' class='del-btn-a'></a>");
		content.push("<input type='file' name='image' onchange='doChoose();'/><span style='margin-left: 100px;'>以下单张图片描述为选填项</span>");
		content.push("<br/><span class='single-intro'>单张图片描述：</span>");
		content.push("<textarea rows='5' cols='117' name='picinfo' class='spe-textarea'></textarea></div>");
		$obj.append(content.join(""));
		//给删除的a标签添加事件
		delBtnA();
	})
	
	
	
})

/**
 * 点击“叉”，删除已添加的照片
 */
function delBtnA()
{
	$(".add-picture-div div .del-btn-a").each(function()
	{
		$(this).click(function()
		{
			$(this).parent().remove();
			//表示图片总数的hidden元素值减1
			var curNum = parseInt($("#total-picture-num").val());
			$("#total-picture-num").val(curNum - 1);
		})
	})
}

/**
 * 首先进行校验填写的内容，校验通过后显示出等待上传的div
 * @return
 */
function showUploadingGif()
{
	//主题
	var theme = $("#picture-theme").val();
	//图片集描述
	var description = $("#picture-description").val();
	//上传图片总数
	var totalNum = $("#total-picture-num").val();
	if(!theme || theme.trim().length == 0)
	{
		$(".fill-info").show();
		$("#picture-theme").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#picture-theme").css("border", "1px solid #ccc");
	}
	
	if(!description || description.trim().length == 0)
	{
		$(".fill-info").show();
		$("#picture-description").css("border", "1px solid red");
	}
	else
	{
		$(".fill-info").hide();
		$("#picture-description").css("border", "1px solid #ccc");
	}
	
	if(totalNum == 0)
	{
		$(".upload-pic-tip").text("请上传图片");
	}
	else
	{
		$(".upload-pic-tip").text("");
	}
	
	if(theme && theme.trim().length > 0 && description && description.trim().length > 0 && totalNum > 0)
	{
		$(".shield_down_div").show();
		$(".uploading_tip").show();
		return true;
	}
	
	return false;
}

/**
 * 选择一张图片后的事件
 * @return
 */
function doChoose()
{
	//表示图片总数的hidden元素值加1
	var curNum = parseInt($("#total-picture-num").val());
	$("#total-picture-num").val(curNum + 1);
}






