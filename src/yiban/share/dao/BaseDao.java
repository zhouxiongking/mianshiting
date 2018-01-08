package yiban.share.dao;

import java.io.Serializable;
import java.util.List;

public interface BaseDao
{
	public void saveOrUpdate(Object obj);
	
	public List loadByHql(String hql, final Object... parameters);
	
	public void update(String hql, final Object... parameters);
	
	public void delById(Class clazz, Serializable id);
	
	public Object loadById(Class clazz, Serializable id);
	
	public List listAllByPage(String hql, int pageNo, int pageSize, final Object... parameters);
	
}
