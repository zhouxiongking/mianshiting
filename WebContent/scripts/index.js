$(function(){
	
	// 初次加载页面，加载文章，判断是主页还是分类页
	initPage();
	
	// 查看更多
	bindGetMore();
	
	// 播放视频
	videoPlay();
	
	// 关闭视频div
	closeVideo();
});

/**
 * 关闭视频div
 */
function closeVideo() {
	$('.shield_down_div').click(function() {
		$('.video-play').hide();
		$('.shield_down_div').hide();
	});
}

/**
 * 点击播放视频
 */
function videoPlay() {
	$('#slide1_s0, .play').click(function() {
		$('.shield_down_div').show();
		$('.video-play').show();
	});
}

/**
 * 查看更多按钮，绑定事件
 */
function bindGetMore() {
	$('#get-more').click(function() {
		getMore();
	});
}

/**
 * 查看更多
 */
function getMore() {
	var keyword = $("#search-input").val();
	// 根据关键字查看更多
	if(keyword && keyword.trim().length) {
		var curPageNo = $('#currentPageNo').val();
		var searchPageNo = parseInt(curPageNo) + 1;
		sendRequest(keyword, searchPageNo, 'more');
	} else {
		var location = window.location.pathname;
		var curPageNo = $('#currentPageNo').val();
		var searchPageNo = parseInt(curPageNo) + 1;
		$('.loading').show();
		if(location.indexOf('html') >= 0) {
			// 分类页
			initCategoryPage(searchPageNo, 'more');
		} else {
			// 主页
			initMainPage(searchPageNo, 'more'); 
		}
	}
}

function initPage() {
	var location = window.location.pathname;
	$('.loading').show();
	if(location.indexOf('html') >= 0) {
		// 分类页
		initCategoryPage(1, 'classify');
	} else {
		// 主页
		initMainPage(1); 
	}
}

/**
 * 加载分类页数据
 * @param pageNo
 */
function initCategoryPage(pageNo, type) {
	var search = window.location.search;
	var category = search.split('=')[1];
	$.ajax({
		url: '/article-json/loadArticleByCategory',
		data: {
			pageNo: pageNo,
			category: category
		},
		dataType: 'json',
		success: function(result) {
			updatePageNo(result.articleList, pageNo);
			// 渲染结果
			renderPage(result.articleList, type);
			// 动态处理当前位置
			dealCurrentCategory(category);
		}
	});
}

function updatePageNo(list, pageNo) {
	$('.loading').hide();
	if(list && list.length) {
		$('#currentPageNo').val(pageNo);
	}
}

var mapObj = {
	'basic': ['基础教学', ''],
	'advance': ['进阶教学', ''],
	'framework': ['框架教学', ''],
	'tool': ['工具教学', ''],
	'NodeJS': ['NodeJS', ''],
	'db': ['数据库', ''],
	'Javascript': ['基础教学', 'Javascript'],
	'HTML5': ['基础教学', 'HTML5'],
	'CSS3': ['基础教学', 'CSS3'],
	'ES6': ['进阶教学', 'ES6'],
	'Vue': ['框架教学', 'Vue全家桶'],
	'AngularJS': ['框架教学', 'AngularJS'],
	'React': ['框架教学', 'React全家桶'],
	'Git': ['工具教学', 'Git教学'],
	'Webpack': ['工具教学', 'webpack教学'],
	'Mysql': ['数据库', 'Mysql'],
	'synthesize': ['综合', '']
}

/**
 * 动态处理当前位置
 */
