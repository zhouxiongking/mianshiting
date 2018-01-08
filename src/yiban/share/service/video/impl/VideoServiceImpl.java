package yiban.share.service.video.impl;

import java.util.List;

import yiban.share.dao.BaseDao;
import yiban.share.pojo.Video;
import yiban.share.service.video.VideoService;

public class VideoServiceImpl implements VideoService
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
	public void delById(Video video, String id)
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
	public Video loadById(String id)
	{
		return (Video) this.baseDao.loadById(Video.class, id);
	}
	
	@Override
	public void saveVideo(Video video)
	{
		this.baseDao.saveOrUpdate(video);
	}
	
	@Override
	public void updateVideo(String hql, Object... parameters)
	{
		this.baseDao.update(hql, parameters);
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
