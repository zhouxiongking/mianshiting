$(function()
{
	//初始化页面，加载初所有的音频节目
	doInitAllAudio();
	
	//audio播放器对象
	var audio = document.getElementById("myAudio");
	//将单曲循环设为false
	audio.loop = false;
	
	//切换播放模式
	changeMod();
	
	//当前节目播放结束后，自动播放下一个节目
	audio.addEventListener("ended", function()
	{
		//自动播放下一首 
		doPreOrNext("next");
	}, false);
	
	//按空格键实现播放、暂停
	$(document).keyup(function(e)
	{
		var key = e.which;
		if(key == 32)
		{
			playOrPause();
		}
	})
	
	//点击按钮，实现播放、暂停
	$(".play").click(function()
	{
		playOrPause();
	})
	
	
	//上一首
	$(".prev a").click(function()
	{
		doPreOrNext("prev");
	})
	
	//下一首
	$(".next a").click(function()
	{
		doPreOrNext("next");
	})
	
	//静音
	var curVolume;
	var lastVolume = 1;
	$(".mute").click(function()
	{
		if($(this).attr("class").indexOf("muted") > 0)
		{
			curVolume = lastVolume;
			$(this).removeClass("muted");
		}
		else
		{
			$(this).addClass("muted");
			curVolume = 0;
		}
		//改变播放器声音与进度条显示
		changeVolume(curVolume);
	})
	
	//改变音量
	$(".vol-slider-wrapper").click(function(e)
	{
		if(!e)
		{
			e = window.event;
		}
		var percent = e.offsetX / $(this).width();
		lastVolume = percent;
		changeVolume(percent);
	})
	
	//根据传入的参数，改变播放器的声音与进度条显示
	function changeVolume(curVolume)
	{
		audio.volume = curVolume;
		//改变声音进度条
		$(".ui-slider-range-volume").css("width", curVolume * 100 + "%");
		$(".ui-volume").css("left", curVolume * 100 +  "%");
	}
	
})

