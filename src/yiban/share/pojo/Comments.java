package yiban.share.pojo;
// default package



/**
 * CommentsId entity. @author MyEclipse Persistence Tools
 */

public class Comments  implements java.io.Serializable {


    // Fields    

     private String id;
     private String userid;
     private String cusername;
     private String picid;
     private String content;
     private String comtime;


    // Constructors

    /** default constructor */
    public Comments() {
    }

	/** minimal constructor */
    public Comments(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public Comments(String id, String userid, String cusername, String picid, String content, String comtime) {
        this.id = id;
        this.userid = userid;
        this.cusername = cusername;
        this.picid = picid;
        this.content = content;
        this.comtime = comtime;
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

public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof Comments) ) return false;
		 Comments castOther = ( Comments ) other; 
         
		 return ( (this.getId()==castOther.getId()) || ( this.getId()!=null && castOther.getId()!=null && this.getId().equals(castOther.getId()) ) )
 && ( (this.getUserid()==castOther.getUserid()) || ( this.getUserid()!=null && castOther.getUserid()!=null && this.getUserid().equals(castOther.getUserid()) ) )
 && ( (this.getPicid()==castOther.getPicid()) || ( this.getPicid()!=null && castOther.getPicid()!=null && this.getPicid().equals(castOther.getPicid()) ) )
 && ( (this.getContent()==castOther.getContent()) || ( this.getContent()!=null && castOther.getContent()!=null && this.getContent().equals(castOther.getContent()) ) )
 && ( (this.getComtime()==castOther.getComtime()) || ( this.getComtime()!=null && castOther.getComtime()!=null && this.getComtime().equals(castOther.getComtime()) ) );
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + ( getId() == null ? 0 : this.getId().hashCode() );
         result = 37 * result + ( getUserid() == null ? 0 : this.getUserid().hashCode() );
         result = 37 * result + ( getPicid() == null ? 0 : this.getPicid().hashCode() );
         result = 37 * result + ( getContent() == null ? 0 : this.getContent().hashCode() );
         result = 37 * result + ( getComtime() == null ? 0 : this.getComtime().hashCode() );
         return result;
   }   





}