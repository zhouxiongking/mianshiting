$(function()
{
	/**
	 * 点击“看不清”，重新加载一个验证码
	 */
	$(".change_door").click(function()
	{
		$(".ver_pic img").attr("src", "/users/verifyImageAction.action?timestamp=" + new Date().getTime());
	})
	
	/**
	 * "登录名"输入框事件
	 */
	$("#regist_username").blur(function()
	{
		if(!$(this).val() || $(this).val().trim().length == 0)
		{
			$("#regist_username_tip").empty().append("<p class='erro'><span class='icon_del'></span>请输入您的登录名</p>").show();
		}
		else
		{
			//发送请求，验证登录名是否已被注册
			$.ajax(
			{
				type: "POST",
				url: "../user-json/isRegistAction.action",
				data: {"user.username": $(this).val().trim()},
				success: function(result)
				{
					if(result.result == "success")
					{
						//未被注册，可以使用
						$("#regist_username_tip").empty().append("<span class='icon_succ'></span>");
						$("#hidden_flag").val(parseInt($("#hidden_flag").val()) + 1);
					}
					else
					{
						//登录名已被注册
						var content= [];
						content.push("<p class='erro'><span class='icon_del'></span>");
						content.push("该用户名已注册，请<a href='login.jsp'>直接登陆</a></p>");
						$("#regist_username_tip").empty().append(content.join(""));
						
					}
				}
			})
			
			
		}
	}).focus(function()
	{
		$("#regist_username_tip").empty().append("<p class='reg_tip'><span class='icon_tip'></span>请输入您的登录名</p>").show();
	})
	
	/**
	 * “设置密码”输入框事件
	 */
	$("#regist_pwd").blur(function()
	{
		if(!$(this).val() || $(this).val().trim().length == 0)
		{
			$("#regist_pwd_tip").empty().append("<p class='erro'><span class='icon_del'></span>请输入登陆密码</p>").show();
		}
	}).focus(function()
	{
		$("#regist_pwd_tip").empty().append("<p class='reg_tip'><span class='icon_tip'></span>6-16位字符（字母、数字、符号）区分大小写</p>").show();
	})
	
	/**
	 * “重复密码”输入框事件
	 */
	$("#regist_repwd").blur(function()
	{
		if(!$(this).val() || $(this).val().trim().length == 0)
		{
			$("#regist_repwd_tip").empty().append("<p class='erro'><span class='icon_del'></span>请再次输入登陆密码</p>").show();
		}
	}).focus(function()
	{
		$("#regist_repwd_tip").empty().append("<p class='reg_tip'><span class='icon_tip'></span>6-16位字符（字母、数字、符号）区分大小写</p>").show();
	})
	
	/**
	 * “验证码”输入框事件
	 */
	$("#regist_vercode").blur(function()
	{
		if(!$(this).val() || $(this).val().trim().length == 0)
		{
			$("#regist_vercode_tip").empty().append("<p class='erro'><span class='icon_del'></span>请输入验证码</p>").show();
		}
	}).focus(function()
	{
		$("#regist_vercode_tip").empty().append("<p class='reg_tip'><span class='icon_tip'></span>请输入验证码</p>").show();
	})
	
	
	
	
})

/**
 * 注册时的校验函数
 */
function validateRegist()
{
	//用户名校验
	if(!$("#regist_username").val() || $("#regist_username").val().trim().length == 0)
	{
		$("#regist_username_tip").empty().append("<p class='erro'><span class='icon_del'></span>请输入您的登录名</p>").show();
	}
	
	//密码校验
	if(!$("#regist_pwd").val() || $("#regist_pwd").val().trim().length == 0)
	{
		$("#regist_pwd_tip").empty().append("<p class='erro'><span class='icon_del'></span>请输入登陆密码</p>").show();
	}
	
	//重复密码校验
	if(!$("#regist_repwd").val() || $("#regist_repwd").val().trim().length == 0)
	{
		$("#regist_repwd_tip").empty().append("<p class='erro'><span class='icon_del'></span>请再次输入登陆密码</p>").show();
	}
	
	//两次密码要求一致
	if($("#regist_pwd").val().trim() != $("#regist_repwd").val().trim())
	{
		$("#regist_repwd_tip").empty().append("<p class='erro'><span class='icon_del'></span>两次密码输入不一致</p>").show();
	}
	
	//验证码校验
	if(!$("#regist_vercode").val() || $("#regist_vercode").val().trim().length == 0)
	{
		$("#regist_vercode_tip").empty().append("<p class='erro'><span class='icon_del'></span>请输入验证码</p>").show();
	}
	
	//判断是否通过验证，通过验证后则提交至后台
	if($(".reg_form .tips .erro").size() == 0)
	{
		$("#regist_submit").click();
	}
}



















