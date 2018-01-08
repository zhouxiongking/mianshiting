package yiban.share.action.video;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import yiban.share.pojo.Video;
import yiban.share.service.video.VideoService;
import yiban.share.util.KeyUtil;

import com.opensymphony.xwork2.ActionSupport;

public class VideoAction extends ActionSupport
{
	private VideoService videoService;

	private Video video;
	// 上传的视频文件
	private File videos;
	// 上传的视频文件文件名
	private String videosFileName;
	// 上传的视频文件类型
	private String videosContentType;
	// 上传的图片文件
	private File picture;
	// 上传的图片文件名
	private String pictureFileName;
	// 上传的图片文件类型
	private String pictureContentType;
	
	private String videoId;
	
	private List videoList;
	
	private String result;
	
	private String cliptime;
	
	private String category;
	
	private String position;
	
	/**
	 * 上传视频文件
	 * @return
	 * @throws Exception
	 */
	public String uploadVideo() throws Exception
	{
		// 1.判断上传的视频的格式
		String[] type = this.videosFileName.split("\\.");
		String fileType = type[type.length - 1];
		// 2.上传图片后缀名
		String[] picTypes = this.pictureFileName.split("\\.");
		String picType = picTypes[picTypes.length - 1];
		// 3.将视频文件写到指定的位置
		FileInputStream fis = null;
		FileOutputStream fos = null;
		FileInputStream picfis = null;
		FileOutputStream picfos = null;
		String path = null;
		String imgPath = null;
		String dbPath = null;
		String dbImgPath = null;
		try
		{
			String uniqe = KeyUtil.getNewKey();
			String realPath = ServletActionContext.getServletContext().getRealPath("/");
			dbPath = "upload/video/" + uniqe + "." + fileType;
			dbImgPath = "upload/video/thumbnail/" + KeyUtil.getNewKey() + "." + picType;
			path = realPath + dbPath; 
			imgPath = realPath + dbImgPath;
			// 视频保存至指定文件夹
			fis = new FileInputStream(videos);
			fos = new FileOutputStream(new File(path));
			byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = fis.read(buffer)) > 0) 
            {
                fos.write(buffer, 0, len);
            }
            // 图片保存至指定文件夹
            picfis = new FileInputStream(picture);
			picfos = new FileOutputStream(new File(imgPath));
			byte[] picBuffer = new byte[1024];
            int picLen = 0;
            while ((picLen = picfis.read(picBuffer)) > 0) 
            {
            	picfos.write(picBuffer, 0, picLen);
            }
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			fis.close();
			fos.close();
			picfis.close();
			picfos.close();
		}
		
		//5.写入数据库
		String id = KeyUtil.getNewKey();
		Date now = Calendar.getInstance().getTime();
		DateFormat df = DateFormat.getDateTimeInstance();
		String time = df.format(now);
		
		this.video.setId(id);
		this.video.setClicks(0);
		this.video.setPicUrl(dbImgPath);
		this.video.setUrl(dbPath);
		this.video.setUserId("1");
		this.video.setUsername("kingx");
		this.video.setUploadtime(time);
		this.video.setStatus("success");
		this.videoService.saveVideo(this.video);
		
		return SUCCESS;
	}
	
	/**
	 * 上传成功，跳转至上传成功页面
	 * @return
	 * @throws Exception
	 */
	public String doSwitchSuccess() throws Exception
	{
		return SUCCESS;
	}
	
	/**
	 * 根据传过来的id，找到对应的视频并跳转至视频播放页面
	 * @return
	 * @throws Exception
	 */
	public String doShowVideo() throws Exception
	{
		this.video = (Video) this.videoService.loadByHql("from Video where id = ?", videoId).get(0);
		//改变视频的点击量
		this.video.setClicks(video.getClicks() + 1);
		this.videoService.saveVideo(video);
		return SUCCESS;
	}
	
	/**
	 * 跳转至视频首页，并加载出所有的视频
	 * @return
	 * @throws Exception
	 */
	public String doSwitchVideo() throws Exception
	{
		String hql = "from Video where status = '通过' order by clicks desc";
		this.videoList = this.videoService.loadByHql(hql);
		//this.videoList = this.videoService.listAllByPage(hql, 1, 16);
		return SUCCESS;
	}
	
	/**
	 * 找出同一类的视频文件并跳转至视频分类页面
	 * @return
	 * @throws Exception
	 */
	public String doClassifyVideo() throws Exception
	{
		String sqlString = "from Video where label = ? and status = '通过' order by uploadtime desc";
		this.videoList = this.videoService.loadByHql(sqlString, category);
		return SUCCESS;
	}
	
	public void setVideoService(VideoService videoService)
	{
		this.videoService = videoService;
	}

	public Video getVideo()
	{
		return video;
	}

	public void setVideo(Video video)
	{
		this.video = video;
	}

	public File getVideos()
	{
		return videos;
	}

	public void setVideos(File videos)
	{
		this.videos = videos;
	}

	public String getVideosFileName()
	{
		return videosFileName;
	}

	public void setVideosFileName(String videosFileName)
	{
		this.videosFileName = videosFileName;
	}

	public String getVideosContentType()
	{
		return videosContentType;
	}

	public void setVideosContentType(String videosContentType)
	{
		this.videosContentType = videosContentType;
	}

	public String getVideoId()
	{
		return videoId;
	}

	public void setVideoId(String videoId)
	{
		this.videoId = videoId;
	}

	public List getVideoList()
	{
		return videoList;
	}

	public void setVideoList(List videoList)
	{
		this.videoList = videoList;
	}

	public String getResult()
	{
		return result;
	}

	public void setResult(String result)
	{
		this.result = result;
	}

	public String getCliptime()
	{
		return cliptime;
	}

	public void setCliptime(String cliptime)
	{
		this.cliptime = cliptime;
	}

	public String getCategory()
	{
		return category;
	}

	public void setCategory(String category)
	{
		this.category = category;
	}

	public String getPosition()
	{
		return position;
	}

	public void setPosition(String position)
	{
		this.position = position;
	}

	public File getPicture() {
		return picture;
	}

	public void setPicture(File picture) {
		this.picture = picture;
	}

	public String getPictureFileName() {
		return pictureFileName;
	}

	public void setPictureFileName(String pictureFileName) {
		this.pictureFileName = pictureFileName;
	}

	public String getPictureContentType() {
		return pictureContentType;
	}

	public void setPictureContentType(String pictureContentType) {
		this.pictureContentType = pictureContentType;
	}
	
}
