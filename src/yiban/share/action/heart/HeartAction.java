package yiban.share.action.heart;

import java.util.List;

import org.apache.struts2.ServletActionContext;

import yiban.share.pojo.Heart;
import yiban.share.service.heart.HeartService;
import yiban.share.util.KeyUtil;

import com.opensymphony.xwork2.ActionSupport;

public class HeartAction extends ActionSupport
{
	private HeartService heartService;

	private Heart heart;
	//处理结果
	private String result;
	/**
	 * 保存点赞信息至数据库
	 * @return
	 * @throws Exception
	 */
	public String doSaveHeart() throws Exception
	{
		//判断是否已经点赞，已经点赞后不能继续点赞
		List<Heart> list = this.heartService.loadByhql("from Heart where userid = ? and picid = ?", "1", heart.getPicid());
		if(list.size()== 0)
		{
			//为点赞
			this.result = "success";
			this.heart.setId(KeyUtil.getNewKey());
			this.heart.setUserid("1");
			this.heartService.saveHeart(heart);
		}
		else
		{
			this.result = "already";
		}
		
		return SUCCESS;
	}
	
	public void setHeartService(HeartService heartService)
	{
		this.heartService = heartService;
	}

	public Heart getHeart()
	{
		return heart;
	}

	public void setHeart(Heart heart)
	{
		this.heart = heart;
	}

	public String getResult()
	{
		return result;
	}

	public void setResult(String result)
	{
		this.result = result;
	}
	
	
}
