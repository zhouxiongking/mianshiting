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
	
	private int articleId;
	
	private String content;
	
	/*
	 * 保存comment对象
	 */
	public String doSaveComment() throws Exception
	{
		//保存至数据库
		//获取当前时间,添加上传时间
		Date now = Calendar.getInstance().getTime();
		DateFormat dateFormat = DateFormat.getDateTimeInstance();
		String time = dateFormat.format(now);
		Comments comment = new Comments();
		comment.setArticleId(articleId);
		comment.setContent(content);
		comment.setComtime(time);
		comment.setUserid("1");
		comment.setCusername("coder分享");
		this.commentService.saveComment(comment);
		
		return SUCCESS;
	}
	
	/**
	 * 加载出所有的评论
	 * @return
	 * @throws Exception
	 */
	public String loadAllComments() throws Exception
	{
		this.comList = this.commentService.loadByHql("from Comments where articleId = ? order by comtime asc", articleId);
		if(this.comList != null && this.comList.size() > 0) {
			this.comTotal = this.comList.size();
		} else {
			this.comTotal = 0;
		}
		
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

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
