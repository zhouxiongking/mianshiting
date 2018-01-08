<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>后台管理系统</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="/styles/manage/manage.css">
	<script type="text/javascript" src="/scripts/jquery-1.9.1.min.js"></script>
	<script type="text/javascript">
		$(function()
		{
			currentTime();
			setInterval(currentTime, 1000);
		})
		
		function currentTime()
		{
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var mdate = date.getDate();
			var day = date.getDay();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			//处理下周几
			var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			var time = year + "年" + (month + 1) + "月" + mdate + "日 " + week[day] + " " + (hour >= 0 && hour <= 9 ? "0" : "") + hour + 
					   ":" + (minute >= 0 && minute <= 9 ? "0" : "") + minute + ":" + (second >= 0 && second <= 9 ? "0" : "") + second;
			$("#cur_time").text(time);
		}
		
		
	</script>
	
  </head>
  
  <body class="top_body">
     
     <div class="top">
    	<!-- 顶部logo -->
    	<p class="top-title">
    		网站后台管理系统
    	</p>
    	<!-- 显示当前时间 -->
    	<div class="cur-time">
    		<p>
    			当前系统时间：<span id="cur_time"></span>
    			<a href="javascript:window.parent.location.href='/doLogoutAction.action';" class="admin-logout">退出</a>
    		</p>
    		
    	</div>
     </div>
   
   
  </body>
</html>
