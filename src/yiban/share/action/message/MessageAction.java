package yiban.share.action.message;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

import yiban.share.pojo.Message;
import yiban.share.service.message.MessageService;

public class MessageAction extends ActionSupport{
	private MessageService messageService;

	private Message message;
	
	private List<Message> msgList;
	
	private int pageNo;
	
	private String content;
	
	private String type;
	
	private int totalCount;
	
	// 保存留言
	public String saveMessage() throws Exception {
		// 时间
		Date date = new Date();          
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		String time = df.format(date);  
		
		this.message = new Message();
		message.setLeaveTime(time);
		message.setContent(content);
		this.messageService.saveMessage(message);
		
		return SUCCESS;
	}
	
	// 分页加载留言板信息
	public String loadMsgByPage() throws Exception {
		String hql = "from Message order by leaveTime desc";
		String counthql = "select count(*) from message";
		this.msgList = this.messageService.listAllByPage(hql, this.pageNo, 20);
		if("init".equals(this.type)) {
			Number count = (Number) this.messageService.listBySQL(counthql).get(0);
			this.totalCount = count.intValue();
		}
		return SUCCESS;
	}
	
	public void setMessageService(MessageService messageService) {
		this.messageService = messageService;
	}

	public Message getMessage() {
		return message;
	}

	public void setMessage(Message message) {
		this.message = message;
	}

	public List<Message> getMsgList() {
		return msgList;
	}

	public void setMsgList(List<Message> msgList) {
		this.msgList = msgList;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	
}
