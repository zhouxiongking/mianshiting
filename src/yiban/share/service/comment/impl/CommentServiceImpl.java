package yiban.share.service.comment.impl;

import java.util.List;

import yiban.share.dao.BaseDao;
import yiban.share.pojo.Comments;
import yiban.share.service.comment.CommentService;

public class CommentServiceImpl implements CommentService
{
	private BaseDao baseDao;

	@Override
	public List<Comments> loadByHql(String hql, Object... parameters)
	{
		return this.baseDao.loadByHql(hql, parameters);
	}
	
	@Override
	public List listAllByPage(String hql, int pageNo, int pageSize,
			Object... parameters)
	{
		return this.baseDao.listAllByPage(hql, pageNo, pageSize, parameters);
	}
	
	@Override
	public void saveComment(Comments comment)
	{
		this.baseDao.saveOrUpdate(comment);
	}
	
	public BaseDao getBaseDao()
	{
		return baseDao;
	}

	public void setBaseDao(BaseDao baseDao)
	{
		this.baseDao = baseDao;
	}
	
	
}
