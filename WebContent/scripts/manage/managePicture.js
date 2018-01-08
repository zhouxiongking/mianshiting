$(function()
{
	doReuqestPicture();
})

/**
 * 发送请求，找出所有的图片作品
 * @return
 */
function doReuqestPicture()
{
	$.ajax(
	{
		type: "POST",
		url: "/managepicture-json/doSearchAllPictureAction.action",
		success: function(result)
		{
		    addResultToPicDiv(result.pictureList);
		}
	})
}

function addResultToPicDiv(list)
{
	var cat = [["news", "新闻热点"], ["school", "美丽校园"], ["sport", "校园活动"], ["model", "榜样力量"], 
	           ["years", "激情岁月"], ["culture", "传统文化"]];
	for(var i = 0; i < list.length; i++)
	{
		list[i].total = list[i].total + "";
		//改变类别在页面上的显示方式
		for(var j = 0; j < cat.length; j++)
		{
			if(list[i].category == cat[j][0])
			{
				list[i].category = cat[j][1];	
				break;
			}
		}
	}
	
	var dataSource = new kendo.data.DataSource(
	{
		data: list,
		pageSize: 20
	});

	$("#pro-div").kendoGrid(
	{
		dataSource: dataSource,
		columns:
		[
		   {field: "username", title: "用户名", width: "100px"},
		   {field: "category", title: "作品类型", width: "100px"},
		   {field: "theme", title: "主题"},
		   {field: "total", title: "图片数量(张)", width: "140px"},
		   {field: "uploadtime", title: "上传时间", width: "170px"},
		   {field: "status", title: "状态", width: "90px"},
		   {command: {text: "详细信息", click: showPicDetail}, width: "110px"},
		   {command: {text: "删除", click: deletePic}, width: "90px"}
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
 * 展示图片作品
 * @param e
 * @return
 */
function showPicDetail(e)
{
	var tr = $(e.target).closest("tr");
	var id = this.dataItem(tr).id;	
	var status = this.dataItem(tr).status;
	
	window.location.href = "/picture/showPictureAction.action?picId=" + id + "&status=" + status;
}

/**
 * 删除指定的图片作品
 * @param e
 * @return
 */
function deletePic(e)
{
	if(confirm("你确定删除吗？"))
	{
		var tr = $(e.target).closest("tr");
		var id = this.dataItem(tr).id;	
		$.ajax(
		{
			type: "POST",
			url: "/managepicture-json/doDeletePictureAction.action",
			data:
			{
				"picId": id
			},
			success: function(result)
			{
				alert("删除成功！");
			    doReuqestPicture();
			}
		})
	}
}



