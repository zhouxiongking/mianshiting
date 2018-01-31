package yiban.share.pojo;
// default package



/**
 * ComHeart entity. @author MyEclipse Persistence Tools
 */

public class ComHeart  implements java.io.Serializable {


    // Fields    

     private int id;
     private String userid;
     private String commentid;


    // Constructors

    /** default constructor */
    public ComHeart() {
    }

	/** minimal constructor */
    public ComHeart(int id) {
        this.id = id;
    }
    
    /** full constructor */
    public ComHeart(int id, String userid, String commentid) {
        this.id = id;
        this.userid = userid;
        this.commentid = commentid;
    }

   
    // Property accessors

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getUserid() {
        return this.userid;
    }

	public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getCommentid() {
        return this.commentid;
    }
    
    public void setCommentid(String commentid) {
        this.commentid = commentid;
    }
   








}