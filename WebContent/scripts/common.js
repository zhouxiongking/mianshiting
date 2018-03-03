$(function() {
	/**
	 *  通用内容
	 */
	// 获取热门文章
	getHotArticles();
	
	// 获取近期文章
	getRecentArticles();
	
	// 获取热门标签
	getHotLabels();
	
	// 搜索按钮事件
	bindSearchBtn();
	
	// 搜索请求
	searchKeyword();
	
	// 页面滚动后，显示或隐藏回到顶端的div
	showToTop();
	
	// 回到顶端
	scrollToTop();
	
	// 移动端导航事件
	navbarEvent();
	
});

/**
 * 页面滚动后，显示或隐藏回到顶端的div
 */
function showToTop() {
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		if(scrollTop >= 200) {
			$(".side-btns-wrap").addClass('show');
			$(".side-btns-wrap").removeClass('hide');
		} else{
			$(".side-btns-wrap").addClass('hide');
			$(".side-btns-wrap").removeClass('show');
		}
	});
}

/**
 * 回到顶端
 */
function scrollToTop() {
	$(".side-btns-top-btn").click(function() {
		$("html, body").animate({"scrollTop": 0}, 500);
	});
}

/**
 * 根据关键字搜索文章
 */
function searchKeyword() {
	$("#search-btn").click(function() {
		var keyword = $("#search-input").val();
		if(keyword && keyword.trim().length) {
			var articleDiv = $('.articles');
			articleDiv.empty();
			$('.loading').show();
			sendRequest(keyword, 1, 'search');
		}
	});
}

/**
 * 发送请求，根据关键字查询文章
 * @param keyword
 * @param pageNo
 */
function sendRequest(keyword, pageNo, type) {
	$.ajax({
		url: '/article-json/loadArticlesByKeyword',
		data: {
			keyword: encodeURIComponent(keyword),
			pageNo: pageNo
		},
		dataType: 'json',
		success: function(result){
			updatePageNo(result.articleList, pageNo);
			// 渲染结果
			renderPage(result.articleList, type);
		}
	}); 
}

/**
 * 搜索按钮事件
 */
function bindSearchBtn() {
	$('.toggle-search').click(function() {
		$('i', this).toggleClass('fa-search fa-remove');
		$('.site-search').toggleClass('opacity-0 opacity-1');
	});
}

/**
 * 获取热门标签
 */
function getHotLabels() {
	$.ajax({
		url: '/article-json/loadHotLabels',
		dataType: 'json',
		success: function(result){
			renderLabelList(result.labelList);
		}
	});
}

/**
 * 渲染热门标签
 * @param list
 */
function renderLabelList(list) {
	var labelUl = $('.hot-label');
	var buffer = [];
	var labelName;
	for(var i = 0; i < list.length; i++) {
		if(list[i].name === 'synthesize') {
			labelName = '综合';
		} else {
			labelName = list[i].name;
		}
		buffer.push('<li><a href="/html?category=' + list[i].name + '">' + labelName + '（' + list[i].counts + '）</a></li>');
	}
	labelUl.append($(buffer.join('')));
}

/**
 * 获取近期文章
 */
function getRecentArticles() {
	$.ajax({
		url: '/article-json/loadRecentArticles',
		dataType: 'json',
		success: function(result) {
			renderHotArticles(result.recentArticleList, 'recent');
		}
	});
}

/**
 * 获取热门文章
 */
function getHotArticles() {
	$.ajax({
		url: '/article-json/loadHotArticles',
		dataType: 'json',
		success: function(result){
			renderHotArticles(result.hotArticleList, 'hot');
		}
	});
}

/**
 * 渲染热门，近期文章
 * @param list
 */
function renderHotArticles(list, type) {
	var articleUl;
	if(type == 'hot') {
		articleUl = $('.hot-articles');
	} else {
		articleUl = $('.recommend-articles');
	}
	var buffer = [];
	for(var i = 0; i < list.length; i++) {
		buffer.push('<li><div class="sideshow">');
		buffer.push('<a href="/articles/?articleId=' + list[i].id + '" target="_ablank" title="' + list[i].title +'">');
		buffer.push('<img width="80" height="60" src="' + list[i].url + '" class="icon wp-post-image" alt="' + list[i].title + '" title="' + list[i].title + '"></a>');
		buffer.push('<a href="/articles/?articleId=' + list[i].id + '" target="_ablank" title="' + list[i].title +'">' + list[i].title + '</a> ');
		buffer.push('<span class="datetime">' + list[i].uploadtime + '</span>');
		buffer.push('</div></li>');
	}
	articleUl.append(buffer.join(''));
}

/**
 * 移动端导航事件
 */
function navbarEvent() {
	$('.short-navbar').toggle(function() {
		$('.navbar-collapse').show();
	}, function() {
		$('.navbar-collapse').hide();
	});
}











