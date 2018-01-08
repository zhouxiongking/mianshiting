$(function()
{
	/**
	 * 页面滚动后，显示或隐藏回到顶端的div
	 */
	$(window).scroll(function()
	{
		var scrollTop = $(this).scrollTop();
		if(scrollTop >= 200)
		{
			$(".side-btns-wrap").show();
		}
		else
		{
			$(".side-btns-wrap").hide();	
		}
	});
	
	/**
	 * 回到顶端
	 */
	$(".side-btns-top-btn").click(function()
	{
		$("html, body").animate({"scrollTop": 0}, 500);
	})
	
	
	
	
})













