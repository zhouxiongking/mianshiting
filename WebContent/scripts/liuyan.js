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
	$.ajax({
		url: '/message-json/loadMsgByPage',
		type: 'post',
		data: {
			pageNo: pageNo,
			type: type
		},
		dataType: 'json',
		success: function(result){
			if(type == 'init') {
				buildPagination(result.totalPages);
			}
		}	
	});
}

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
	        console.log(api.getCurrent())
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