//总共时间
function getTotalTime()
{
	var audio = document.getElementById("myAudio");
	$(".totalTime").text("00:00"); 
	var total = parseInt(audio.duration);
	var minute = parseInt(total / 60);
	var second = total % 60;
	var time = (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
	$(".totalTime").text(time); 
}

//播放时，时间和进度栏的变化
function doPlay()
{
	/*------时间的变化------*/
	var audio = document.getElementById("myAudio");
	var curTime = parseInt(audio.currentTime);
	var minute = parseInt(curTime / 60);
	var second = curTime % 60;
	var ttime = (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
	$(".curTime").text(ttime); 
	/*------进度栏的变化-----*/
	var totalTime = parseInt(audio.duration);
	var percent = curTime / totalTime;
	$(".ui-slider-range-schedule").css("width", percent * 100 + "%");
	$(".ui-schedule").css("left", percent * 100 + "%");
	
	//总时间
	getTotalTime();
}

//播放下一首
function doPreOrNext(type)
{
	//先判断播放模式，分随机播放，单曲循环，列表循环
	var speIndex;
	var curIndex = parseInt($("#curIndex").val());
	var text = $(".mb-layout-ft .panel .panel-inner .main-panel .title-wrapper .title-inner .title .split").text();
	if(text)
	{
		$(".right-panel .playmod li a").each(function(index)
		{
			if($(this).attr("class").indexOf("currentMod") > 0)
			{
				var total = $(".musicRank .rank .tab .tab_box ul li").size() - 1;
				if(index == 0)
				{
					//随机播放
					speIndex = Math.floor(Math.random() * total);
				}
				else if(index == 1)
				{
					//单曲循环
					speIndex = parseInt($("#curIndex").val());
				}
				else
				{
					//列表循环
					if(type == "next")
					{
						speIndex = curIndex == total ? 0 : curIndex + 1;
					}
					else
					{
						speIndex = curIndex == 0 ? total : curIndex - 1;
					}
				}
			}
		});
		//改变列表中的节目后面button的样式
		$(".musicRank .rank .tab .tab_box ul li:eq(" + curIndex + ") a").removeClass("bg-pause").addClass("bg-play");
		$(".musicRank .rank .tab .tab_box ul li:eq(" + speIndex + ") a").removeClass("bg-play").addClass("bg-pause");
		//改变歌曲
		changeMusic(speIndex);
	}
}

//切换歌曲，多出公用的方法
function changeMusic(index)
{
	var audio = document.getElementById("myAudio");
	var curIndex = parseInt($("#curIndex").val());
	//首先改变播放行的样式
	$(".musicRank .rank .tab .tab_box ul li:eq(" + curIndex + ")").removeClass("cur-item");
	
	var speLi = $(".musicRank .rank .tab .tab_box ul li:eq(" + index + ")");
	var spePlayer = $(".mb-layout-ft .panel .panel-inner .main-panel .title-wrapper .title-inner .title");
	//显示不同的歌曲名和歌手名称
	speLi.addClass("cur-item");
	var songname = $(".m_name", speLi).text();
	var artist = $(".s_name", speLi).text().trim();
	$(".songname", spePlayer).text(songname);
	$(".split", spePlayer).text("-");
	//$(".artist", spePlayer).text(artist);
	//改变当前歌曲的索引数
	$("#curIndex").val(index);
	//切换歌曲
	audio.src = "/upload/audio/" + songname + ".mp3";
	audio.autoplay = "autoplay";
	//将播放按钮显示为播放状态
	$(".play a").removeClass("stop-a").addClass("play-a");
	interval = setInterval(doPlay, 1000);
}

/*--------切换播放模式-------*/
function changeMod()
{
	var lastObj = $(".right-panel ul .list-mod a");
	$(".right-panel .playmod li a").each(function()
	{
		$(this).click(function()
		{
			lastObj.removeClass("currentMod");
			$(this).removeClass("hoverMod");
			$(this).addClass("currentMod");
			lastObj = $(this);
		}).hover(function()
		{
			if($(this).attr("class").indexOf("currentMod") < 0)
			{
				$(this).addClass("hoverMod");
			}
		}, function()
		{
			if($(this).attr("class").indexOf("currentMod") < 0)
			{
				$(this).removeClass("hoverMod");
			}
		})
	})
}

/**
 * 初始化页面，加载初所有的音频节目
 * @return
 */
function doInitAllAudio()
{
	$.ajax(
	{
		url: "/audio-json/doShowAllPassAudioAction.action",
		type: "POST",
		success: function(result)
		{
			//显示节目列表
			showAllAudio(result.audioList);
			//添加事件
			addEventToPlay();
		}
	})
}

function showAllAudio(list)
{
	if(list.length > 0)
	{
		var ul = $(".musicRank .rank .tab .tab_box .tab_div .programs");
		var content = [];
		for(var i = 0 ; i < list.length; i++)
		{
			//处理下时长，将秒改为时分秒显示
			var seconds = parseInt(list[i].totaltime);
			var hms = "";
			var hour = Math.floor(seconds / 3600);
			var minute = Math.floor((seconds - hour * 3600) / 60);
			var second = seconds - hour * 3600 - minute * 60;
			if(hour > 0)
			{
				hms += hour + ":";
			}
			if(minute > 0)
			{
				hms += minute <= 9 ? "0" + minute : minute;
			}
			else
			{
				hms += "00"
			}
			hms += ":";
			
			if(second > 0)
			{
				hms += second <= 9 ? "0" + second : second;
			}
			var uploadtime = list[i].uploadtime.split(" ")[0];
			content.push("<li class='line'>");
			content.push("<p class='num'>" + (i + 1) + "</p>");
			content.push("<p class='music'>");
			content.push("<span class='m_name'>" + list[i].title + "</span>");
			content.push("<span class='s_name'>" + hms + "</span>");
			content.push("<span class='t_name'>" + uploadtime + "</span>");
			content.push("<a href='javascript:;' title='收听' class='bg bg-play' style='margin-left: 30px;'></a></p></li>");
		}
		ul.append(content.join(""));
	}
}

/**
 * 给后面的播放button添加事件，点击节目列表后的播放键，播放或者暂停节目
 * @return
 */
function addEventToPlay()
{
	$(".musicRank .rank .tab .tab_box ul li a").each(function(index)
	{
		$(this).click(function()
		{
			/**
			 * 判断播放的节目是否是当前点击的列表，如果是当前则表示暂停；如果不是则表示切换播放节目
			 */
			var curIndex = parseInt($("#curIndex").val());
			if(curIndex == index)
			{
				//表示点击的是相同的节目，在暂停和播放中切换
				if($(this).hasClass("bg-pause"))
				{
					$(".play a").removeClass("stop-a").addClass("play-a");
					$(".musicRank .rank .tab .tab_box ul li:eq(" + index + ") a").removeClass("bg-pause").addClass("bg-play");
				}
				else
				{
					$(".play a").removeClass("play-a").addClass("stop-a");
					$(".musicRank .rank .tab .tab_box ul li:eq(" + index + ") a").removeClass("bg-play").addClass("bg-pause");
				}
				playOrPause();
			}
			else
			{
				//点击的是不同的节目，直接播放其他的节目，关闭当前节目
				$(".musicRank .rank .tab .tab_box ul li:eq(" + curIndex + ") a").removeClass("bg-pause").addClass("bg-play");
				$(".musicRank .rank .tab .tab_box ul li:eq(" + index + ") a").removeClass("bg-play").addClass("bg-pause");
				//播放歌曲
				changeMusic(index);
			}
		})
	});
}

//播放和暂停歌曲
function playOrPause()
{
	//播放和暂停时，必须有节目播放，如果没有选择节目，则播放和暂停无效
	var text = $(".mb-layout-ft .panel .panel-inner .main-panel .title-wrapper .title-inner .title .split").text();
	var audio = document.getElementById("myAudio");
	if(text)
	{
		getTotalTime();
		var i = parseInt($("#curIndex").val());
		var play_a = $(".play a");
		if(play_a.attr("class") == "play-a")
		{
			//改变按钮的样式
			play_a.removeClass("play-a").addClass("stop-a");
			$(".play").attr("title", "播放[空格键]");
			//改变列表后面button样式
			$(".musicRank .rank .tab .tab_box ul li:eq(" + i + ") a").removeClass("bg-pause").addClass("bg-play");
			//暂停
			audio.pause();
			clearInterval(interval);
		}
		else
		{
			//改变按钮的样式
			play_a.removeClass("stop-a").addClass("play-a");
			$(".play").attr("title", "暂停[空格键]");
			//改变列表后面button样式
			$(".musicRank .rank .tab .tab_box ul li:eq(" + i + ") a").removeClass("bg-play").addClass("bg-pause");
			//播放
			audio.play();
			//定时器自动获取当前播放时间
			interval = setInterval(doPlay, 1000);
		}
	}
}




