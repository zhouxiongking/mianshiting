package yiban.share.pojo;
// default package



/**
 * AbstractVideo entity provides the base persistence definition of the Video entity. @author MyEclipse Persistence Tools
 */

public class Video  implements java.io.Serializable {


    // Fields    

     private String id;
     private String name;
     private String title;
     private String label;
     private String description;
     private Integer clicks;
     private String uploadtime;
     private String url;
     private String status;
     private String obligate;
     private String userId;
     private String picUrl;
     private String username;


    // Constructors

    /** default constructor */
    public Video() {
    }

    
    /** full constructor */
    public Video(String name, String title, String label, String description, Integer clicks, String uploadtime, 
    		     String url, String status, String obligate, String userId, String picUrl, String username) {
        this.name = name;
        this.title = title;
        this.label = label;
        this.description = description;
        this.clicks = clicks;
        this.uploadtime = uploadtime;
        this.url = url;
        this.status = status;
        this.obligate = obligate;
        this.userId = userId;
        this.picUrl = picUrl;
        this.username = username;
    }

   
    // Property accessors

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return this.title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    public String getLabel() {
        return this.label;
    }
    
    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return this.description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getClicks() {
        return this.clicks;
    }
    
    public void setClicks(Integer clicks) {
        this.clicks = clicks;
    }

    public String getUploadtime() {
        return this.uploadtime;
    }
    
    public void setUploadtime(String uploadtime) {
        this.uploadtime = uploadtime;
    }

    public String getUrl() {
        return this.url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }

    public String getStatus() {
        return this.status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    public String getObligate() {
        return this.obligate;
    }
    
    public void setObligate(String obligate) {
        this.obligate = obligate;
    }

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }

	public String getPicUrl()
	{
		return picUrl;
	}

	public void setPicUrl(String picUrl)
	{
		this.picUrl = picUrl;
	}

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

}