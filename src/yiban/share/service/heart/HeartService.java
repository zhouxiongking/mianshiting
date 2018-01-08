package yiban.share.service.heart;

import java.util.List;

import yiban.share.pojo.Heart;

public interface HeartService
{
	public void saveHeart(Heart heart);
	
	public List<Heart> loadByhql(String hql, Object... parameters);
}
