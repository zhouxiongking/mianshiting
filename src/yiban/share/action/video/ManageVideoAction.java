package yiban.share.action.video;

import java.util.List;

import yiban.share.pojo.Video;
import yiban.share.service.video.VideoService;
import yiban.share.util.DealFile;

import com.opensymphony.xwork2.ActionSupport;

public class ManageVideoAction extends ActionSupport
{
	private VideoService videoService;

	private List videoList;
	
	private Video video;
	
	private String videoId;
	
	private String opinion;
	/**
	 * 跳转至视频管理页面
	 * @return
	 * @throws Exception
	 */
	public String doSwitchVideo() throws Exception
	{
		return SUCCESS;
	}
	
	/**
	 * 找出所有的视频作品
	 * @return
	 * @throws Exception
	 */
	public String doSearchAllVideo() throws Exception
	{
		this.videoList = this.videoService.loadByHql("from Video order by statscode, uploadtime desc");
		return SUCCESS;
	}
	
	/**
	 * 跳转至播放视频的页面
	 * @return
	 * @throws Exception
	 */
	public String doShowVideo() throws Exception
	{
		//this.video = this.videoService.loadById(videoId);
		this.video = (Video) this.videoService.loadByHql("from Video where id = ?", videoId).get(0);
		
		return SUCCESS;
	}
	
	/**
	 * 根据传递过来的id，删除指定的视频以及缩略图
	 * @return
	 * @throws Exception
	 */
	public String doDeleteVideo() throws Exception
	{
		this.video = (Video) this.videoService.loadByHql("from Video where id = ?", videoId).get(0);
		//删除数据库的内容
		String delVideo = "delete from Video where id = '" + videoId + "'";
		String delComment = "delete from Comments where picId = '" + videoId + "'";
		String delHql = delVideo + " - " + delComment;
		this.videoService.delByHqls(delHql);
		//删除硬盘上的文件
		String[] urls = new String[2];
		urls[0] = video.getPicUrl();
		urls[1] = video.getUrl();
		DealFile.delFile(urls);
		return SUCCESS;
	}
	
	/**
	 * 在管理视频>查看信息页面内点击审核通过或拒绝后更新video信息
	 * @return
	 * @throws Exception
	 */
	public String doUpdateVideo() throws Exception
	{
		String updateSql = "update Video set status = ?, statscode = ? where id = ?";;
		//审核通过
		if(opinion == null || opinion.trim().length() == 0)
		{
			this.videoService.updateVideo(updateSql, "通过", "2", videoId);
		}
		else
		{
			this.videoService.updateVideo(updateSql, "拒绝", "3", videoId);
		}
		
		return SUCCESS;
	}
	
	public void setVideoService(VideoService videoService)
	{
		this.videoService = videoService;
	}

	public List getaVideoList()
	{
		return videoList;
	}

	public void setVideoList(List videoList)
	{
		this.videoList = videoList;
	}

	public Video getVideo()
	{
		return video;
	}

	public void setVideo(Video video)
	{
		this.video = video;
	}

	public String getVideoId()
	{
		return videoId;
	}

	public void setVideoId(String videoId)
	{
		this.videoId = videoId;
	}

	public String getOpinion()
	{
		return opinion;
	}

	public void setOpinion(String opinion)
	{
		this.opinion = opinion;
	}
	
	
}
