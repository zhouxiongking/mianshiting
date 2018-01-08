package yiban.share.pojo;
// default package



/**
 * Heart entity. @author MyEclipse Persistence Tools
 */

public class Heart  implements java.io.Serializable {


    // Fields    

     private String id;
     private String userid;
     private String picid;


    // Constructors

    /** default constructor */
    public Heart() {
    }

	/** minimal constructor */
    public Heart(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public Heart(String id, String userid, String picid) {
        this.id = id;
        this.userid = userid;
        this.picid = picid;
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

    public String getPicid() {
        return this.picid;
    }
    
    public void setPicid(String picid) {
        this.picid = picid;
    }
   








}