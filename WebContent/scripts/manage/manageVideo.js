$(function()
{
	doReuqestVideo();
})

/**
 * 发送请求，找出所有的视频作品
 * @return
 */
function doReuqestVideo()
{
	$.ajax(
	{
		type: "POST",
		url: "/managevideo-json/doSearchAllVideoAction.action",
		success: function(result)
		{
		    addResultToVideoDiv(result.videoList);
		}
	})
}

function addResultToVideoDiv(list)
{
	var dataSource = new kendo.data.DataSource(
	{
		data: list,
		pageSize: 20
	});

	/**
	 * {command: {text: "详细信息", click: showVideoDetail}, width: "110px"},
	 */
	$("#pro-div").kendoGrid(
	{
		dataSource: dataSource,
		columns:
		[
		   {field: "username", title: "用户名", width: "140px"},
		   {field: "label", title: "类别", width: "140px"},
		   {field: "title", title: "作品主题", width: "260px"},
		   {field: "uploadtime", title: "上传时间", width: "170px"},
		   {field: "status", title: "状态", width: "90px"},
		   {field: "clicks", title: "点击量", width: "90px"},
		   {command: {text: "查看", click: showVideoDetail}, width: "90px"},
		   {command: {text: "删除", click: deleteVideo}, width: "90px"}
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
 * 展示视频作品
 * @param e
 * @return
 */
function showVideoDetail(e)
{
	var tr = $(e.target).closest("tr");
	var id = this.dataItem(tr).id;	
	var status = this.dataItem(tr).status;
	window.open("/video/showVideoAction.action?videoId=" + id + "&status=" + status, "_self");
	return false;
}

/**
 * 删除指定的图片作品
 * @param e
 * @return
 */
function deleteVideo(e)
{
	if(confirm("你确定删除吗？"))
	{
		var tr = $(e.target).closest("tr");
		var id = this.dataItem(tr).id;	
		window.open("/video/deleteVideoAction.action?videoId=" + id, "_self");
	}
	return false;
}



