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
	$('#SOHUCS').attr('sid', 'article-' + articleId);
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
	$('.con-article').empty();
	articleDiv.empty();
	articleDiv.append(article.content);
	// 如果文章有对应的视频，则添加上视频
	if(article.videoUrl) {
		var videoBuffer = [];
		videoBuffer.push('<video id="video" class="video-js vjs-default-skin vjs-big-play-centered for-video" controls preload="none"');
		videoBuffer.push('data-setup="{}">');
		videoBuffer.push('<source src="' + article.videoUrl + '" type="video/mp4"/>');
		videoBuffer.push('<track kind="captions" src="" srclang="en" label="English"></track>');
		videoBuffer.push('<track kind="subtitles" src="" srclang="en" label="English"></track>');
		videoBuffer.push('</video>');
		
		var videoObj = $(videoBuffer.join(''));
		// 正文内容上部分
		var sub = $('.article-box .article-sub');
		sub.after(videoObj);
		// 控制视频高度
		var px = $('#video').css('width');
		var width = px.substring(0, px.length - 2);
		// 控制视频高度
		$('#video').css('height',width / 2 + 'px');
	}
	// 如果文章中有其他的文章链接，则删掉这个链接
	var linkA = $('.article-content a');
	console.log(linkA);
	if(linkA && linkA.length >= 0) {
		var linkObj = $(linkA[0]);
		linkObj.attr("href", 'javascript:;');
	}
}







