$(function() {
	/**
	 *  通用内容
	 */
	// 通过js处理导航
	initNav();
	
	// 获取热门文章
	getHotArticles();
	
	// 获取近期文章
	getRecentArticles();
	
	// 获取热门标签
	getHotLabels();
	
});

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
	for(var i = 0; i < list.length; i++) {
		buffer.push('<li><a href="/html?category=' + list[i].name + '">' + list[i].name + '（' + list[i].counts + '）</a></li>');
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
 * 通过js处理导航，复用
 */
function initNav() {
	var search = window.location.search;
	var pathname = window.location.pathname;
	var category = search.split('=')[1];
	var basicArr = ['basic', 'Javascript', 'CSS3', 'HTML5'];
	var advanceArr = ['advance', 'ES6'];
	var frameworkArr = ['framework', 'Vue'];
	var toolArr = ['tool', 'Git', 'Webpack'];
	var nav = $('.navbar-collapse');
	var buffer = [];
	buffer.push('<ul>');
	if(pathname == '/') {
		buffer.push('<li class="menu-item current_page_item"><a href="/">首页</a></li>');
	} else {
		buffer.push('<li class="menu-item"><a href="/">首页</a></li>');
	}
	
	if(basicArr.join().indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=basic">基础教学</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=basic">基础教学</a>');
	}
	
	buffer.push('<ul class="sub-menu">');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=Javascript">Javascript</a></li>');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=CSS3">CSS3</a></li>');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=HTML5">HTML5</a></li>');
	buffer.push('</ul></li>');
	if(advanceArr.join().indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=advance">进阶教学</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=advance">进阶教学</a>');
	}
	
	buffer.push('<ul class="sub-menu">');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=ES6">ES6</a></li>');
	buffer.push('</ul></li>');
	if(frameworkArr.join().indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=framework">框架教学</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=framework">框架教学</a>');
	}
	buffer.push('<ul class="sub-menu">');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=Vue">Vue全家桶</a></li>');
	buffer.push('</ul></li>');
	if(toolArr.join().indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=tool">工具教学</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=tool">工具教学</a>');
	}
	buffer.push('<ul class="sub-menu">');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=Git">Git教学</a></li>');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=Webpack">Webpack教学</a></li>');
	buffer.push('</ul></li>');
	if(pathname.indexOf('liuyan') >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/liuyan/">给我留言</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/liuyan/">给我留言</a>');
	}
	buffer.push('<ul class="sub-menu"></ul></li>');
	if(pathname.indexOf('fm') >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/fm/">关于博主</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/fm/">关于博主</a>');
	}
	buffer.push('<ul class="sub-menu"></ul></li>');
	buffer.push('</ul>');
	
	nav.append($(buffer.join('')));
}











