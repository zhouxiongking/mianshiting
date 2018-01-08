$(function()
{
	/**
	 * 大图的div中，自动切换图片
	 */
	interval = setInterval("changePic('no', 'next')", 5000);
	
	/**
	 * 鼠标在下面红点上则移动到相应的图片
	 */
	var speSpan = $("#FS_numList_01 span:eq(0)");
	$("#FS_numList_01 span").each(function(index)
	{
		$(this).hover(function()
		{
			$(".VDF_focus .vdm_focus .focusbg_img .focusbg_imgul").animate({"left": index * -1000 + "px"}, 20);
			$("#FS_numList_01 span.selected").removeClass("selected");
			$(this).addClass("selected");
		})
	})
})

/**
 * 自动切换图片
 * @return
 */
function changePic(isStop, type)
{
	var speIndex, left;
	if(isStop == "yes")
	{
		clearInterval(interval);
	}
	$("#FS_numList_01 span").each(function(index)
	{
		if($(this).attr("class") == "selected")
		{
			speIndex = index;
		}
	})
	
	if(type == "pre")
	{
		left = speIndex == 0 ? -2000 : speIndex * -1000 + 1000;
		speIndex = speIndex == 0 ? 2 : speIndex - 1;
	}
	else if(type == "next")
	{
		left = speIndex == 2 ? 0 : speIndex * -1000 - 1000;
		speIndex = speIndex == 2 ? 0 : speIndex + 1;
	}
	
	//改变div的位置，左移
	$(".VDF_focus .vdm_focus .focusbg_img .focusbg_imgul").animate({"left": left + "px"}, 500);
	//改变下面的红点的位置
	$("#FS_numList_01 span.selected").removeClass("selected");
	$("#FS_numList_01 span:eq(" + speIndex + ")").addClass("selected");
	if(isStop == "yes")
	{
		interval = setInterval("changePic('no', 'next')", 5000);
	}
}


















