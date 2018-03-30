package yiban.share.pojo;
// default package



/**
 * CommentsId entity. @author MyEclipse Persistence Tools
 */

public class Comments  implements java.io.Serializable {


    // Fields    

     private int id;
     private String userid;
     private String cusername;
     private int articleId;
     private String content;
     private String comtime;


    // Constructors

    /** default constructor */
    public Comments() {
    }

	/** minimal constructor */
    public Comments(int id) {
        this.id = id;
    }
    
    /** full constructor */
    public Comments(int id, String userid, String cusername, int articleId, String content, String comtime) {
        this.id = id;
        this.userid = userid;
        this.cusername = cusername;
        this.articleId = articleId;
        this.content = content;
        this.comtime = comtime;
    }

   
    // Property accessors
    public String getUserid() {
        return this.userid;
    }
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setUserid(String userid) {
        this.userid = userid;
    }

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	public String getContent() {
        return this.content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }

    public String getComtime() {
        return this.comtime;
    }
    
    public void setComtime(String comtime) {
        this.comtime = comtime;
    }
   
    public String getCusername()
	{
		return cusername;
	}

	public void setCusername(String cusername)
	{
		this.cusername = cusername;
	}

}