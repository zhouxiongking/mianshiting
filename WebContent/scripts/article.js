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
	if(articleId && parseInt(articleId) > 0) {
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
}

/**
 * 渲染上一篇，下一篇
 * @param preArticle
 * @param nextArticle
 */
function renderPreNextArticle(preArticle, nextArticle) {
	var pre = $('#pre');
	var next = $('#next');
	if(preArticle && preArticle.id) {
		pre.text(preArticle.title);
		pre.attr('href', '/articles/?articleId=' + preArticle.id);
	} else {
		pre.text('没有了');
		pre.attr('href', 'javascript:;');
	}
	
	if(nextArticle && nextArticle.id) {
		next.text(nextArticle.title);
		next.attr('href', '/articles/?articleId=' + nextArticle.id);
	} else {
		next.text('没有了');
		next.attr('href', 'javascript:;');
	}
}

/**
 * 加载具体文章详情
 */
function initArticlePage() {
	var search = window.location.search;
	var articleId = search.split('=')[1];
	if(articleId && parseInt(articleId) > 0) {
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
}

/**
 * 渲染文章详情
 * @param article
 */
function renderArticle(article) {
	var articleDiv = $('.con-article');
	articleDiv.empty();
	articleDiv.append(article.content);
	
	if(article.videoUrl) {
		var videoBuffer = [];
		videoBuffer.push('<video id="video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" width="738" height="400"');
		videoBuffer.push('data-setup="{}">');
		videoBuffer.push('<source src="' + article.videoUrl + '" type="video/mp4"/>');
		videoBuffer.push('<track kind="captions" src="" srclang="en" label="English"></track>');
		videoBuffer.push('<track kind="subtitles" src="" srclang="en" label="English"></track>');
		videoBuffer.push('</video>');
		
		var videoObj = $(videoBuffer.join(''));
		
		// 第一个图片
		var img = $('.article-box .article-content p img:eq(0)');
		// 兄弟元素
		var p = $(img).parent().prev();
		// 父元素
		var parent = $(img).parent();
		// 父元素的兄弟元素
		var brother = parent.next();
		
		p.after(videoObj);
		parent.remove();
		brother.remove();
	}
}







