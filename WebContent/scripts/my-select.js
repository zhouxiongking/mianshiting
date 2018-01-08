/**
 * 自定义下拉列表插件
 */
var mySelect = 
{
	//初始化成自定义下拉列表
	toMySelect: function(id, type)
	{
		var $obj = $("#" + id);
		var that = this;
		var content = [], text;
		var left;
		if("picture" == type)
		{
			left = 111;
		}
		else if("video" == type)
		{
			left = 97;
		}
		content.push("<div class='selectView' style='width: 255px; position: absolute; " +
				      "left: " + left + "px; top: 0px;'>");
		content.push("<div class='ds_cont'>");
		content.push("<div class='ds_title'>" + $("option:eq(0)", $obj).text() + "</div>");
		content.push("<div class='ds_button'></div></div>");
		content.push("<div class='ds_list' style='display: none;'>");
		content.push("<div class='dsl_cont'>");
		for(var i = 0; i < $("option", $obj).size(); i++)
		{
			text = $("option:eq(" + i + ")", $obj).text();
			if(i == 0)
			{
				content.push("<p title='" + text + "' class='selected'>" + text + "</p>");
			}
			else
			{
				content.push("<p title='" + text + "'>" + text + "</p>");
			}
		}
		content.push("</div></div>");
		
		var $mainObj = $("#upload-style");
		$mainObj.append(content.join(""));
		
		return that;
	},
	//下拉列表下面部分的hover和click事件
	pListEvent: function(id)
	{
		var lastP = $(".ds_list .dsl_cont p:eq(0)");
		var that = this;
		$(".ds_list .dsl_cont p").each(function()
		{
			$(this).hover(function()
			{
				if($(this).text() != $(".ds_title").text())
				{
					$(this).addClass("selected");
				}
			}, function()
			{
				if($(this).text() != $(".ds_title").text())
				{
					$(this).removeClass("selected");
				}
			}).click(function()
			{
				var text = $(this).text();
				$(".ds_title").text(text);
				//相应的改变下面的p的样式
				lastP.removeClass("selected");
				$(this).addClass("selected");
				lastP = $(this);
				//改变那个隐藏的真实的下拉列表的值
				$("#" + id + " option").each(function()
				{
					if(text == $(this).text())
					{
						$(this).get(0).selected = true;
					}
				})
			})
		})
		return that;
	},
	//下拉列表上面的click事件
	topEvent: function()
	{
		$(".selectView").click(function()
		{
			var dis = $(".ds_list").css("display");
			if("none" == dis)
			{
				$(".ds_list").css("display", "block");
			}
			else
			{
				$(".ds_list").css("display", "none");
			}
		})
	}
}