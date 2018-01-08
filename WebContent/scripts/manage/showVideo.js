$(function()
{
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
		var id = $("#hidden-video-id").val();
		//显示正在处理的loading的gif
		$(".uploading_tip").show();
		//自适应调整div的位置
		selfAdjustDiv($(".uploading_tip"));
		//发送请求
		$.ajax(
		{
			type: "POST",
			url: "/managevideo-json/doUpdateVideoAction.action",
			data: 
			{
				"videoId": id
			},
			success: function(result)
			{
				window.location.href = "/video/manageVideoAction.action";
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
		var id = $("#hidden-video-id").val();
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
				url: "/managevideo-json/doUpdateVideoAction.action",
				data: 
				{
					"videoId": id,
					"opinion": opinion
				},
				success: function(result)
				{
					window.location.href = "/video/manageVideoAction.action";
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



