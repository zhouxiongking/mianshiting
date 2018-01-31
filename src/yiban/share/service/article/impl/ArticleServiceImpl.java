package yiban.share.service.article.impl;

import java.util.List;

import yiban.share.dao.BaseDao;
import yiban.share.pojo.Article;
import yiban.share.pojo.Reading;
import yiban.share.service.article.ArticleService;

public class ArticleServiceImpl implements ArticleService
{
	private BaseDao baseDao;

	@Override
	public void delByHqls(String hql)
	{
		String[] hqls = hql.split("-");
		
		for(int i = 0; i < hqls.length; i++)
		{
			if(hqls[i].trim().length() > 0)
			{
				this.baseDao.update(hqls[i]);
			}
		}
	}
	
	@Override
	public void delById(Article video, String id)
	{
		this.baseDao.delById(video.getClass(), id);
	}
	
	@Override
	public List listAllByPage(String hql, int pageNo, int pageSize,
			Object... parameters)
	{
		return this.baseDao.listAllByPage(hql, pageNo, pageSize, parameters);
	}
	
	@Override
	public List loadByHql(String hql, Object... paramsters)
	{
		return this.baseDao.loadByHql(hql, paramsters);
	}
	
	@Override
	public Article loadById(String id)
	{
		return (Article) this.baseDao.loadById(Article.class, id);
	}
	
	@Override
	public void saveArticle(Article video)
	{
		this.baseDao.saveOrUpdate(video);
	}
	
	@Override
	public void updateArticle(String hql, Object... parameters)
	{
		this.baseDao.update(hql, parameters);
	}
	
	@Override
	public void saveReading(Reading reading) {
		this.baseDao.saveOrUpdate(reading);
	}
	
	@Override
	public List listPageBySQL(String sql, int pageNo, int pageSize, Object... parameters) {
		// TODO Auto-generated method stub
		return this.baseDao.listPageBySQL(sql, pageNo, pageSize, parameters);
	}
	
	@Override
	public List listBySQL(String sql, Object... parameters) {
		return this.baseDao.listBySQL(sql, parameters);
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
