package yiban.share.pojo;
// default package



/**
 * ReplyId entity. @author MyEclipse Persistence Tools
 */

public class Reply  implements java.io.Serializable {


    // Fields    

     private String id;
     private String fromid;
     private String commentid;
     private String toid;
     private String content;


    // Constructors

    /** default constructor */
    public Reply() {
    }

    
    /** full constructor */
    public Reply(String id, String fromid, String commentid, String toid, String content) {
        this.id = id;
        this.fromid = fromid;
        this.commentid = commentid;
        this.toid = toid;
        this.content = content;
    }

   
    // Property accessors

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public String getFromid() {
        return this.fromid;
    }
    
    public void setFromid(String fromid) {
        this.fromid = fromid;
    }

    public String getCommentid() {
        return this.commentid;
    }
    
    public void setCommentid(String commentid) {
        this.commentid = commentid;
    }

    public String getToid() {
        return this.toid;
    }
    
    public void setToid(String toid) {
        this.toid = toid;
    }

    public String getContent() {
        return this.content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
   



   public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof Reply) ) return false;
		 Reply castOther = ( Reply ) other; 
         
		 return ( (this.getId()==castOther.getId()) || ( this.getId()!=null && castOther.getId()!=null && this.getId().equals(castOther.getId()) ) )
 && ( (this.getFromid()==castOther.getFromid()) || ( this.getFromid()!=null && castOther.getFromid()!=null && this.getFromid().equals(castOther.getFromid()) ) )
 && ( (this.getCommentid()==castOther.getCommentid()) || ( this.getCommentid()!=null && castOther.getCommentid()!=null && this.getCommentid().equals(castOther.getCommentid()) ) )
 && ( (this.getToid()==castOther.getToid()) || ( this.getToid()!=null && castOther.getToid()!=null && this.getToid().equals(castOther.getToid()) ) )
 && ( (this.getContent()==castOther.getContent()) || ( this.getContent()!=null && castOther.getContent()!=null && this.getContent().equals(castOther.getContent()) ) );
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + ( getId() == null ? 0 : this.getId().hashCode() );
         result = 37 * result + ( getFromid() == null ? 0 : this.getFromid().hashCode() );
         result = 37 * result + ( getCommentid() == null ? 0 : this.getCommentid().hashCode() );
         result = 37 * result + ( getToid() == null ? 0 : this.getToid().hashCode() );
         result = 37 * result + ( getContent() == null ? 0 : this.getContent().hashCode() );
         return result;
   }   





}