$(function()
{
	/**
	 * 初始化页面时，根据id请求出作品对象，并显示在页面上
	 */
	doInitPicture();
	
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
	 * 图片描述后的点赞 
	 */
	$(".heart-vote-wrap .heart-vote").hover(function()
	{
		$("i", this).css("background-position", "-40px -360px");
	}, function()
	{
		$("i", this).css("background-position", "-0px -360px");
	})
	
	/**
	 * 给新闻图片点赞
	 */
	$(".heart-vote").click(function()
	{
		//获取目前的点赞数目
		var voteNum = parseInt($("#total-vote-num").text());
		//作品id
		var id = $("#hidden-picture-id").val();
		//从数据库里查看是否已经点赞，点过了则不能继续点赞
		$.ajax(
		{
			type: "POST",
			url: "/heart-json/doSaveHeartAction.action",
			data:
			{
				"heart.picid": id
			},
			success: function(result)
			{
				if(result.result == "fail")
				{
					//未登录，弹出登陆div
					$(".login-tip").show();
				}
				else if(result.result == "success")
				{
					//登陆成功，点赞数量加1
					$("#total-vote-num").text(voteNum + 1);
				}
				else 
				{
					//已经点过赞，给出提示
					changeOpacity("#heart-tip");
				}
			}
		})
	})
	
	/**
	 * 点击登陆右上角的叉，隐藏div
	 */
	$(".close-local-tip").click(function()
	{
		$(".login-tip").hide();
	})
	
	/**
	 * 点击点赞旁的div上的登陆，先进行校验，然后发送登陆请求
	 */
	$(".local-login-tip").click(function()
	{
		var loginname = $("#local-login-name").val();
		var loginpwd = $("#local-login-pwd").val();
		
		if(loginname.trim().length == 0)
		{
			$(".error-tip-name").show();
		}
		else
		{
			$(".error-tip-name").hide();
		}
		
		if(loginpwd.trim().length == 0)
		{
			$(".error-tip-pwd").show();
		}
		else
		{
			$(".error-tip-pwd").hide();
		}
		
		if(loginname.trim().length != 0 && loginpwd.trim().length != 0)
		{
			//发送请求，登陆
			$.ajax(
			{
				type: "POST",
				url: "/user-json/doLocalLoginAction.action",
				data:
				{
					"user.username": loginname,
					"user.password": loginpwd
				},
				success: function(result)
				{
					if(result.result == "fail")
					{
						//登陆失败
						$(".error-tip-result").show();
					}
					else
					{
						$(".error-tip-result").hide();
						$(".login-tip").hide();
						//清空填写的值
						$("#local-login-name").val("");
						$("#local-login-pwd").val("");
					}
				}
			})
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
	 * 切换下一组图片
	 */
	$(".swpl-fastnext").click(function()
	{
		var right = $("#swp-list-ul").position().left;
		var total = $("#total-num").text();
		var size = 189 - 120 * (total - 6);
		var finalSize = 189 - 120 * (total - 3) + 40;
		if(right >= size)
		{
			if(right == size)
			{
				$("#swp-list-ul").animate({"left": finalSize + "px"}, 500);
			}
			else
			{
				$("#swp-list-ul").animate({"left": "-=360px"}, 500);
			}
		}
	}).hover(function()
	{
		$("i", this).css("background-position", "-60px -190px");
		$(this).css("background", "#e9e9e9");
	}, function()
	{
		$("i", this).css("background-position", "-40px -190px");
		$(this).css("background", "#f9f9f9");
	})
	
	/**
	 * 切换上一组图片
	 */
	$(".swpl-fastprev").click(function()
	{
		var left = $("#swp-list-ul").position().left;
		if(left < 189)
		{
			if(left > -150)
			{
				$("#swp-list-ul").animate({"left": "0px"}, 500);
			}
			else
			{
				$("#swp-list-ul").animate({"left": "+=360px"}, 500);
			}
		}
	}).hover(function()
	{
		$("i", this).css("background-position", "-20px -190px");
		$(this).css("background", "#e9e9e9");
	}, function()
	{
		$("i", this).css("background-position", "0 -190px");
		$(this).css("background", "#f9f9f9");
	})
	
	/**
	 * 评论框中输入字符后，下面的发表图片图标改变样式
	 */
	$(".J_Comment_Content").focus(function()
	{
		inputInterval = setInterval("inputNum()", 500);
	}).blur(function()
	{
		clearInterval(inputInterval);
	})
	
	/**
	 * “发布”，输入完评论内容后将评论内容存入数据库中
	 */
	$(".post_inline_comment").click(function()
	{
		var content = $(".J_Comment_Content").val();
		var picid = $("#hidden-picture-id").val();
		if(content.trim().length == 0)
		{
			$(".post_tip_error").text("请输入评论内容！");
			$(".Mblk_cmnt .post_tip .post_tip_error").css("backgroud-position", "0 -280px");
			changeOpacity("#input-content-tip");
		}
		else
		{
			//发送请求
			$.ajax(
			{
				type: "POST",
				url: "/comment-json/doSaveCommentAction.action",
				data: 
				{
					"comment.content": content,
					"comment.picid": picid
				},
				success: function(result)
				{
					if(result.result == "fail")
					{
						//未登录，提示先登陆
						$(".notice").text("请先登陆");
						changeOpacity(".cmnt_user_login_info");
						$(".blkContainerCommentblk .form_input_long").css("border", "1px solid red");
					}
					else
					{
						//已登录，刷新评论列表
						$(".blkContainerCommentblk .form_input_long").css("border", "1px solid #ababab");
						//提示已经评论成功
						$(".post_tip_error").text("评论成功！");
						$(".Mblk_cmnt .post_tip .post_tip_error").css("backgroud-position", "0 -240px");
						changeOpacity("#input-content-tip");
						//将输入框的内容清空
						$(".J_Comment_Content").val("");
						//改变“发布”标签的样式
						$(".post_inline_comment").css("background-position", "0 0")
						//更新页面上的评论
						addCommentToPage(result.comList, 1, result.comTotal);
					}
				}
			})
		}
	})
	
	/**
	 * 登陆
	 */
	$(".cmnt_user_cont .local-login").click(function()
	{
		var username = $(".J_Login_User").val();
		var pwd = $(".J_Login_Psw").val();
		if(username.trim().length == 0 || pwd.trim().length == 0)
		{
			$(".notice").text("请输入用户名和密码");
			$(".cmnt_user_login_info").show();
		}
		else
		{
			//发送请求，验证用户名和密码是否正确
			$.ajax(
			{
				type: "POST",
				url: "/user-json/doLocalLoginAction.action",
				data: 
				{
					"user.username": username,
					"user.password": pwd
				},
				success: function(result)
				{
					if(result.result == "fail")
					{
						$(".notice").text("用户名/密码错误");
						$(".blkContainerCommentblk .form_input_long").css("border", "1px solid red");
						changeOpacity(".cmnt_user_login_info");
					}
					else
					{
						$(".notice").text("登陆成功");
						$(".blkContainerCommentblk .form_input_long").css("border", "1px solid #ababab");
						changeOpacity(".cmnt_user_login_info");
						//清空填写的用户名和密码
						$(".J_Login_User").val("");
						$(".J_Login_Psw").val("");
					}
				}
			})
		}
	})
	
	/**
	 * 评论列表上一页
	 */
	$("#show-pre").click(function()
	{
		var cur = parseInt($("#show-current").text());
		var pre = cur == 1 ? 1 : cur - 1;
		//发送请求，找出对应页的评论
		doPreNext(pre);
	})
	
	/**
	 * 评论列表下一页
	 */
	$("#show-next").click(function()
	{
		var cur = parseInt($("#show-current").text());
		var total = parseInt($("#show-total").text());
		var next = cur == total ? total : cur + 1;
		//发送请求，找出对应页的评论
		doPreNext(next);
	})
	
	/**
	 * 选择页的下拉列表的事件
	 */
	$("#curpage-select").change(function()
	{
		var curNum = $(this).children("option:selected").val();
		doPreNext(curNum);
	})
	
	
})

function changeOpacity(type)
{
	$(type).animate({opacity: "1"}, 1000);
	$(type).animate({opacity: "0"}, 1000);
}


/**
 * 初始化页面时，加载请求，找出id指定的作品
 * @return
 */
function doInitPicture()
{
	var param = window.location.search;
	var paramStr = param.substring(1).split("&");
	var id = paramStr[0].split("=")[1];
	//发送请求
	$.ajax(
	{
		type: "POST",
		url: "/picture-json/doShowRelatePictureAction.action",
		data: 
		{
			"picId": id
		},
		success: function(result)
		{
			//将相应的内容显示在页面上，图片、点赞
			addResultToPage(result.picture, result.heartNumber);
			//显示与图片相关的评论
			addCommentToPage(result.comList, 1, result.comTotal);
			//添加小图与大图的事件
			smallToBigPicture();
		}
	})
}

/**
 * 将与picture有关的内容，包括图片，点赞
 * @param picture
 * @return
 */
function addResultToPage(picture, heartNumber)
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
	//8.小图区
	var small =[];
	var smallurl = picture.smallurl.split(",");
	for(var i = 0; i < scale.length - 1; i++)
	{
		if(i == 0)
		{
			small.push("<li class='current'>");
		}
		else
		{
			small.push("<li>");
		}
		small.push("<a href='javascript:;'><img alt='" + picture.theme + "' src='" + smallurl[i] + "'/></a></li>");
	}
	$("#swp-list-ul").empty().append(small.join(""));
	//9.点赞数
	$("#total-vote-num").text(heartNumber);
	//10.将id值隐藏在页面上
	$("#hidden-picture-id").val(picture.id);
}

/**
 * 与picture有关的评论加载到页面上
 * @param comList
 * @return
 */
function addCommentToPage(comList, pageNo, totalNum)
{
	//1.总评论数
	$("#total-comments").text(totalNum);
	//2.将评论内容显示在页面上
	if(comList.length == 0)
	{
		//页面上显示“当前暂无评论”
		$("#J_Comment_Tip").show();
	}
	else
	{
		$("#J_Comment_Tip").hide();
		var content = [];
		var maxlength = comList.length >= 10 ? 10 : comList.length;
		var currentNum;
		for(var i = 0; i < maxlength; i++)
		{
			//计算下是第几条评论
			currentNum = (pageNo - 1) * 10 + i + 1;
			content.push("<div class='comment_item'><div class='comment_item_cont clearfix'>");
			content.push("<div class='J_Comment_Face t_face'>");
			content.push("<a href='javascript:;'><img alt='用户' src='/images/picture/user.gif'/></a></div>");
			content.push("<div class='t_content'><div class='t_info'>");
			content.push("<span class='t_username t_mobile'>" + comList[i].cusername + "</span></div>");
			content.push("<div class='comment_content J_Comment_Txt clearfix'>");
			content.push("<div class='t_txt'>" + comList[i].content + "</div>");
			content.push("<div class='reply' style='visibility: visible;'>");
			content.push("<span class='datetime J_Comment_Time'>" + comList[i].comtime + "</span>");
			content.push("<span class='reply-right'>");
			content.push("<a href='javascript:;' class='comment_ding_link'><span>第" + currentNum + "楼</span></a></span>");
			content.push("</div></div></div></div></div>");
		}
		$(".comment_item_page").empty().append(content.join(""));
	}
	//3.填充下面的分页部分值
	$("#show-current").text(pageNo);
	//第一次加载时，会获得
	if(totalNum || totalNum == 0)
	{
		var number;
		if(totalNum % 10 == 0)
		{
			if(totalNum == 0)
			{
				number = 1;
			}else
			{
				number = totalNum / 10;
			}
		}
		else
		{
			number = parseInt(totalNum / 10) + 1;
		}
		$("#show-total").text(number);
		//将页数下拉框填充值
		var content = [];
		var i = 1;
		while(i <= number)
		{
			content.push("<option>" + i + "</option>");
			i++;
		}
		$("#curpage-select").empty().append(content.join(""));
	}
}

/**
 * 检验输入框中是否已输入字符，并相应的改变“发布”图标的样式
 */
function inputNum()
{
	if($(".J_Comment_Content").val().trim().length > 0)
	{
		$(".post_inline_comment").css("background-position", "0 -40px");
	}
	else
	{
		$(".post_inline_comment").css("background-position", "0 0");
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
	//修改下面的小图的样式和位置
	changeSmall(curNum);
	//对应修改图片的标题，此处的内容应该是从数据库里读取出来
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
 * 小图相关
 * @param curNum 小图索引
 * @return
 */
function changeSmall(curNum)
{
	$(".swp-list-cont ul li").removeClass("current");
	$(".swp-list-cont ul li:eq(" + curNum + ")").addClass("current");
	totalNum = $("#total-num").text();
	if(totalNum > 5)
	{
		if(curNum > 1 && curNum < totalNum - 2)
		{
			sleft = -120 * (curNum - 2);
			$("#swp-list-ul").animate({"left": sleft + "px"}, 500);
		}
	}
	$("#cur-pic-num").text(curNum + 1);
}

/**
 * 点击下面的小图，上面的大图会相应的改变
 */
function smallToBigPicture()
{
	$(".swp-list-cont ul li a img").each(function(index)
	{
		$(this).click(function()
		{
			changePicture(index);
		})
	})
}

/**
 * 点击上一页，下一页的请求
 * @param pageNo
 * @return
 */
function doPreNext(pageNo)
{
	var id = $("#hidden-picture-id").val();
	$.ajax(
	{
		type: "POST",
		url: "/comment-json/loadCommentByPageAction.action",
		data:
		{
			"pageNo": pageNo,
			"picId": id
		},
		success: function(result)
		{
			addCommentToPage(result.comList, pageNo);
			//改变当前页值和下拉列表值
			$("#show-current").text(pageNo);
			$("#curpage-select option").each(function()
			{
				if($(this).text() == pageNo)
				{
					$(this).get(0).selected = true;
				}
			})
		}
	})
}

