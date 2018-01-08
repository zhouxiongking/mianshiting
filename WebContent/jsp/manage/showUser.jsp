<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>用户信息展示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<base target="mainFrame">
	
	<link href="/styles/manage/manageCommon.css" rel="stylesheet" type="text/css">
	<link href="/styles/manage/showUser.css" rel="stylesheet" type="text/css">
	
  </head>
  
  <body>
  
  	
  
  	<div class="show-user-info">
  		<div>
  			<h4>用户详细资料</h4>
  			<ul>
  				<li>
  					<span class="bl">用户id：</span>${user.id}
  				</li>
  				<li>
  					<span class="bl">用户名：</span>${user.username}
  				</li>
  				<li>
  					<span class="bl">密码：</span>${user.password}
  				</li>
  				<li>
  					<span class="bl">真实姓名：</span>${user.realname}
  				</li>
  				<li>
  					<span class="bl">学院：</span>${user.academy}
  				</li>
  				<li>
  					<span class="bl">专业：</span>${user.major}
  				</li>
  				<li>
  					<span class="bl">年级：</span>${user.grade}
  				</li>
  				<li>
  					<span class="bl">联系电话：</span>${user.tel}
  				</li>
  				<li>
  					<span class="bl">email：</span>${user.email}
  				</li>
  				
  			</ul>
  		</div>
  		<a href="/manageUserAction.action" class="return-a">返回</a>
  	</div>
  	
  	
  </body>
</html>
