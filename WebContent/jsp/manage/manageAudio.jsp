<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>音频管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link href="/styles/kendo/kendo.common.min.css" rel="stylesheet" type="text/css">
	<link href="/styles/kendo/kendo.dataviz.default.min.css" rel="stylesheet" type="text/css">
	<link href="/styles/kendo/kendo.dataviz.min.css" rel="stylesheet" type="text/css">
	<link href="/styles/kendo/kendo.default.min.css" rel="stylesheet" type="text/css">
	<link href="/styles/manage/manageCommon.css" rel="stylesheet" type="text/css">
	
	<script type="text/javascript" src="/scripts/kendo/jquery.min.js"></script>
	<script type="text/javascript" src="/scripts/kendo/kendo.all.min.js"></script>
	<script type="text/javascript" src="/scripts/manage/manageAudio.js"></script>
	
  </head>
  
  <body>
    
    <!-- 当前位置 -->
   	<div class="cur_postion">
   		<div class="location">
			当前位置：
			<a href="/audio/doSwitchManageAudioAction.action" class="location_a">音频管理</a> 
			<code>&gt; </code> 
			<a href="/audio/doSwitchManageAudioAction.action" class="location_a">全部音频</a> 
		</div>
   	</div>
    
    <!-- 显示视频的div -->
	<div class="section">
   		<div id="pro-div"></div>
   	</div>
    
    <input type="hidden" id="current-title"/>
    <audio id="myAudio" src="" controls="true" style="display: none;" autoplay=""></audio>
  </body>
</html>