function dealCurrentCategory(category) {
	var first = $('#current-first');
	var second = $('#current-second');
	first.text(mapObj[category][0]);
	second.text(mapObj[category][1]);
	switch(category) {
		case 'basic':
		case 'advance': 
		case 'framework':
		case 'tool':
		case 'NodeJS':
		case 'db':
		case 'synthesize':
			first.attr('href', '/html/?category=' + category);
			break;
		case 'Javascript':
		case 'HTML5':
		case 'CSS3':
			first.attr('href', '/html/?category=basic');
			second.attr('href', '/html/?category=' + category);
			break;
		case 'ES6': 
			first.attr('href', '/html/?category=advance');
			second.attr('href', '/html/?category=' + category);
			break;
		case 'Vue': 
		case 'AngularJS': 
		case 'React': 
			first.attr('href', '/html/?category=framework');
			second.attr('href', '/html/?category=' + category);
			break;
		case 'Git':
		case 'Webpack':
			first.attr('href', '/html/?category=tool');
			second.attr('href', '/html/?category=' + category);
			break;
		case 'Mysql':
			first.attr('href', '/html/?category=db');
			second.attr('href', '/html/?category=' + category);
			break;
		default:
			break;
	}
}

/**
 * 初次加载主页，加载文章
 */
function initMainPage(pageNo, type) {
	$.ajax({
		url: '/article-json/loadArticleByPage',
		data: {
			pageNo: pageNo
		},
		dataType: 'json',
		success: function(result) {
			updatePageNo(result.articleList, pageNo);
			// 渲染结果
			renderPage(result.articleList, type);
		}
	});
}

/**
 * 渲染页面
 */
function renderPage(list, type) {
	var articleDiv = $('.articles');
	var speStr = '';
	var buffer = [];
	// 如果返回数组为空
	if(list && list.length) {
		$('.no-more').hide();
	} else {
		if(type == 'search' || type == 'classify') {
			$('.no-more').text('抱歉，没找到相关文章~~~~(>_<)~~~~');
		} else {
			$('.no-more').text('没有更多了...');
		}
		$('.no-more').show();
		$('#get-more').hide();
	}
	for(var i = 0; i < list.length; i++) {
		if(list[i].category === 'synthesize'){
			list[i].category = '综合';
		}
		buffer.push('<div class="block">');
		// 类型
		buffer.push('<h2><span class="category">');
		buffer.push('<a href="/html?category=' + list[i].category +'" rel="category tag">' + list[i].category + '</a>');
		buffer.push('<i class="fa fa-caret-right"></i></span>');
		speStr = list[i].videoUrl ? '(内含学习视频)' : '';
		// 标题
		buffer.push('<a href="/articles?articleId=' + list[i].id + '" target="_ablank">' + list[i].title);
		buffer.push('<span class="red">' + speStr + '</span></a></h2>');
		buffer.push('<div class="clear"></div>');
		// 图片
		if(list[i].url) {
			buffer.push('<div class="viewimg">');
			buffer.push('<a href="/articles?articleId=' + list[i].id + '" target="_ablank" class="ipic" title=' + list[i].title + '>');
			buffer.push('<img src=' + list[i].url + ' alt=' + list[i].title + ' class="thumbnail">');
			buffer.push('<span class="shine" style="background-position: 160px 50%;">&nbsp;</span>');
			buffer.push('</a></div>');
		}
		// 简介
		buffer.push('<div class="preview">' + list[i].description + '</div>');
		buffer.push('<div class="preem">');
		// 时间
		buffer.push('<span><i class="fa fa-clock-o"></i>' + list[i].uploadtime + '</span>');
		// 作者
		buffer.push('<span><i class="fa fa-user"></i><span>' + list[i].username + '</span></span>')
		// 评论数
//		buffer.push('<span><i class="fa fa-comment-o"></i>');
//		buffer.push('<span class="ds-thread-count" data-thread-key="156">21</span></span>');
		// 阅读数
		buffer.push('<span><i class="fa fa-eye"></i>' + list[i].clicks + '</span>');
		// 以后可用于点赞
		buffer.push('<span></span>');
		// 阅读详情
		buffer.push('<span class="more">');
		buffer.push('<a href="/articles?articleId=' + list[i].id + '" title="这个没有略缩图，不会显示前面的图片！">阅读详情</a>');
		buffer.push('</span></div></div>');
	}
	if(type !== 'more'){
		articleDiv.empty();
	}
	articleDiv.append($(buffer.join("")));
}







