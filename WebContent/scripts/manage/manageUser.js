$(function()
{
	requestAllUser();
})

/**
 * 发送请求，检索出所有用户
 * @return
 */
function requestAllUser()
{
	$.ajax(
	{
		type: "POST",
		url: "/manageuser-json/doSearchAllUserAction.action",
		success: function(result)
		{
		    addResultToDiv(result.userList);
		}
	})
}

/**
 * 根据传递的list利用kendoui显示
 * @param list
 * @return
 */
function addResultToDiv(list)
{
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
		   {field: "username", title: "用户名", width: "150px"},
		   {field: "realname", title: "真实姓名", width: "120px"},
		   {field: "academy", title: "学院", width: "200px"},
		   {field: "major", title: "专业", width: "170px"},
		   {field: "grade", title: "年级", width: "120px"},
		   {command: {text: "详细信息", click: showDetail}, width: "100px"}
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
 * 展示用户的详细信息
 * @param e
 * @return
 */
function showDetail(e)
{
	var tr = $(e.target).closest("tr");
	var id = this.dataItem(tr).id;
	
	window.location.href = "/manageuser/doDetailInfoAction.action?userId=" + id;
}

function doRequest(id)
{
	$.ajax(
	{
		type: "POST",
		url: "/manageuser-json/doDetailInfoAction.action",
		data:
		{
			userId: id
		},
		success: function(result)
		{
		    //将结果显示在页面上
			$("#spe-userId").text(result.user.id);
		}
	})
}




















