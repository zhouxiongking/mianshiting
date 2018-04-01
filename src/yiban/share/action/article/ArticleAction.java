package yiban.share.action.article;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.struts2.ServletActionContext;

import yiban.share.pojo.Article;
import yiban.share.pojo.Label;
import yiban.share.pojo.Reading;
import yiban.share.service.article.ArticleService;
import yiban.share.util.KeyUtil;
import yiban.share.util.OSSUtil;

import com.opensymphony.xwork2.ActionSupport;

public class ArticleAction extends ActionSupport
{
	private ArticleService articleService;

	private Article article;
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
	
	private String articleId;
	
	private List articleList;
	
	private String result;
	
	private String cliptime;
	
	private String category;
	
	private int pageNo;
	
	private Reading reading;
	// 热门文章
	private List<Article> hotArticleList;
	// 近期文章
	private List<Article> recentArticleList;
	// 标签
	private List<Label> labelList;
	// 关键字
	private String keyword;
	// 上一篇
	private Article preArticle;
	// 下一篇
	private Article nextArticle;
	
	private String picUrl;
	
	/**
	 * 上传文章
	 * @return
	 * @throws Exception
	 */
	public String uploadArticle() throws Exception
	{
		//3.选出对应的图片和label标签
		String dbPath = null;
		String label = null;
		if("Javascript".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/javascript-logo.png";
			label = "JS,javascript,js";
		} else if("HTML5".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/html5-logo.jpeg";
			label = "html, html5";
		} else if("CSS3".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/css-logo.jpeg";
			label = "css, css3";
		} else if("ES6".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/es6-logo.jpeg";
			label = "es6, ES6, ECMAScript6";
		} else if("Git".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/git-logo.jpeg";
			label = "git, GIT";
		} else if("AngularJS".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/angularjs.jpeg";
			label = "Angular,ng,NG,angularjs";
		} else if("Vue".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/vue-logo.png";
			label = "Vue,Vue2,Vue2.0,Vuex,Vue-Router,Vue-resource";
		} else if("React".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/react-logo.jpeg";
			label = "react, React";
		} else if("Gulp".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/gulp-logo.jpeg";
			label = "gulp";
		} else if("Webpack".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/webpack-logo.png";
			label = "webpack, webpack2, webpack3";
		} else if("NodeJS".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/nodejs-logo.jpeg";
			label = "node, nodejs, NodeJS";
		} else if("Mysql".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/mysql-logo.jpeg";
			label = "mysql, sql";
		} else if("synthesize".equals(this.article.getCategory())) {
			dbPath = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/logo/web.png";
			label = "synthesize, 综合, web";
		} else {
			label = "";
		}
		
		//5.处理时间
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");  
		String time = df.format(date);  
		
		this.article.setUsername("corder分享");
		this.article.setUploadtime(time);
		this.article.setUrl(dbPath);
		this.article.setLabel(label);
		this.article.setIsPass(0);
		
		this.articleService.saveArticle(this.article);
		
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
	 * 根据传过来的id，找到对应的文章
	 * @return
	 * @throws Exception
	 */
	public String loadArticleDetail() throws Exception
	{
		int id = Integer.parseInt(this.articleId);
		Article searchArticle = (Article) this.articleService.loadByHql("from Article  where id = ?", id).get(0);
		int clicks = 0;
		if(searchArticle != null && searchArticle.getClicks() > 0) {
			clicks = searchArticle.getClicks() + 1;
		} else {
			clicks = 1;
		}
		searchArticle.setClicks(clicks);
		
		String hql = "update Article set clicks = ? where id = ?";
		this.articleService.updateArticle(hql, clicks, id);
		this.article = searchArticle;
		
		return SUCCESS;
	}
	
	/**
	 * 找出前一篇和后一篇
	 * @return
	 * @throws Exception
	 */
	public String loadPreAndNext() throws Exception {
		int id = Integer.parseInt(this.articleId);
		String preHql = "from Article where id < ? and isPass = 1 order by id desc limit 1";
		String nextHql = "from Article where id > ? and isPass = 1 order by id asc limit 1";
		List<Article> preList = this.articleService.loadByHql(preHql, id);
		List<Article> nextList = this.articleService.loadByHql(nextHql, id);
		
		if(preList != null && preList.size() > 0) {
			this.preArticle = preList.get(0);
		}
		
		if(nextList != null && nextList.size() > 0) {
			this.nextArticle = nextList.get(0);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 分页查询文章
	 * @return
	 * @throws Exception
	 */
	public String loadArticleByPage() throws Exception
	{
		String sql = "select a.*, count(c.article_id) from article as a left join comments as c on a.id = c.article_id group by a.id";
		List<Object[]> tempList = this.articleService.listPageBySQL(sql, this.pageNo, 10);
		this.articleList = new ArrayList<Article>();
		Article article = null;
		for(Object[] obj: tempList) {
			article = new Article();
			article.setId((Integer)obj[0]);
			article.setDescription((String)obj[1]);
			article.setTitle((String)obj[2]);
			article.setClicks((Integer)obj[5]);
			article.setUploadtime((String)obj[6]);
			article.setUrl((String)obj[7]);
			article.setCategory((String)obj[10]);
			article.setUsername((String)obj[12]);
			article.setCommentCount(new Integer(String.valueOf(obj[14])));
			this.articleList.add(article);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 找出近期的五篇文章
	 * @return
	 * @throws Exception
	 */
	public String loadRecentArticles() throws Exception {
		String hql = "from Article where isPass = 1 order by id desc";
		this.recentArticleList = this.articleService.listAllByPage(hql, this.pageNo, 5);
		return SUCCESS;
	}
	
	/**
	 * 加载出所有的标签
	 * @return
	 * @throws Exception
	 */
	public String loadHotLabels() throws Exception {
		String sql = "select category,count(category) from article where is_pass = 1 group by category";
		List tempList = this.articleService.listBySQL(sql);
		this.labelList = new ArrayList<Label>();
		Label label = null;
		for(int i = 0; i < tempList.size(); i++) {
			label = new Label();
			Object[] valueList = (Object[]) tempList.get(i);
			String name = (String) valueList[0];
			Number count = (Number) valueList[1];
			label.setName(name);
			label.setCounts(count.intValue());
			labelList.add(label);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 找出热门文章，根据点击量的前五名
	 * @return
	 * @throws Exception
	 */
	public String loadHotArticles() throws Exception {
		String hql = "from Article where isPass = 1 order by clicks desc";
		this.hotArticleList = this.articleService.listAllByPage(hql, 1, 5);
		return SUCCESS;
	}
	
	/**
	 * 根据关键字搜索文章
	 * @return
	 * @throws Exception
	 */
	public String loadArticlesByKeyword() throws Exception{
		this.keyword = URLDecoder.decode(this.keyword, "UTF-8");
		String[] keywords = this.keyword.split(" ");
		for(int i = 0; i < keywords.length; i++) {
			if(keywords[i] != null && keywords[i].trim().length() > 0) {
				String hql = "from Article where upper(label) like '%" + keywords[i].toUpperCase() + "%' or upper(title) like '%" + keywords[i].toUpperCase() + "%' and isPass = 1 order by id desc";
				this.articleList = this.articleService.listAllByPage(hql, this.pageNo, 10);
				if(this.articleList != null && this.articleList.size() > 0) {
					break;
				}
			}
		}
		
		return SUCCESS;
	}
	
	/**
	 * 分页请求某类型文章
	 * @return
	 * @throws Exception
	 */
	public String loadArticleByCategory() throws Exception
	{
		String conditions = null;
		if("basic".equals(this.category)) {
			conditions = " 'Javascript', 'CSS3', 'HTML5' ";
		} else if("advance".equals(this.category)) {
			conditions = " 'ES6' ";
		} else if("framework".equals(this.category)) {
			conditions = " 'Vue', 'AngularJS', 'React' ";
		} else if("tool".equals(this.category)){
			conditions = " 'Git', 'Webpack', 'Gulp' ";
		} else if("db".equals(this.category)){
			conditions = " 'Mysql' ";
		} else {
			conditions = " '" + this.category + "' ";
		}
		String sqlString = "from Article where category in (" + conditions + ") and isPass = 1 order by clicks asc";
		this.articleList = this.articleService.listAllByPage(sqlString, this.pageNo, 10);
		return SUCCESS;
	}
	
	/**
	 * 上传图片至云服务器
	 * @return
	 * @throws Exception
	 */
	public String uploadPicToOSS() throws Exception {
		FileInputStream fis = new FileInputStream(this.picture);
		String uniqeName = KeyUtil.getNewKey();
		String[] nameArr = this.pictureFileName.split("\\.");
		String suffixName = nameArr[nameArr.length - 1];
		
		OSSUtil ossUtil = new OSSUtil();
		ossUtil.uploadFileToOSS(fis, uniqeName, suffixName);
		// 构造返回值
		this.picUrl = "http://mstcdn.oss-cn-shenzhen.aliyuncs.com/images/articles/" + uniqeName + "." + suffixName;
		return SUCCESS;
	}
	
	public void setArticleService(ArticleService articleService)
	{
		this.articleService = articleService;
	}

	public Article getArticle()
	{
		return article;
	}

	public void setArticle(Article article)
	{
		this.article = article;
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

	public String getArticleId() {
		return articleId;
	}

	public void setArticleId(String articleId) {
		this.articleId = articleId;
	}

	public List getArticleList() {
		return articleList;
	}

	public void setArticleList(List articleList) {
		this.articleList = articleList;
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

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public Reading getReading() {
		return reading;
	}

	public void setReading(Reading reading) {
		this.reading = reading;
	}

	public List<Article> getHotArticleList() {
		return hotArticleList;
	}

	public void setHotArticleList(List<Article> hotArticleList) {
		this.hotArticleList = hotArticleList;
	}

	public List<Article> getRecentArticleList() {
		return recentArticleList;
	}

	public void setRecentArticleList(List<Article> recentArticleList) {
		this.recentArticleList = recentArticleList;
	}

	public List<Label> getLabelList() {
		return labelList;
	}

	public void setLabelList(List<Label> labelList) {
		this.labelList = labelList;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public Article getPreArticle() {
		return preArticle;
	}

	public void setPreArticle(Article preArticle) {
		this.preArticle = preArticle;
	}

	public Article getNextArticle() {
		return nextArticle;
	}

	public void setNextArticle(Article nextArticle) {
		this.nextArticle = nextArticle;
	}

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	
}
