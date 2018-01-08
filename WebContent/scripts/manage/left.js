$(function()
{
	/**
	 * 点击一级标题栏显示或者隐藏下面的标题栏
	 */
	$(".h_floot_leftdiv .co20 h4").each(function(index)
	{
		$(this).click(function()
		{
			$("#left_" + (index + 1)).toggle();
			if($(this).css("background-position") == "100% 8px")
			{
				$(this).css("background-position", "100% -16px");
			}
			else
			{
				$(this).css("background-position", "100% 8px");
			}
		})
	})
	
	
	// 点击a标签，关闭或者显示相应的div
	var lastShowDiv = $("#show-help-content-0").show();
	$(".co20 dl dt a").each(function(index)
	{
		$(this).click(function()
		{
			if(lastShowDiv)
			{
				lastShowDiv.hide();
			}
			var curObj = $("#show-help-content-" + index).show();
			//curObj.show();
			lastShowDiv = curObj;
			
		})
	})
})