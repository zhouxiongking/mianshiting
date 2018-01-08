<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>左侧菜单栏页面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<base target="mainFrame">
	
	<link rel="stylesheet" type="text/css" href="/styles/manage/manage.css">
	<script type="text/javascript" src="/scripts/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="/scripts/manage/left.js"></script>

  </head>
  
  <body style="background: #f4f6f1">
    
    <table width="100%" class="floot">
		<tbody>
			<tr>
				<td class="h_floot_left" style="vertical-align:top;">
					<div class="h_floot_leftdiv faq_menu" id="faq_menu">
						<div class="co20">
							<h4 class="b cp s4">用户管理</h4>
							<div id="left_1">
								<dl>
									<dt>
										<a href="manageUserAction.action">全部用户</a>
									</dt>
								</dl>
							</div>
						</div>
						
						<div class="co20">
							<h4 class="b cp s4">图片管理</h4>
							<div id="left_2">
								<dl>
									<dt>
										<a href="/picture/managePictureAction.action">全部图片</a>
									</dt>
								</dl>
							</div>
						</div>
						
						<div class="co20">
							<h4 class="b cp s4">音频管理</h4>
							<div id="left_3">
								<dl>
									<dt>
										<a href="/audio/doSwitchManageAudioAction.action">全部音频</a>
									</dt>
									
								</dl>
							</div>
						</div>
						
						<div class="co20">
							<h4 class="b cp s4">视频管理</h4>
							<div id="left_4">
								<dl>
									<dt>
										<a href="/vedio/manageVedioAction.action">全部视频</a>
									</dt>
								</dl>
							</div>
						</div>
						
						<div class="co20">
							<h4 class="b cp s4">系统维护</h4>
							<div id="left_7">
								<dl>
									<dt>
										<a href="javascript: void(0);">修改密码</a>
									</dt>
									
								</dl>
							</div>
						</div>
					</div>
				</td>
    		</tr>
    	</tbody>
    </table>
    
  </body>
</html>
