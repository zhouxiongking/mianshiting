package yiban.share.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import com.aliyun.oss.OSSClient;

public class OSSUtil {
	/**
	 * 将文件上传至OSS
	 * @return
	 */
	public void uploadFileToOSS(InputStream inputStream, String fileName, String fileType) {
		// endpoint以杭州为例，其它region请按实际情况填写，自己的是深圳的
		String endpoint = "http://oss-cn-shenzhen.aliyuncs.com";
		// 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建
		String accessKeyId = "LTAI6jBEV1MUbVfU";
		String accessKeySecret = "uvBW0WAqIJzgZFmuqdNXibmlwLHXpj";
		// 创建OSSClient实例
		OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
		// 上传文件流
		ossClient.putObject("mstcdn", "images/articles/" + fileName + "." + fileType, inputStream);
		// 关闭client
		ossClient.shutdown();
	}
	
	public static void main(String[] args) throws FileNotFoundException {
		OSSUtil util = new OSSUtil();
		FileInputStream fs = new FileInputStream(new File("/Users/zhouxiong/Desktop/topic.jpg"));
		util.uploadFileToOSS(fs, "12323231111", "jpg");
	}
}









