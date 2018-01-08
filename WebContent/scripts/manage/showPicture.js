$(function()
{
	/**
	 * 刚加载页面时，发送请求
	 */
	doInitRequest();
	
	/**
	 * 点击下一张，切换图片
	 */
	$(".swp-next").click(function()
	{
		//获取当前的图片的数目
		var curNum = parseInt($("#cur-pic-num").text());
		var totalNum = $("#total-num").text();
		if(curNum != totalNum)
		{
			changePicture(curNum);
		}
	})
	
	/**
	 * 点击上一张，切换图片
	 */
	$(".swp-prev").click(function()
	{
		//获取当前的图片的数目
		var curNum = parseInt($("#cur-pic-num").text());
		if(curNum > 1)
		{
			changePicture(curNum - 2);
		}
	})
	
	/**
	 * 鼠标在图片上时，显示上一张、下一张的图标
	 */
	$(".swp-hd").hover(function()
	{
		$(".swp-btn").show();
	}, function()
	{
		$(".swp-btn").hide();
	})
	
	/**
	 * 点击“审核拒绝”，显示下面的div
	 */
	$(".check .deny").click(function()
	{
		if($(".deny-reason-tip").css("display") == "none")
		{
			$(".deny-reason-tip").show();
		}
		else
		{
			$(".deny-reason-tip").hide();
		}
		
		if($(".deny-div").css("display") == "none")
		{
			$(".deny-div").show(500);
		}
		else
		{
			$(".deny-div").hide(500);
		}
	})
	
	/**
	 * 点击"确定",弹出相应的div
	 */
	$(".check .pass").click(function()
	{
		$(".sheild_down_div").show();
		$(".show_delete_div_2").show();
		selfAdjustDiv($(".show_delete_div_2"));
	})
	
	/**
	 * 点击“关闭”和叉的图标，关闭div
	 */
	$(".no_a_span_2, .close_spe_div_2").each(function()
	{
		$(this).click(function()
		{
			$(".sheild_down_div").hide();
			$(".show_delete_div_2").hide();
		})
	})
	
	/**
	 * 审核通过div中的点击“确定”
	 */
	$(".yes_a_span_2").click(function()
	{
		var id = $("#hidden-picture-id").val();
		//显示正在处理的loading的gif
		$(".uploading_tip").show();
		//自适应调整div的位置
		selfAdjustDiv($(".uploading_tip"));
		//发送请求
		$.ajax(
		{
			type: "POST",
			url: "/managepicture-json/doUpdatePictureAction.action",
			data: 
			{
				"picId": id
			},
			success: function(result)
			{
				window.location.href = "/picture/managePictureAction.action"
			}
		})
	})
	
	/**
	 * 审核拒绝,点击确定后发送请求
	 */
	$("#deny-btn").click(function()
	{
		//校验是否输入拒绝的原因
		var opinion = $(".check-opinion-text").val();
		var id = $("#hidden-picture-id").val();
		if(!opinion || opinion.trim().length == 0)
		{
			//提示输入内容
			$(".deny-reason-tip").text("请输入内容").css("color", "red");
		}
		else
		{
			//发送请求
			$.ajax(
			{
				type: "POST",
				url: "/managepicture-json/doUpdatePictureAction.action",
				data: 
				{
					"picId": id,
					"opinion": opinion
				},
				success: function(result)
				{
					window.location.href = "/picture/managePictureAction.action"
				}
			})
		}
	})
	
	/**
	 * 输入框获得焦点时事件
	 */
	$(".check-opinion-text").focus(function()
	{
		//提示输入内容
		$(".deny-reason-tip").text("请在以下输入框内填写拒绝的原因").css("color", "#666");
	})
	
	
})

/**
 * 加载页面时，发送请求
 * @return
 */
function doInitRequest()
{
	var param = window.location.search;
	var paramStr = param.substring(1).split("&");
	var id = paramStr[0].split("=")[1];
	$("#hidden-picture-id").val(id);
	$.ajax(
	{
		type: "POST",
		url: "/managepicture-json/doRealShowPictureAction.action",
		data: 
		{
			"picId": id
		},
		success: function(result)
		{
			addResultToSpe(result.picture);
		}
	})
}

