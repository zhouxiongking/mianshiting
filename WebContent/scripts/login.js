$(function()
{
	/**
	 * 用户名输入框事件
	 */
	$("#input_username").blur(function()
	{
		var content = [];
		if($(this).val().trim().length == 0)
		{
			content.push("<span class='error_2'></span>");
			content.push("请输入登陆名");
		}
		$("#usernameErr").empty().append(content.join(""));
	})
	
	/**
	 * 密码输入框事件
	 */
	$("#input_pwd").blur(function()
	{
		var content = [];
		if($(this).val().trim().length == 0)
		{
			content.push("<span class='error_2'></span>");
			content.push("请输入密码");
		}
		$("#passwordErr").empty().append(content.join(""));
	})
	
	
	
	
	
})