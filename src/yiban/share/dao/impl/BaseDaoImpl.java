package yiban.share.dao.impl;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import yiban.share.dao.BaseDao;

public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao
{
	/**
	 * 保存对象
	 */
	public void saveOrUpdate(Object obj)
	{
		getHibernateTemplate().saveOrUpdate(obj);
	}
	
	/**
	 * 根据hql语句加载对象
	 */
	public List loadByHql(String hql, final Object... parameters)
	{
		final String hql1 = hql;
		List list = getHibernateTemplate().executeFind(new HibernateCallback()
		{
			public Object doInHibernate(Session arg0) throws HibernateException,
					SQLException
			{
				Query query = arg0.createQuery(hql1);
				//注入?的值
				if(parameters != null && parameters.length > 0)
				{
					for(int i = 0; i < parameters.length; i++)
					{
						query.setParameter(i, parameters[i]);
					}
				}
				
				return query.list();
			}
		});
		return list;
	}
	
	/**
	 * 根据id加载指定的对象
	 */
	@Override
	public Object loadById(Class clazz, Serializable id)
	{
		return getHibernateTemplate().load(clazz, id);
	}
	
	/**
	 *  根据hql语句更新数据库
	 */
	public void update(String hql, final Object... parameters)
	{
		final String hql1 = hql;
		getHibernateTemplate().execute(new HibernateCallback()
		{
			public Object doInHibernate(Session arg0) throws HibernateException,SQLException
			{
				Query query = arg0.createQuery(hql1);
				//注入?的值
				if(parameters != null && parameters.length > 0)
				{
					for(int i = 0; i < parameters.length; i++)
					{
						query.setParameter(i, parameters[i]);
					}
				}
				return query.executeUpdate();
			}
		});
	}
	
	/**
	 * 根据id删除指定对象
	 */
	public void delById(Class clazz, Serializable id)
	{
		getHibernateTemplate().delete(getHibernateTemplate().load(clazz, id));
	}
	
	/**根据条件，分页装载满足条件的所有持久化对象*/
	@Override
	public List listAllByPage(String hql, int pageNo, int pageSize, final Object... parameters)
	{
		final int pNo = pageNo;
		final int pSize = pageSize;
		final String hql1 = hql;
		List list = getHibernateTemplate().executeFind(new HibernateCallback()
		{
			@Override
			public Object doInHibernate(Session arg0)
					throws HibernateException, SQLException
			{
				Query query = arg0.createQuery(hql1);
				if(parameters != null && parameters.length > 0)
				{
					for(int i = 0; i < parameters.length; i++)
					{
						query.setParameter(i, parameters[i]);
					}
				}
				query.setMaxResults(pSize);
				query.setFirstResult((pNo - 1) * pSize);
				List result = query.list();
				if(!Hibernate.isInitialized(result))
				{
					Hibernate.initialize(result);
				}
				return result;
			}
		});
		return list;
	}
}