/**
 * 将得到的picture的值展示在页面指定的位置
 * @param picture
 * @return
 */
function addResultToSpe(picture)
{
	//1.标题
	//如果有单张图片描述，则标题处为“主题---单张图片描述”
	//如果没有单张描述，则标题处为“类别---主题”
	$("#hidden-picture-theme").val(picture.theme);
	if(picture.picinfo.split("%@%")[0] != null && picture.picinfo.split("%@%")[0] != "")
	{
		$("#hidden-picture-info").val(picture.picinfo);
		var description = picture.picinfo.split("%@%")[0];
		$("#picture-cattheme").text(picture.theme + "---" + description);
	}
	else
	{
		var cat = [["news", "新闻热点"], ["school", "美丽校园"], ["sport", "校园活动"], ["model", "榜样力量"], 
		           ["years", "激情岁月"], ["culture", "传统文化"]];
		var category = picture.category;
		for(var i = 0; i < cat.length; i++)
		{
			if(cat[i][0] == category)
			{
				category = cat[i][1];
				break;
			}
		}
		$("#picture-cattheme").text(category + "---" + picture.theme);
	}
	//3.作品作者
	$("#picture-username").text(picture.username);
	//4.作品上传时间
	$(".swpt-time").text(picture.uploadtime);
	//5.图片集
	//显示最外层div
	var scale = picture.scales.split(",");
	$(".swp-hd").css("width", scale[0].split("*")[0] + "px");
	$(".swp-hd").css("height", scale[0].split("*")[1] + "px");
	//内层的ul
	var content = [];
	for(var i = 0; i < scale.length - 1; i++)
	{
		content.push("<li class='swp-item' style='width: 1000px;'>");
		content.push("<div class='swp-img'>");
		content.push("<img alt='" + picture.theme + "' src='" + picture.picurl.split(",")[i] + "'" +
				     " style='width: " + scale[i].split("*")[0] + "px; height: " + scale[i].split("*")[1] + "px;'>");
		content.push("</div></li>");
	}
	$(".swp-hd-list").empty().append(content.join(""));
	//6.图片数量
	$("#total-num").text(picture.total);
	//7.图片集描述
	$(".swpt-1013").empty().text(picture.description);
	//8.审核意见，根据审核意见的不同，显示不同的内容
	if(picture.status == "未审核")
	{
		$(".check-rel-div").show();
	}
	else
	{
		$(".check-rel-div").hide();
		$(".check-title").text("审核意见---" + picture.status);
	}
	
}

/**
 * 根据传入的图片索引值切换图片
 * @return
 */
function changePicture(curNum)
{
	var height, sleft, bleft, totalNum;
	bleft = -1000 * curNum;
	$("#cur-pic-num").text(curNum + 1);
	$(".swp-hd-list").animate({"left": bleft + "px"}, 500);
	$(".swp-hd-list li:eq(" + curNum + ")").addClass("current");
	$(".swp-hd-list li:eq(" + curNum + ") img").css("display", "block");
	$(".current").removeClass("current");
	//改变外层div的高度
	height = $(".swp-hd-list li:eq(" + curNum + ") img").css("height");
	$(".swp-hd").css("height", height);
	
	//对应修改图片的标题，此处的内容应该是从数据库里读取出来
	var title = $("#picture-cattheme").text().split("---")[0];
	//如果单张图片描述为空，则直接用主题来代替
	var info;
	if($("#hidden-picture-info").val().split("%@%")[curNum] == null)
	{
		info = $("#hidden-picture-theme").val();
	}
	else
	{
		info = $("#hidden-picture-info").val().split("%@%")[curNum];
	}
	$("#picture-cattheme").text(title + "---" + info);
}

/**
 * 自适应调整div的高度
 */
function selfAdjustDiv(obj)
{
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();  //当前浏览器窗口的 宽高
	var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
	var width = obj.width();
	var height = obj.height();
	var objLeft = (screenWidth - obj.width())/2 ;
    var objTop = scrolltop + 150;
	obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
}











