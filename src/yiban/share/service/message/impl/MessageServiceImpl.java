package yiban.share.service.message.impl;

import java.util.List;

import yiban.share.dao.BaseDao;
import yiban.share.pojo.Message;
import yiban.share.service.message.MessageService;

public class MessageServiceImpl implements MessageService {
	private BaseDao baseDao;

	@Override
	public void saveMessage(Message msg) {
		this.baseDao.saveOrUpdate(msg);
	}
	
	@Override
	public List listAllByPage(String hql, int pageNo, int pageSize, Object... parameters) {
		return this.baseDao.listAllByPage(hql, pageNo, pageSize, parameters);
	}
	
	@Override
	public List loadByHql(String hql, Object... paramsters) {
		return this.baseDao.loadByHql(hql, paramsters);
	}
	
	@Override
	public List listBySQL(String sql, Object... parameters) {
		return this.baseDao.listBySQL(sql, parameters);
	}
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	
}
