function a(){var a=window.location.search.split("=")[1];a&&parseInt(a)>0&&$.ajax({url:"/article-json/loadPreAndNext",data:{articleId:a},dataType:"json",success:function(a){e(a.preArticle,a.nextArticle)}})}function e(a,e){var t=$("#pre"),s=$("#next");a&&a.id?(t.text(a.title),t.attr("href","/articles/?articleId="+a.id)):(t.text("没有了"),t.attr("href","javascript:;")),e&&e.id?(s.text(e.title),s.attr("href","/articles/?articleId="+e.id)):(s.text("没有了"),s.attr("href","javascript:;"))}function t(){var a=window.location.search.split("=")[1];$("#SOHUCS").attr("sid","article-"+a),a&&parseInt(a)>0&&$.ajax({url:"/article-json/loadArticleDetail",data:{articleId:a},dataType:"json",success:function(a){s(a.article,a.reading)}})}function s(a){var e=$(".con-article");if($(".con-article").empty(),e.empty(),e.append(a.content),a.videoUrl){var t=[];t.push('<video id="video" class="video-js vjs-default-skin vjs-big-play-centered for-video" controls preload="none"'),t.push('data-setup="{}">'),t.push('<source src="'+a.videoUrl+'" type="video/mp4"/>'),t.push('<track kind="captions" src="" srclang="en" label="English"></track>'),t.push('<track kind="subtitles" src="" srclang="en" label="English"></track>'),t.push("</video>");var s=$(t.join(""));$(".article-box .article-sub").after(s);var i=$("#video").css("width"),n=i.substring(0,i.length-2);$("#video").css("height",n/2+"px")}var l=$(".article-content a");(console.log(l),l&&l.length>=0)&&$(l[0]).attr("href","javascript:;")}function i(){$(window).scroll(function(){$(this).scrollTop()>=200?($(".side-btns-wrap").addClass("show"),$(".side-btns-wrap").removeClass("hide")):($(".side-btns-wrap").addClass("hide"),$(".side-btns-wrap").removeClass("show"))})}function n(){$(".side-btns-top-btn").click(function(){$("html, body").animate({scrollTop:0},500)})}function l(){$("#search-btn").click(function(){var a=$("#search-input").val();a&&a.trim().length&&($(".articles").empty(),$(".loading").show(),c(a,1,"search"))})}function c(a,e,t){$.ajax({url:"/article-json/loadArticlesByKeyword",data:{keyword:encodeURIComponent(a),pageNo:e},dataType:"json",success:function(a){j(a.articleList,e),_(a.articleList,t)}})}function r(){$(".toggle-search").click(function(){$("i",this).toggleClass("fa-search fa-remove"),$(".site-search").toggleClass("opacity-0 opacity-1")})}function o(){$.ajax({url:"/article-json/loadHotLabels",dataType:"json",success:function(a){u(a.labelList)}})}function u(a){for(var e=$(".hot-label"),t=[],s=0;s<a.length;s++)t.push('<li><a href="/html?category='+a[s].name+'">'+a[s].name+"（"+a[s].counts+"）</a></li>");e.append($(t.join("")))}function h(){$.ajax({url:"/article-json/loadRecentArticles",dataType:"json",success:function(a){d(a.recentArticleList,"recent")}})}function p(){$.ajax({url:"/article-json/loadHotArticles",dataType:"json",success:function(a){d(a.hotArticleList,"hot")}})}function d(a,e){var t;t="hot"==e?$(".hot-articles"):$(".recommend-articles");for(var s=[],i=0;i<a.length;i++)s.push('<li><div class="sideshow">'),s.push('<a href="/articles/?articleId='+a[i].id+'" target="_ablank" title="'+a[i].title+'">'),s.push('<img width="80" height="60" src="'+a[i].url+'" class="icon wp-post-image" alt="'+a[i].title+'" title="'+a[i].title+'"></a>'),s.push('<a href="/articles/?articleId='+a[i].id+'" target="_ablank" title="'+a[i].title+'">'+a[i].title+"</a> "),s.push('<span class="datetime">'+a[i].uploadtime+"</span>"),s.push("</div></li>");t.append(s.join(""))}function m(){$(".short-navbar").toggle(function(){$(".navbar-collapse").show()},function(){$(".navbar-collapse").hide()})}function f(){$(".shield_down_div").click(function(){$(".video-play").hide(),$(".shield_down_div").hide()})}function g(){$("#slide1_s0, .play").click(function(){$(".shield_down_div").show(),$(".video-play").show()})}function v(){$("#get-more").click(function(){y()})}function y(){var a=$("#search-input").val();if(a&&a.trim().length){var e=$("#currentPageNo").val();c(a,s=parseInt(e)+1,"more")}else{var t=window.location.pathname,s=(e=$("#currentPageNo").val(),parseInt(e)+1);$(".loading").show(),t.indexOf("html")>=0?w(s,"more"):S(s,"more")}}function b(){var a=window.location.pathname;$(".loading").show(),a.indexOf("html")>=0?w(1,"classify"):S(1)}function w(a,e){var t=window.location.search.split("=")[1];$.ajax({url:"/article-json/loadArticleByCategory",data:{pageNo:a,category:t},dataType:"json",success:function(s){j(s.articleList,a),_(s.articleList,e),x(t)}})}function j(a,e){$(".loading").hide(),a&&a.length&&$("#currentPageNo").val(e)}$(function(){t(),a()}),$(function(){p(),h(),o(),r(),l(),i(),n(),m()}),$(function(){b(),v(),g(),f()});var k={basic:["基础教学",""],advance:["进阶教学",""],framework:["框架教学",""],tool:["工具教学",""],NodeJS:["NodeJS",""],db:["数据库",""],Javascript:["基础教学","Javascript"],HTML5:["基础教学","HTML5"],CSS3:["基础教学","CSS3"],ES6:["进阶教学","ES6"],Vue:["框架教学","Vue全家桶"],AngularJS:["框架教学","AngularJS"],React:["框架教学","React全家桶"],Git:["工具教学","Git教学"],Webpack:["工具教学","webpack教学"],Mysql:["数据库","Mysql"]};function x(a){var e=$("#current-first"),t=$("#current-second");switch(e.text(k[a][0]),t.text(k[a][1]),a){case"basic":case"advance":case"framework":case"tool":case"NodeJS":case"db":e.attr("href","/html/?category="+a);break;case"Javascript":case"HTML5":case"CSS3":e.attr("href","/html/?category=basic"),t.attr("href","/html/?category="+a);break;case"ES6":e.attr("href","/html/?category=advance"),t.attr("href","/html/?category="+a);break;case"Vue":case"AngularJS":case"React":e.attr("href","/html/?category=framework"),t.attr("href","/html/?category="+a);break;case"Git":case"Webpack":e.attr("href","/html/?category=tool"),t.attr("href","/html/?category="+a);break;case"Mysql":e.attr("href","/html/?category=db"),t.attr("href","/html/?category="+a)}}function S(a,e){$.ajax({url:"/article-json/loadArticleByPage",data:{pageNo:a},dataType:"json",success:function(t){j(t.articleList,a),_(t.articleList,e)}})}function _(a,e){var t=$(".articles"),s="",i=[];a&&a.length?$(".no-more").hide():("search"==e||"classify"==e?$(".no-more").text("抱歉，没找到相关文章~~~~(>_<)~~~~"):$(".no-more").text("没有更多了..."),$(".no-more").show(),$("#get-more").hide());for(var n=0;n<a.length;n++)i.push('<div class="block">'),i.push('<h2><span class="category">'),i.push('<a href="/html?category='+a[n].category+'" rel="category tag">'+a[n].category+"</a>"),i.push('<i class="fa fa-caret-right"></i></span>'),s=a[n].videoUrl?"(内含学习视频)":"",i.push('<a href="/articles?articleId='+a[n].id+'" target="_ablank">'+a[n].title),i.push('<span class="red">'+s+"</span></a></h2>"),i.push('<div class="clear"></div>'),a[n].url&&(i.push('<div class="viewimg">'),i.push('<a href="/articles?articleId='+a[n].id+'" target="_ablank" class="ipic" title='+a[n].title+">"),i.push("<img src="+a[n].url+" alt="+a[n].title+' class="thumbnail">'),i.push('<span class="shine" style="background-position: 160px 50%;">&nbsp;</span>'),i.push("</a></div>")),i.push('<div class="preview">'+a[n].description+"</div>"),i.push('<div class="preem">'),i.push('<span><i class="fa fa-clock-o"></i>'+a[n].uploadtime+"</span>"),i.push('<span><i class="fa fa-user"></i><span>'+a[n].username+"</span></span>"),i.push('<span><i class="fa fa-eye"></i>'+a[n].clicks+"</span>"),i.push("<span></span>"),i.push('<span class="more">'),i.push('<a href="/articles?articleId='+a[n].id+'" title="这个没有略缩图，不会显示前面的图片！">阅读详情</a>'),i.push("</span></div></div>");"more"!==e&&t.empty(),t.append($(i.join("")))}function C(a,e){$(".loading").show(),$("#ul-message-list").empty(),$.ajax({url:"/message-json/loadMsgByPage",type:"post",data:{pageNo:a,type:e},dataType:"json",success:function(t){var s;$(".loading").hide(),T(t.msgList,a),"init"==e&&$("#totalCount").text(t.totalCount),s=t.totalCount?t.totalCount%20?parseInt(t.totalCount/20)+1:parseInt(t.totalCount/20):1,"init"==e&&J(s)}})}function T(a,e){for(var t=$("#ul-message-list"),s=[],i=20*(e-1)+1,n=0;n<a.length;n++)s.push('<li><div class="pic"><img src="/html5_blue/images/anonymity.png" width="50px"/></div>'),s.push('<div class="msg-content"><span>匿名</span>'),s.push("<span>"+a[n].leaveTime+"</span>"),s.push('<span class="level">第'+(i+n)+"楼</span>"),s.push('<p class="msg">'+a[n].content+"</p>"),s.push("</div></li>");t.append(s.join(""))}function J(a){$(".pager").pagination({pageCount:a,coping:!0,mode:"fixed",homePage:"首页",endPage:"末页",prevContent:"上页",nextContent:"下页",callback:function(a){C(a.getCurrent(),"page")}})}function A(){$("#content").keyup(function(){var a=$("#content").val(),e=$("#count");e.text(a.length),a.length>100?e.css("color","red"):e.css("color","#666")})}function L(){$("#btn").click(function(){var a=$("#content").val();$(".warning");return!(!a||!a.trim().length)&&(a.trim().length>100?(N("请输入100字以内的内容"),!1):void I(a))})}function I(a){var e=$("#btn");e.attr("disabled",!0),$.ajax({url:"/message-json/saveMessage",type:"post",data:{content:a},dataType:"json",success:function(){N("感谢你的留言~"),$("#content").val(""),$("#count").text(0),setTimeout(function(){C(1,"init")},500),e.removeAttr("disabled")}})}function N(a){var e=$(".warning");e.text(a),e.animate({opacity:1},1e3),setTimeout(function(){e.animate({opacity:0},1e3)},2e3)}function M(){var a=window.location.search,e=window.location.pathname,t=a.split("=")[1],s=$(".navbar-collapse"),i=[];i.push("<ul>"),"/"==e?i.push('<li class="menu-item current_page_item"><a href="/">首页</a></li>'):i.push('<li class="menu-item"><a href="/">首页</a></li>'),["basic","Javascript","CSS3","HTML5"].join().indexOf(t)>=0?i.push('<li class="menu-item current_page_item"><a href="/html/?category=basic">基础教学</a>'):i.push('<li class="menu-item "><a href="/html/?category=basic">基础教学</a>'),i.push('<ul class="sub-menu">'),i.push('<li class="sub-menu-item"><a href="/html/?category=Javascript">Javascript</a></li>'),i.push('<li class="sub-menu-item"><a href="/html/?category=CSS3">CSS3</a></li>'),i.push('<li class="sub-menu-item"><a href="/html/?category=HTML5">HTML5</a></li>'),i.push("</ul></li>"),["advance","ES6"].join().indexOf(t)>=0?i.push('<li class="menu-item current_page_item"><a href="/html/?category=advance">进阶教学</a>'):i.push('<li class="menu-item "><a href="/html/?category=advance">进阶教学</a>'),i.push('<ul class="sub-menu">'),i.push('<li class="sub-menu-item"><a href="/html/?category=ES6">ES6</a></li>'),i.push("</ul></li>"),["framework","Vue","AngularJS","React"].join().indexOf(t)>=0?i.push('<li class="menu-item current_page_item"><a href="/html/?category=framework">框架教学</a>'):i.push('<li class="menu-item "><a href="/html/?category=framework">框架教学</a>'),i.push('<ul class="sub-menu">'),i.push('<li class="sub-menu-item"><a href="/html/?category=Vue">Vue全家桶</a></li>'),i.push('<li class="sub-menu-item"><a href="/html/?category=AngularJS">AngularJS</a></li>'),i.push('<li class="sub-menu-item"><a href="/html/?category=React">React全家桶</a></li>'),i.push("</ul></li>"),["tool","Git","Webpack","Gulp"].join().indexOf(t)>=0?i.push('<li class="menu-item current_page_item"><a href="/html/?category=tool">工具教学</a>'):i.push('<li class="menu-item "><a href="/html/?category=tool">工具教学</a>'),i.push('<ul class="sub-menu">'),i.push('<li class="sub-menu-item"><a href="/html/?category=Git">Git教学</a></li>'),i.push('<li class="sub-menu-item"><a href="/html/?category=Webpack">Webpack教学</a></li>'),i.push("</ul></li>"),"NodeJS".indexOf(t)>=0?i.push('<li class="menu-item current_page_item"><a href="/html/?category=NodeJS">NodeJS</a>'):i.push('<li class="menu-item "><a href="/html/?category=NodeJS">NodeJS</a>'),i.push("</li>"),["db","Mysql"].join().indexOf(t)>=0?i.push('<li class="menu-item current_page_item"><a href="/html/?category=db">数据库</a>'):i.push('<li class="menu-item "><a href="/html/?category=db">数据库</a>'),i.push('<ul class="sub-menu">'),i.push('<li class="sub-menu-item"><a href="/html/?category=Mysql">Mysql</a></li>'),i.push("</ul></li>"),e.indexOf("liuyan")>=0?i.push('<li class="menu-item current_page_item"><a href="/liuyan/">给我留言</a>'):i.push('<li class="menu-item "><a href="/liuyan/">给我留言</a>'),i.push('<ul class="sub-menu"></ul></li>'),e.indexOf("fm")>=0?i.push('<li class="menu-item current_page_item"><a href="/fm/">关于站主</a>'):i.push('<li class="menu-item "><a href="/fm/">关于站主</a>'),i.push('<ul class="sub-menu"></ul></li>'),i.push("</ul>"),s.append($(i.join("")))}$(function(){L(),A(),C(1,"init")}),$(function(){M()});