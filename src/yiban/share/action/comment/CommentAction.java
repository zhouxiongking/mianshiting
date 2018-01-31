package yiban.share.action.comment;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import yiban.share.pojo.Comments;
import yiban.share.service.comment.CommentService;
import yiban.share.util.KeyUtil;

import com.opensymphony.xwork2.ActionSupport;

public class CommentAction extends ActionSupport
{
	private CommentService commentService;
	
	private Comments comment;
	//处理结果
	private String result;
	
	private List<Comments> comList;
	
	private Integer comTotal;
	
	private Integer pageNo;
	
	private String picId;
	/*
	 * 保存comment对象
	 */
	public String doSaveComment() throws Exception
	{
		//已登录
		this.result = "success";
		//保存至数据库
		//获取当前时间,添加上传时间
		Date now = Calendar.getInstance().getTime();
		DateFormat dateFormat = DateFormat.getDateTimeInstance();
		String time = dateFormat.format(now);
		this.comment.setComtime(time);
		this.comment.setUserid("1");
		this.comment.setCusername("kingx");
		this.commentService.saveComment(comment);
		//保存进数据库后，重新检索出前十条评论内容以更新页面上的内容
		String hql = "from Comments where picid = ? order by comtime desc";
		this.comTotal = this.commentService.loadByHql(hql, comment.getVideoid()).size();
		this.comList = this.commentService.listAllByPage(hql, 1, 10, comment.getVideoid());
	
		return SUCCESS;
	}
	
	/**
	 * 根据当前页数加载评论
	 * @return
	 * @throws Exception
	 */
	public String loadCommentByPage() throws Exception
	{
		this.comList = this.commentService.listAllByPage("from Comments where picid = ?", pageNo, 10, picId);
		return SUCCESS;
	}
	
	/**
	 * 加载初所有的评论
	 * @return
	 * @throws Exception
	 */
	public String loadAllComments() throws Exception
	{
		this.comTotal = this.commentService.loadByHql("from Comments where picid = ?", picId).size();
		this.comList = this.commentService.listAllByPage("from Comments where picid = ?", 1, 10, picId);
		return SUCCESS;
	}
	
	
	
	
	public void setCommentService(CommentService commentService)
	{
		this.commentService = commentService;
	}

	public Comments getComment()
	{
		return comment;
	}

	public void setComment(Comments comment)
	{
		this.comment = comment;
	}

	public String getResult()
	{
		return result;
	}

	public void setResult(String result)
	{
		this.result = result;
	}

	public List<Comments> getComList()
	{
		return comList;
	}

	public void setComList(List<Comments> comList)
	{
		this.comList = comList;
	}

	public Integer getComTotal()
	{
		return comTotal;
	}

	public void setComTotal(Integer comTotal)
	{
		this.comTotal = comTotal;
	}

	public Integer getPageNo()
	{
		return pageNo;
	}

	public void setPageNo(Integer pageNo)
	{
		this.pageNo = pageNo;
	}

	public String getPicId()
	{
		return picId;
	}

	public void setPicId(String picId)
	{
		this.picId = picId;
	}
	
	
}
