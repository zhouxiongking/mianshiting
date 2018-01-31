package yiban.share.service.article;

import java.util.List;

import yiban.share.pojo.Article;
import yiban.share.pojo.Reading;

public interface ArticleService
{
	public void saveArticle(Article video);
	
	public List loadByHql(String hql, Object... paramsters);
	
	public Article loadById(String id);
	
	public void updateArticle(String hql, Object... paramsters);
	
	public void delById(Article video, String id);
	
	public List listAllByPage(String hql, int pageNo, int pageSize, final Object... parameters);
	
	public void delByHqls(String hql);
	
	public void saveReading(Reading reading);
	
	public List listPageBySQL(String hql, int pageNo, int pageSize, final Object... parameters);
	
	public List listBySQL(String sql, final Object... parameters);
}
