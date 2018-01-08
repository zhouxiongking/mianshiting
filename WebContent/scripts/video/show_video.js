$(function()
{
	/**
	 * 初始化页面时，根据id请求出作品对象，并显示在页面上
	 */
	doInitVideo();
	
	var video = document.getElementById("ckplayer");
	
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
						addCommentToVideo(result.comList, 1, result.comTotal);
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

function changeOpacity(type)
{
	$(type).animate({opacity: "1"}, 1000);
	$(type).animate({opacity: "0"}, 1000);
}

/**
 * 初始化页面时，加载请求，找出id指定的作品
 * @return
 */
function doInitVideo()
{
	var param = window.location.search;
	var paramStr = param.substring(1).split("&");
	var id = paramStr[0].split("=")[1];
	//发送请求
	$.ajax(
	{
		type: "POST",
		url: "/comment-json/loadAllCommentsAction.action",
		data: 
		{
			"picId": id
		},
		success: function(result)
		{
			//显示与video相关的评论
			addCommentToVideo(result.comList, 1, result.comTotal);
		}
	})
}

/**
 * 显示与video相关的评论
 */
function addCommentToVideo(comList, pageNo, totalNum)
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
			addCommentToVideo(result.comList, pageNo);
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







