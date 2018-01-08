package yiban.share.service.heart.impl;

import java.util.List;

import yiban.share.dao.BaseDao;
import yiban.share.pojo.Heart;
import yiban.share.service.heart.HeartService;

public class HeartServiceImpl implements HeartService
{
	private BaseDao baseDao;
	
	/**
	 * 点赞保存至数据库中
	 */
	@Override
	public void saveHeart(Heart heart)
	{
		this.baseDao.saveOrUpdate(heart);
	}

	/**
	 * 根据hql语句加载出指定的heart对象
	 */
	@Override
	public List<Heart> loadByhql(String hql, Object... parameters)
	{
		return this.baseDao.loadByHql(hql, parameters);
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
