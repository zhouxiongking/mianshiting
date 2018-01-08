$(function()
{
	doReuqestAudio();
})

/**
 * 发送请求，找出所有的音频作品
 * @return
 */
function doReuqestAudio()
{
	$.ajax(
	{
		type: "POST",
		url: "/audio-json/doShowAllAudioAction.action",
		success: function(result)
		{
		    addResultToAudioDiv(result.audioList);
		}
	})
}

function addResultToAudioDiv(list)
{
	var dataSource = new kendo.data.DataSource(
	{
		data: list,
		pageSize: 20
	});
	
	//处理作品时长，将秒改为时分秒
	for(var i = 0 ; i < list.length; i++)
	{
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
		list[i].totaltime = hms;
	}
	
	$("#pro-div").kendoGrid(
	{
		dataSource: dataSource,
		columns:
		[
           {field: "field", title: "用户名", width: "160px"},
		   {field: "title", title: "作品主题", width: "260px"},
		   {field: "totaltime", title: "作品时长", width: "100px"},
		   {field: "uploadtime", title: "上传时间", width: "170px"},
		   {field: "stats", title: "审核状态", width: "100px"},
		   {command: {text: "收听", click: showAudioDetail}, width: "90px"},
		   {command: {text: "暂停", click: pauseAudio}, width: "90px"},
		   {command: {text: "通过", click: passAudio}, width: "90px"},
		   {command: {text: "删除", click: deleteAudio}, width: "90px"}
		],
		pageable:
		{
			pageSizes: true,
			buttonCount: 5,
			input: true,
			numeric: true,
			refresh: true
		},
		filterable: true,
		selectable: true
	})
}

/**
 * 收听音频作品
 * @param e
 * @return
 */
function showAudioDetail(e)
{
	var curtitle = $("#current-title").val();
	
	var tr = $(e.target).closest("tr");
	var title = this.dataItem(tr).title;
	$("#current-title").val(title);
	
	var audio = document.getElementById("myAudio");
	if(curtitle == title)
	{
		audio.play();
	}
	else
	{
		audio.src = "/upload/audio/" + title + ".mp3";
		audio.autoplay = "autoplay";
	}
	return false;
}

/**
 * 暂停播放音频
 * @return
 */
function pauseAudio(e)
{
	var curtitle = $("#current-title").val();
	var tr = $(e.target).closest("tr");
	var title = this.dataItem(tr).title;
	if(curtitle == title)
	{
		var audio = document.getElementById("myAudio");
		audio.pause();
	}
	
	return false;
}

/**
 * 审核通过音频
 * @return
 */
function passAudio(e)
{
	if(confirm("确定审核通过吗？"))
	{
		var tr = $(e.target).closest("tr");
		var id = this.dataItem(tr).id;	
		var title = this.dataItem(tr).title;
		window.open("/audio/passAudioAction.action?audioId=" + id + "&title=" + title, "_self");
	}
	return false;
}




/**
 * 删除指定的音频作品
 * @param e
 * @return
 */
function deleteAudio(e)
{
	if(confirm("你确定删除吗？"))
	{
		var tr = $(e.target).closest("tr");
		var id = this.dataItem(tr).id;	
		var title = this.dataItem(tr).title;
		window.open("/audio/deleteAudioAction.action?audioId=" + id + "&title=" + title, "_self");
	}
	return false;
}



