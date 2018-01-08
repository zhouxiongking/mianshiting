$(function()
{
	doInitActivity(1);
	
	/**
	 * 上一页
	 */
	$("#activity-pre").click(function()
	{
		var cur = parseInt($("#activity-current").text());
		var requestNum = cur == 1 ? 1 : cur - 1;
		if(cur != requestNum)
		{
			doInitActivity(requestNum);
		}
		
	})
	
	/**
	 * 下一页
	 */
	$("#activity-next").click(function()
	{
		var cur = parseInt($("#activity-current").text());
		var total = parseInt($("#activity-total").text());
		var requestNum = cur == total ? total : cur + 1;
		if(cur != requestNum)
		{
			doInitActivity(requestNum);
		}
	})
	
	/**
	 * 分页下拉列表事件
	 */
	$("#curpage-select").change(function()
	{
		var curNum = $(this).children("option:selected").val();
		doInitActivity(curNum);
	})
	
})

/**
 * 页面初始化时，加载请求
 * @return
 */
function doInitActivity(pageNum)
{
	$.ajax(
	{
		type: "POST",
		url: "/picture-json/doShowActivityAction.action",
		data: 
		{
		    "pageNum": pageNum
		},
		success: function(result)
		{
			addResultToActivity(result.pictureList, result.userList[0], result.picTotal, pageNum);
		}
	})
}

/**
 * 将请求出的pictureList显示在页面上上
 * @param list
 * @return
 */
function addResultToActivity(list, userNum, picTotal, pageNum)
{
	//1.获取参与活动的用户数量
	$("#total-person").text(userNum);
	//2.总的图片数量
	$("#total-picture").text(picTotal);
	//3.将图片显示在页面上
	var content = [];
	for(var i = 0; i < list.length; i++)
	{
		content.push("<li><a target='_blank' class='imglink' href='/doSwitchShowAction.action?picId=" + list[i].id + "'>");
		content.push("<img src='" + list[i].picurl.split(",")[getRealPic(list[i].scales)] + "' width='240px' height='240px' /></a>");
		content.push("<p class='img_title'>" + changeCategory(list[i].category) + "</p>");
		content.push("<p class='img_title' title='" + list[i].theme + "'>" + list[i].theme + "</p>");
		content.push("<div class='img_information'><p class='img_author'><span>作者：</span>");
		content.push("<a target='_blank' title='" + list[i].username + "' href='javascript:;'>");
		content.push("<span class='author green'>" + list[i].username + "</span></a>");
		content.push("</p></div></li>");
	}
	$(".upload_list").empty().append(content.join(""));
	//4.当前页
	$("#activity-current").text(pageNum);
	//5.总页数
	var total;
	if(list.length % 12 == 0)
	{
		if(list.length == 0)
		{
			total = 1;
		}
		else 
		{
			total = list.length / 12;
		}
	}
	else
	{
		total = parseInt(list.length / 12 ) + 1;
	}
	$("#activity-total").text(total);
	//6.填充上分页的select
	var options = [];
	for(var i = 1; i <= total; i++)
	{
		options.push("<option>" + i + "</option>");
	}
	$("#curpage-select").empty().append(options.join(""));
	$("#curpage-select option").each(function()
	{
		if($(this).text() == pageNum)
		{
			$(this).get(0).selected = true;
		}
	})
}

/**
 * 由于显示图片的是正方形的div，所以挑选图片时选择高与宽最接近1:1的
 * @param scale
 * @return
 */
function getRealPic(scale)
{
	var scales = scale.split(",");
	var val = [];
	var height, width;
	for(var i = 0; i < scales.length - 1; i++)
	{
		width = scales[i].split("*")[0];
		height = scales[i].split("*")[1];
		val.push(Math.abs(1 - parseFloat(width / height)));
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





















































