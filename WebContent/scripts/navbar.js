$(function() {
	// 通过js处理导航
	initNav();
});

/**
 * 通过js处理导航，复用
 */
function initNav() {
	var search = window.location.search;
	var pathname = window.location.pathname;
	var category = search.split('=')[1];
	var basicArr = ['basic', 'Javascript', 'CSS3', 'HTML5'];
	var advanceArr = ['advance', 'ES6'];
	var frameworkArr = ['framework', 'Vue', 'AngularJS', 'React'];
	var toolArr = ['tool', 'Git', 'Webpack', 'Gulp'];
	var dbArr = ['db', 'Mysql'];
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
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=AngularJS">AngularJS</a></li>');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=React">React全家桶</a></li>');
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
	if("NodeJS".indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=NodeJS">NodeJS</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=NodeJS">NodeJS</a>');
	}
	buffer.push('</li>');
	if(dbArr.join().indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=db">数据库</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=db">数据库</a>');
	}
	buffer.push('<ul class="sub-menu">');
	buffer.push('<li class="sub-menu-item"><a href="/html/?category=Mysql">Mysql</a></li>');
	buffer.push('</ul></li>');
	if("synthesize".indexOf(category) >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/html/?category=synthesize">综合</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/html/?category=synthesize">综合</a>');
	}
	buffer.push('</li>');
	if(pathname.indexOf('liuyan') >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/liuyan/">给我留言</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/liuyan/">给我留言</a>');
	}
	buffer.push('<ul class="sub-menu"></ul></li>');
	if(pathname.indexOf('fm') >= 0) {
		buffer.push('<li class="menu-item current_page_item"><a href="/fm/">关于站主</a>');
	} else {
		buffer.push('<li class="menu-item "><a href="/fm/">关于站主</a>');
	}
	buffer.push('<ul class="sub-menu"></ul></li>');
	buffer.push('</ul>');
	
	nav.append($(buffer.join('')));
}