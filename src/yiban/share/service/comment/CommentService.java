package yiban.share.service.comment;

import java.util.List;

import yiban.share.pojo.Comments;

public interface CommentService
{
	public void saveComment(Comments comment);
	
	public List<Comments> loadByHql(String hql, Object... paramsters);
	
	public List listAllByPage(String hql, int pageNo, int pageSize, final Object... parameters);
}
