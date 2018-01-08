$(function()
{
	/**
	 * 初始加载页面，发送请求
	 */
	doInititalRequest(1);
	
	/**
	 * 上一页
	 */
	$("#classify-pre").click(function()
	{
		var curpage = parseInt($("#classify-current").text());
		var preIndex = curpage == 1 ? 1 : curpage - 1;
		if(preIndex != curpage)
		{
			doInititalRequest(preIndex);
		}
	})
	
	/**
	 * 下一页
	 */
	$("#classify-next").click(function()
	{
		var curpage = parseInt($("#classify-current").text());
		var total = parseInt($("#classify-total").text());
		var nextIndex = curpage == total ? total : curpage + 1;
		if(nextIndex != curpage)
		{
			doInititalRequest(nextIndex);
		}
	})
	
	/**
	 * 选择页的下拉列表的事件
	 */
	$("#curpage-select").change(function()
	{
		var curNum = $(this).children("option:selected").val();
		doInititalRequest(curNum);
	})
	
	
})

/**
 * 初始加载页面，发送请求
 */
function doInititalRequest(pageNum)
{
	//改变当前显示的页数
	$("#classify-current").text(pageNum);
	$("#curpage-select option").each(function()
	{
		if($(this).text() == pageNum)
		{
			$(this).get(0).selected = true;
		}
	})
	
	var param = window.location.search;
	var category = param.substring(1).split("=")[1];
	//发送请求，找出同一类的作品
	$.ajax(
	{
		type: "POST",
		url: "/picture-json/doClassifyCategoryAction.action",
		data:
		{
			"category": category,
			"pageNum": pageNum
		},
		success: function(result)
		{
			addResultToDiv(result.pictureList, result.comList, result.heartNum, result.totalPage, category);
			//将页数下拉框填充值
			var content = [];
			var i = 1;
			if(pageNum == 1)
			{
				while(i <= result.totalPage)
				{
					content.push("<option>" + i + "</option>");
					i++;
				}
				$("#curpage-select").empty().append(content.join(""));
			}
		}
	})
}

/**
 * 将服务端返回的结果显示在页面上
 * @param list
 * @return
 */
function addResultToDiv(list, comList, heartNum, totalPage, category)
{
	//1.标题
	var cat = [["news", "新闻热点"], ["school", "美丽校园"], ["sport", "校园活动"], ["model", "榜样力量"], 
	           ["years", "激情岁月"], ["culture", "传统文化"]];
	for(var i = 0; i < cat.length; i++)
	{
		if(cat[i][0] == category)
		{
			category = cat[i][1];
			break;
		}
	}
	$(".txt-y-witness").text(category);
	//2.图片
	var content = [], index;
	for(var i = 0; i < list.length; i++)
	{
		content.push("<div class='box'><a target='_blank' href='/share/doSwitchShowAction.action?picId=" + list[i].id + "'>");
		//选择宽度最接近500的显示在页面上
		index = nearestSpe(list[i].scales.split(","));
		content.push("<img src='" + list[i].picurl.split(",")[index] + "' alt='" + list[i].theme + "'" +
				     " width='1000px' height='500px'/></a>");
		content.push("<div class='scroll_btns'><a class='like_btn' href='javascript:;'></a>");
		content.push("<a class='like_btn' href='javascript:;'>");
		//点赞的数量
		var heaNum, comNum;
		for(var j = 0; j < heartNum.length; j++)
		{
			if(list[i].id == heartNum[j][0].id)
			{
				heaNum = heartNum[j][1];
			}
		}
		if(!heaNum)
		{
			heaNum = 0;
		}
		content.push("<span class='like_num'>" + heaNum + "</span></a>");
		content.push("<a href='javascript:;' class='cmt_btn' target='_blank'>");
		//评论的数量
		for(var j = 0; j < comList.length; j++)
		{
			if(list[i].id == comList[j][0].id)
			{
				comNum = comList[j][1];
			}
		}
		if(!comNum)
		{
			comNum = 0;
		}
		content.push("<span class='cmt_num'>" + comNum +"</span></a>");
		content.push("<span class='title'>" + list[i].theme +"(" + list[i].total + "张)</span></div>");
		content.push("<div class='scroll_author'><span class='author'>作者：</span>");
		content.push("<a href='javascript:;' class='author_name'>" + list[i].username + "</a>");
		content.push("</div></div>");
		heaNum = null;
		comNum = null;
	}
	$("#piclist").empty().append(content.join(""));
	//3.总页数
	$("#classify-total").text(totalPage);
}

/**
 * 找出最接近500高度的图片，并返回起索引值
 * @param scales
 * @return
 */
function nearestSpe(scales)
{
	var height, arrHei = [], index;
	for(var i = 0; i < scales.length - 1; i++)
	{
		height = parseInt(scales[i].split("*")[1]);
		arrHei[i] = Math.abs(height - 500);
	}
	//找出数组中的最小值
	var min = Math.min.apply(null, arrHei);
	for(var i = 0; i < arrHei.length; i++)
	{
		if(min == arrHei[i])
		{
			return i;
		}
	}
}





















