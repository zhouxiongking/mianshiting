<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="yiban.share.pojo.*"  %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>作品展示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link href="/styles/manage/manageCommon.css" type="text/css" rel="stylesheet">
	<link href="/styles/manage/showPicture.css" type="text/css" rel="stylesheet">
	
	<script type="text/javascript" src="/scripts/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="/scripts/manage/showPicture.js"></script>

  </head>
  
  <body>
    
    <div class="sheild_down_div"></div>
    <div class="show_delete_div_2">
		<div class="delete_div_content">&nbsp;审核通过 
			
		</div>
		<div>你确定要通过此作品吗？</div>
		<div class="yes_or_no_div">
			<span class="check-common yes_a_span_2">确&nbsp;定</span>
			<span class="check-common no_a_span_2" style="text-decoration: none; color: rgb(60, 60, 60);">关&nbsp;闭</span>
		</div>
	</div>
    
    <div class="uploading_tip">
   		<h4 style="font-size: 16px;">正在处理中，请耐心等候...</h4>
   		<img alt="等待上传" src="/images/uploading.gif" width="100px" height="100px" class="uploading_image">
    </div>
    
    <!-- 当前位置 -->
   	<div class="cur_postion">
   		<div class="location">
			当前位置：
			<a href="/picture/managePictureAction.action" class="location_a">图片管理</a> 
			<code>&gt; </code> 
			<a href="/picture/managePictureAction.action" class="location_a">全部图片</a> 
			<code>&gt; </code> 
			<a href="javascript:;" class="location_a">图片展示</a> 
		</div>
   	</div>
    
    <div class="wrap">
    	<div class="slide-wrap">
    		<div class="sw-player">
				<div class="part-a">
					<div class="swp-tit clearfix">
						<input type="hidden" id="hidden-picture-info" />
						<input type="hidden" id="hidden-picture-id"/>
						<input type="hidden" id="hidden-picture-theme"/>
						<h2 id="picture-cattheme">
							
						</h2>
						<br/>
						<h4 style="font-size: 14px;">作者：<span id="picture-username">  </span></h4>
					</div>
					<div class="swp-tool">
						<em class="swpt-time"></em>
					</div>
					<div class="swp-hd" style="width: 1000px; height: 608px;">
						<!-- 上一张 下一张 -->
						<a href="javascript:;" title="上一张" class="rgba-w-60 swp-btn swp-prev" style="display: inline;">
  							<i></i>
  						</a>
  						<a href="javascript:;" title="下一张" class="rgba-w-60 swp-btn swp-next" style="display: inline;">
  							<i></i>
  						</a>
  						<ul class="swp-hd-list" style="width: 35000px; position: relative;">
  						</ul>
					</div>
					<!-- 图片介绍 -->
					<div class="swp-txt clearfix">
						<div class="swpt-table">
							<div class="swpt-cell">
								<div class="swpt-cont">
									<span class="num">
										<em id="cur-pic-num">1</em> /
										<span id="total-num">11</span>
									</span>
									<div class="swpt-1013">
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>  
				<!-- 审核意见 -->  	
				<div class="check">
					<h2 class="check-title">审核意见</h2>
					<div class="check-rel-div">
						<span class="check-common pass">审核通过</span>
						<span class="check-common deny">审核拒绝</span>
						<span class="deny-reason-tip">请在以下输入框内填写拒绝的原因</span>						
					</div>
					<div class="deny-div">
						<textarea rows="10" cols="70" class="check-opinion-text"></textarea>
						<br/>
						<span class="check-common check-deny" id="deny-btn">确定</span>
					</div>
					
				</div>	
    		</div>
    	</div>
    </div>
    
    
    
    
  </body>
</html>
