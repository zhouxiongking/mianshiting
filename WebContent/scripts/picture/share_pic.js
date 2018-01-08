$(function()
{
	/**
	 * 初次加载页面，获取出上面的切换的大图的作品
	 */
	doInitShow();
	
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
			$(".focus_body .scroll .scroll_cont .scroll_cont_inner #change_pic_div").animate({"left": index * -1000 + "px"}, 20);
			$("#FS_numList_01 span.selected").removeClass("selected");
			$(this).addClass("selected");
		})
	})
	
	/**
	 * 鼠标划过大图，会显示上一张，下一张图标
	 */
	$(".scroll").hover(function(e)
	{
		$(".scroll a.arr_left").css("display", "block");
		$(".scroll a.arr_right").css("display", "block");
		
	}, function()
	{
		$(".scroll a[class^=arr]").hide();
	})
	
	/**
	 * 上一张
	 */
	$("#FS_arr_left_01").click(function()
	{
		changePic("yes", "pre");
	})
	
	/**
	 * 下一张
	 */
	$("#FS_arr_right_01").click(function()
	{
		changePic("yes", "next");
	})
	
	/**
	 * 中间的ul下的li标题事件
	 */
	var lastObj = $(".column-subshow-tab ul li:eq(1) a");
	$(".column-subshow-tab ul li").each(function(index)
	{
		$(this).hover(function()
		{
			lastObj.removeClass("selected");
			$("a", this).addClass("selected");
			lastObj = $("a", this);
			//发送请求，获取对应的类别的作品
			requestByCategory($("a", this).attr("name"));
		}, function()
		{
			
		})
	})
	
	/**
	 * 默认加载第二个li内容
	 */
	requestByCategory("school");
})

/**
 * 初次加载发送的请求
 */
function doInitShow()
{
	$.ajax(
	{
		type: "POST",
		url: "/picture-json/doMainTopSixAction.action",
		success: function(result)
		{
			addResultToTop(result.pictureList);
		}
	})
}

/**
 * 将获得的list添加到上面的大图区
 * @param list
 * @return
 */
function addResultToTop(list)
{
	var content = [];
	for(var i = 0; i < list.length; i++)
	{
		content.push("<div class='box'><a href='/doSwitchShowAction.action?picId=" + list[i].id + "'>");
		content.push("<img alt='" + list[i].theme + "' src='" + list[i].picurl.split(",")[calculateScale(list[i].scales, 2)] + "' title='" + list[i].theme + "'/>");
		content.push("</a><span class='title'>【" + changeCategory(list[i].category) + "】" + list[i].theme + 
				     "（" + list[i].total + "张）</span></div>");
	}
	$("#change_pic_div").empty().append(content.join(""));
}

/**
 * ul下的li根据category请求
 * @param category
 * @return
 */
function requestByCategory(category)
{
	$.ajax(
	{
		type: "POST",
		url: "/picture-json/doMainCategoryAction.action",
		data:
		{
			"category": category
		},
		success: function(result)
		{
			addResultToLocal(result.pictureList);
		}
	})
}

/**
 * 根据加载出的作品集合显示在页面上
 * @param list
 * @return
 */
function addResultToLocal(list)
{
	var content = [];
	for(var i = 0; i < list.length; i++)
	{
		content.push("<div class='pic_item2 js_pic_item2'>");
		content.push("<a class='pic_img' target='_blank' href='/doSwitchShowAction.action?picId=" + list[i].id + "'>");
		content.push("<img alt='" + changeCategory(list[i].category) + "' " +
				     " src='" + list[i].picurl.split(",")[calculateScale(list[i].scales, 1.5)] + "'></a>");
		content.push("<a class='pic_detail' target='_blank' href='#'>");
		content.push("<h3>" + list[i].theme + "<span>（" + list[i].total + "张）</span></h3></a></div>");
	}
	$(".column-subshow-cont").empty().append(content.join(""));
}

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
		left = speIndex == 0 ? -5000 : speIndex * -1000 + 1000;
		speIndex = speIndex == 0 ? 5 : speIndex - 1;
	}
	else if(type == "next")
	{
		left = speIndex == 5 ? 0 : speIndex * -1000 - 1000;
		speIndex = speIndex == 5 ? 0 : speIndex + 1;
	}
	
	//改变div的位置，左移
	$(".focus_body .scroll .scroll_cont .scroll_cont_inner #change_pic_div").animate({"left": left + "px"}, 500);
	//改变下面的红点的位置
	$("#FS_numList_01 span.selected").removeClass("selected");
	$("#FS_numList_01 span:eq(" + speIndex + ")").addClass("selected");
	if(isStop == "yes")
	{
		interval = setInterval("changePic('no', 'next')", 5000);
	}
}

/**
 * 将接收到的英文的类型转化为中文的类型
 * @param category
 * @return
 */
function changeCategory(category)
{
	var cat = [["news", "新闻热点"], ["school", "美丽校园"], ["sport", "校园活动"], ["model", "榜样力量"], 
	           ["years", "激情岁月"], ["culture", "传统文化"]];
	var last;
	for(var i = 0; i < cat.length; i++)
	{
		if(cat[i][0] == category)
		{
			last = cat[i][1];
			break;
		}
	}
	return last;
}

/**
 * 为方便在页面上显示出相应比例的图片，找出宽与高比例最接近3:2的图片，并返回其索引值
 * @param scale
 * @return
 */
function calculateScale(scale, param)
{
	var scales = scale.split(",");
	var val = [];
	var height, width;
	for(var i = 0; i < scales.length - 1; i++)
	{
		width = scales[i].split("*")[0];
		height = scales[i].split("*")[1];
		val.push(Math.abs(param - parseFloat(width / height)));
	}
	//找出val里面的最小值，并返回索引
	var min = Math.min.apply(null, val);
	for(var i = 0; i < val.length; i++)
	{
		if(min == val[i])
		{
			return i;
		}
	}
}









