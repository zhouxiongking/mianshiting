$(function() {
	
	// 提交留言
	submitMessage();
	
	// 输入内容
	inputKeyupEvent();
	
	// 加载出留言列表
	loadMsgList(1, 'init');
});

/**
 * 加载出留言列表
 */
function loadMsgList(pageNo, type) {
	$('.loading').show();
	 $('#ul-message-list').empty();
	$.ajax({
		url: '/message-json/loadMsgByPage',
		type: 'post',
		data: {
			pageNo: pageNo,
			type: type
		},
		dataType: 'json',
		success: function(result){
			$('.loading').hide();
			renderMsgList(result.msgList, pageNo);
			// 留言总数
			if(type == 'init'){
				$('#totalCount').text(result.totalCount);
			}
			var totalPages;
			if(result.totalCount) {
				totalPages = result.totalCount % 20 ? parseInt(result.totalCount / 20) + 1: parseInt(result.totalCount / 20);
			} else {
				totalPages = 1;
			}
			if(type == 'init') {
				buildPagination(totalPages);
			}
		}	
	});
}

/**
 * 渲染评论列表
 * @param list
 */
function renderMsgList(list, pageNo) {
	var ulList = $('#ul-message-list');
	var buffer = [];
	var level = (pageNo - 1) * 20 + 1;
	for(var i = 0; i < list.length; i++){
		buffer.push('<li><div class="pic"><img src="/html5_blue/images/anonymity.png" width="50px"/></div>');
		buffer.push('<div class="msg-content"><span>匿名</span>');
		buffer.push('<span>' + list[i].leaveTime + '</span>');
		buffer.push('<span class="level">第' + (level + i) + '楼</span>');
		buffer.push('<p class="msg">' + list[i].content + '</p>');
		buffer.push('</div></li>');
	}
	ulList.append(buffer.join(''));
}

/**
 * 构建分页
 * @param pageCount
 */
function buildPagination(pageCount) {
	$('.pager').pagination({
	    pageCount: pageCount,
	    coping: true,
	    mode: 'fixed',
	    homePage: '首页',
	    endPage: '末页',
	    prevContent: '上页',
	    nextContent: '下页',
	    callback: function (api) {
	        var currentPageNo = api.getCurrent();
	        loadMsgList(currentPageNo, 'page');
	    }
	});
}

/**
 * 输入内容
 */
function inputKeyupEvent() {
	$('#content').keyup(function() {
		var content = $('#content').val();
		var count = $('#count');
		count.text(content.length);
		if(content.length > 100) {
			count.css('color', 'red');
		} else {
			count.css('color', '#666');
		}
	});
}

/**
 * 提交留言
 */
function submitMessage() {
	$('#btn').click(function() {
		var content = $('#content').val();
		var warning = $('.warning');
		if(!content || !content.trim().length) {
			return false;
		}
		if(content.trim().length > 100){
			tipShow('请输入100字以内的内容');
			return false;
		} 
		// 发送请求
		sendAddRequest(content);
	});
}

/**
 * 新增留言请求
 */
function sendAddRequest(content) {
	var btn = $('#btn');
	btn.attr('disabled', true);
	$.ajax({
		url: '/message-json/saveMessage',
		type: 'post',
		data: {
			content: content
		},
		dataType: 'json',
		success: function(){
			tipShow('感谢你的留言~');
			$('#content').val('');
			$("#count").text(0);
			setTimeout(function(){
				loadMsgList(1, 'init');
			}, 500);
			btn.removeAttr('disabled');
		}
	});
}

function tipShow(content) {
	var warning = $('.warning');
	warning.text(content);
	warning.animate({opacity: 1}, 1000);
	setTimeout(function() {
		warning.animate({opacity: 0}, 1000);
	}, 2000);
}









