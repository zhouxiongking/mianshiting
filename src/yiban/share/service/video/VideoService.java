package yiban.share.service.video;

import java.util.List;

import yiban.share.pojo.Video;

public interface VideoService
{
	public void saveVideo(Video video);
	
	public List loadByHql(String hql, Object... paramsters);
	
	public Video loadById(String id);
	
	public void updateVideo(String hql, Object... paramsters);
	
	public void delById(Video video, String id);
	
	public List listAllByPage(String hql, int pageNo, int pageSize, final Object... parameters);
	
	public void delByHqls(String hql);
}
