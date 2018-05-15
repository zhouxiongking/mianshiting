$(function() {
	var search = window.location.search;
	articleId = search.split('=')[1];
	/**
	 * 展示文章详情
	 */
	initArticlePage();
	
	/**
	 * 获取上一篇和下一篇文章
	 */
	getPreNextArticle();
	
	/**
	 * 保存评论
	 */
	saveComment();
	
	/**
	 * 查找出文章的评论
	 */
	searchArticleComment();
});

/**
 * 查找出文章的评论
 */
function searchArticleComment(){
	$('.loading').show();
	$('#ul-message-list').empty();
	$.ajax({
		url: '/comment-json/loadAllComments',
		type: 'get',
		data: {
			articleId: articleId
		},
		dataType: 'json',
		success: function(result){
			$('.loading').hide();
			renderMsgList(result.comList);
			// 留言总数
			$('#totalCount').text(result.comTotal);
		}	
	});
}

/**
 * btn绑定的事件
 */
function saveComment() {
	$('#commit-btn').click(function() {
		var content = $('#content').val();
		if(!content || !content.trim().length){
			tipShow('写下你的评论吧...');
			return;
		}
		sendSaveCommentRequest(articleId, content);
	});
}

/**
 * 保存评论
 * @param articleId
 * @param content
 */
function sendSaveCommentRequest(articleId, content) {
	var btn = $('#commit-btn');
	btn.attr('disabled', true);
	$('.loading').show();
	$.ajax({
		url: '/comment-json/doSaveComment',
		type: 'post',
		dataType: 'json',
		data: {
			'articleId': articleId,
			'content': content
		},
		success: function(result) {
			tipShow('感谢你的评论~');
			$('.loading').hide();
			$('#content').val('');
			searchArticleComment();
			btn.removeAttr('disabled');
		}
	});
}

/**
 * 渲染评论列表
 * @param list
 */
function renderMsgList(list) {
	var ulList = $('#ul-message-list');
	var buffer = [];
	for(var i = 0; i < list.length; i++){
		buffer.push('<li><div class="pic"><img src="/html5_blue/images/anonymity.png" width="50px"/></div>');
		buffer.push('<div class="msg-content"><span>匿名</span>');
		buffer.push('<span>' + list[i].comtime + '</span>');
		buffer.push('<span class="level">第' + (1 + i) + '楼</span>');
		buffer.push('<p class="msg">' + list[i].content + '</p>');
		buffer.push('</div></li>');
	}
	ulList.append(buffer.join(''));
}


/**
 * 信息提示
 * @param content
 */
function tipShow(content) {
	var warning = $('.warning');
	warning.text(content);
	warning.animate({opacity: 1}, 1000);
	setTimeout(function() {
		warning.animate({opacity: 0}, 1000);
	}, 2000);
}

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
	var sub = $('.article-box .article-sub');
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
		sub.after(videoObj);
		// 控制视频高度
		var px = $('#video').css('width');
		var width = px.substring(0, px.length - 2);
		// 控制视频高度
		$('#video').css('height',width / 2 + 'px');
	}
	
	// 添加阅读量和评论数
	var buffer = [];
	// 阅读数
	buffer.push('<span><i class="fa fa-eye"></i>' + article.clicks + '</span>');
	// 评论数
	buffer.push('<span><i class="fa fa-comment-o"></i>');
	buffer.push('<span class="ds-thread-count" data-thread-key="156">' + article.commentCount + '</span></span>');
	sub.append($(buffer.join('')));
	
	// 处理掉原来不符合的元素
	var figureList = $('figure');
	var preList = $('figure table tbody tr td pre');
	for(var i = 0; i < preList.length; i++) {
		var figure = $(figureList[i]);
		var pre = $(preList[i]);
		var prev = $(figureList[i]).prev();
		var html = pre.html();
		var newPre = $('<pre></pre>');
		var newCode = $('<code></code>');
		newCode.html(html);
		newPre.append(newCode);
		figure.remove();
		prev.after(newPre);
		
	}
}







