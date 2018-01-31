package yiban.share.pojo;
// default package



/**
 * AbstractVideo entity provides the base persistence definition of the Video entity. @author MyEclipse Persistence Tools
 */

public class Article  implements java.io.Serializable {


    // Fields    

     private int id;
     // 简介
     private String description;
     // 标题
     private String title;
     // 标签
     private String label;
     // 分类
     private String category;
     // 内容
     private String content;
     // 上传时间
     private String uploadtime;
     // 文章主图的url
     private String url;
     // 用户名
     private String username;
     // 点击量
     private int clicks;

    // Constructors

    /** default constructor */
    public Article() {
    }

    
    /** full constructor */
    public Article(String description, String title, String label, String content, String uploadtime, 
    		     String url, String username, String category, int clicks) {
        this.description = description;
        this.title = title;
        this.label = label;
        this.content = content;
        this.uploadtime = uploadtime;
        this.url = url;
        this.username = username;
        this.category = category;
        this.clicks = clicks;
    }

   
    // Property accessors

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

    public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public int getClicks() {
		return clicks;
	}

	public void setClicks(int clicks) {
		this.clicks = clicks;
	}

	
}