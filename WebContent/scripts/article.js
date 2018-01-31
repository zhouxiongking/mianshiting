$(function() {
	/**
	 * 展示文章详情
	 */
	initArticlePage();
	
	/**
	 * 获取上一篇和下一篇文章
	 */
	getPreNextArticle();
});

/**
 * 获取上一篇和下一篇文章
 */
function getPreNextArticle() {
	var search = window.location.search;
	var articleId = search.split('=')[1];
	
	$.ajax({
		url: '/article-json/loadPreAndNext',
		data: {
			articleId: articleId
		},
		dataType: 'json',
		success: function(result) {
			renderPreNextArticle(result.preArticle, result.nextArticle);
		}
	});
}

/**
 * 渲染上一篇，下一篇
 * @param preArticle
 * @param nextArticle
 */
function renderPreNextArticle(preArticle, nextArticle) {
	var pre = $('.first');
	var next = $('.last');
	
	pre.text(preArticle.title);
	$('a', pre).attr('href', '/articles/?articleId=' + preArticle.id);
	next.text(nextArticle.title);
	$('a', next).attr('href', '/articles/?articleId=' + nextArticle.id);
}

/**
 * 加载具体文章详情
 */
function initArticlePage() {
	var search = window.location.search;
	var articleId = search.split('=')[1];
	
	$.ajax({
		url: '/article-json/loadArticleDetail',
		data: {
			articleId: articleId
		},
		dataType: 'json',
		success: function(result) {
			renderArticle(result.article, result.reading);
		}
	});
}

/**
 * 渲染文章详情
 * @param article
 */
function renderArticle(article) {
	var articleDiv = $('.con-article');
	articleDiv.empty();
	articleDiv.append(article.content);
}







