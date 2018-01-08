<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>音频上传</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link href="/styles/picture/pictureUpload.css" rel="stylesheet" type="text/css">
	<link href="/styles/common.css" rel="stylesheet" type="text/css">
	
	<script type="text/javascript" src="/scripts/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="/scripts/audio/upload_audio.js"></script>

  </head>
  
  <body style="background: whitesmoke;">
  	
  	<!-- 用于遮住下层的div -->
    <div class="shield_down_div"></div>
    <div class="uploading_tip" style="bottom: 38%;">
   		<h4 style="font-size: 16px;">您的作品正在上传中，请耐心等候...</h4>
   		<img alt="等待上传" src="/images/uploading.gif" width="100px" height="100px" class="uploading_image">
    </div>  
    
    <div class="wrap" style="margin-top: 15px;">
    	<h2 style="text-align: center; line-height: 40px; font-size: 26px;">音频上传</h2>
    	<!-- 上传作品start -->
		<form action="audio/uploadAudioAction.action" class="upload-form" method="post" enctype="multipart/form-data">
			<div class="upload-wrap up_active">
				<div class="up_top cysel">
					<p class="product-style">
						视频主题：
						<input type="text" class="input-text" style="margin-left: 23px;" name="audio.title" id="audio-title" 
					 	     placeholder="请输入视频主题" value="<s:property value='audio.title'/>"/>
						<span style="margin-left: 10px;">*必填项</span>
						<span class="error-tip fill-info-title" style="display: none; color: red;">标红处为必填项</span>
					</p>
					<p class="product-style">
						总时长(秒)：
						<input type="text" class="input-text" style="margin-left: 14px;" name="audio.totaltime" id="audio-totaltime" 
					 	     placeholder="以秒为单位，只需输入数字即可" value="<s:property value='audio.totaltime'/>"/>
						<span style="margin-left: 10px;">*必填项</span>
						<span class="error-tip fill-info-time" style="display: none; color: red;">请输入合法数字</span>
					</p>
					<div class="psre fl">
						<input type="hidden" id="total-audio-num" value="0"/>
						<span class="error-tip upload-audio-tip" style="margin-left: 0px;">
						    <s:property value="result"/>
						</span>
						<br/>
						<input type="file" name="audios" onchange="doChoose()" style="margin-top: 10px;"/>
						<br/>
						<p style="margin-top: 10px;">
							<span class="single-title">
 							<span style="color: blue">提示：为方便音频的正常播放，请上传MP3格式的视频，如果不是MP3格式请自行下载音频格式转换工具进行转换</span>
 						</span>
						</p>
						
					</div>
					<div class="up-active-btn">
						<input type="submit" value="提交" class="submit-btn" onclick="return showUploadingGif();"/>
					</div>
				</div>
			</div>
		</form>
		<!-- 上传作品end -->
    </div>
    
    
  </body>
</html>
