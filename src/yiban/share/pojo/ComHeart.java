package yiban.share.pojo;
// default package



/**
 * ComHeart entity. @author MyEclipse Persistence Tools
 */

public class ComHeart  implements java.io.Serializable {


    // Fields    

     private String id;
     private String userid;
     private String commentid;


    // Constructors

    /** default constructor */
    public ComHeart() {
    }

	/** minimal constructor */
    public ComHeart(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public ComHeart(String id, String userid, String commentid) {
        this.id = id;
        this.userid = userid;
        this.commentid = commentid;
    }

   
    // Property accessors

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
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