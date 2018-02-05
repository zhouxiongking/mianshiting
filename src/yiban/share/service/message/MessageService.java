package yiban.share.service.message;

import java.util.List;

import yiban.share.pojo.Message;

public interface MessageService {
	public void saveMessage(Message msg);
	
	public List listAllByPage(String hql, int pageNo, int pageSize, final Object... parameters);
	
	public List loadByHql(String hql, Object... paramsters);
	
	public List listBySQL(String sql, final Object... parameters);
}
