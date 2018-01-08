<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>视频展示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link href="/styles/manage/manageCommon.css" type="text/css" rel="stylesheet">
	<link href="/styles/manage/showPicture.css" type="text/css" rel="stylesheet">
	<link href="/styles/vedio/vedioShow.css" type="text/css" rel="stylesheet">
	<link href="/styles/vedio-js.css" type="text/css" rel="stylesheet">
	
	<script type="text/javascript" src="/scripts/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="/scripts/manage/showVedio.js"></script>
	<script type="text/javascript" src="/scripts/vedio.js"></script>
	<script type="text/javascript" src="/scripts/ckplayer/ckplayer/ckplayer.js"></script>

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
			<a href="/vedio/manageVedioAction.action" class="location_a">视频管理</a> 
			<code>&gt; </code> 
			<a href="/picture/manageVedioAction.action" class="location_a">全部视频</a> 
			<code>&gt; </code> 
			<a href="javascript:;" class="location_a">视频展示</a> 
		</div>
   	</div>
    
    <div class="wrap">
    	<div class="slide-wrap">
    		<div class="sw-player">
				
				<!-- 视频播放start -->
	    		<div class="F_con clearfix">
	    			<input type="hidden" id="hidden-vedio-id" value="<s:property value="vedio.id"/>"/>
		    		<div class="Vd_titBox clearfix">
		    			<h2 title="<s:property value="vedio.label"/>---<s:property value="vedio.title"/>">
		    				<s:property value="vedio.label"/>---<s:property value="vedio.title"/>
		    			</h2>
		    		</div>
	    			
	    			<div class="vd_playBox" style="position:static;">
	    				<div class="playBox" style="z-index: 1400; position: relative;">
	    					<video controls="controls" preload="preload" width="1000px;" height="600px;" autoplay="autoplay">
	    						<source src="<s:property value="vedio.url"/>" type="video/mp4"/>
	    						您的浏览器不支持vedio标签
	    					</video>
	    				</div>
	    			</div>
	    			
	    			<div class="vd_msg">
    				<div class="vedio_detail">
    					<div class="msg_cnt">
          					<div class="mg_a">
          						<dl class="m_hd dtl_lst">
            						<dt>作者：</dt>
            							<dd>
              	             	           <span class="tag_nm"><s:property value="vedio.username"/></span>
	                                    </dd>
          						</dl>
          						<dl class=" dtl_lst">
            						<dt class="m_hd">简介：</dt>
            						<dd>
            							<span id="detail_part"><s:property value="vedio.description"/></span>
            						</dd>
          						</dl>
        					</div>
        					<div class="mg_b">
			                	<dl class="m_hd dtl_lst">
			                    	<dt>时间：</dt><dd><span><s:property value="vedio.uploadtime"/></span></dd>
			                    </dl>
			                    <dl class="m_hd dtl_lst">
			                    	<dt>点击量：</dt>
			                    	<dd><s:property value="vedio.clicks"/></dd>
			                    </dl>
                			</div>
    					</div>
    				</div>
    			</div>
	    		</div>
	    		<!-- 视频播放end -->
				
				<!-- 审核意见 -->  	
				<div class="check">
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
