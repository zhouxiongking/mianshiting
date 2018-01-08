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
	
	

  </head>
  
  <frameset rows="15%,*" cols="*" frameborder="yes" border="1" framespacing="1">  
        <frame src="/jsp/manage/top.jsp" name="topFrame" scrolling="No" noresize="noresize" id="topFrame" title="topFrame" />  
         
        <frameset cols="15%,*" frameborder="yes" border="1" framespacing="1">  
            <frame src="/jsp/manage/left.jsp" name="leftFrame" scrolling="yes" 
                   noresize="noresize" id="leftFrame" title="leftFrame" />  
            <frame src="/jsp/manage/main.jsp" name="mainFrame" noresize="noresize" id="mainFrame" title="mainFrame" />  
        </frameset>  
    </frameset> 
  
</html>
