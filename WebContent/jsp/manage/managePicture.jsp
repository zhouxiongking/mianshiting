<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>图片管理</title>
    
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
	<script type="text/javascript" src="/scripts/manage/managePicture.js"></script>
	
	
  </head>
  
  <body>
    
    <!-- 当前位置 -->
   	<div class="cur_postion">
   		<div class="location">
			当前位置：
			<a href="/picture/managePictureAction.action" class="location_a">图片管理</a> 
			<code>&gt; </code> 
			<a href="/picture/managePictureAction.action" class="location_a">全部图片</a> 
		</div>
   	</div>
    
    <!-- 显示图片的div -->
	<div class="section">
   		<div id="pro-div"></div>
   	</div>
    
  </body>
</html>
