package yiban.share.util;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.imageio.ImageIO;

public class GlobalUtil
{
	/**
	 * 判断上传的文件是不是符合要求的图片格式
	 * @param str
	 * @return
	 */
	public static boolean isContains(String str)
	{
		if("jpg".equals(str) || "JPG".equals(str) || "jpeg".equals(str) || "JPEG".equals(str) || 
		   "png".equals(str) || "PNG".equals(str) || "bmp".equals(str) ||  "BMP".equals(str) ||
		   "gif".equals(str) || "GIF".equals(str))
		{
			return true;
		}
		return false;
	}
	
	/**
	 * 改变图片大小
	 * @param is  输入的图片文件流
	 * @param os  输出的图片文件流
	 * @param size 修改后的图片大小
	 * @param format  图片格式
	 * @throws IOException
	 */
	public static void resizeImage(InputStream is, OutputStream os, int height, int width, String format) throws IOException {  
	    BufferedImage prevImage = ImageIO.read(is);  
	    int newWidth = width;
	    int newHeight = height;
	    BufferedImage image = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_BGR);  
	    Graphics graphics = image.createGraphics();  
	    graphics.drawImage(prevImage, 0, 0, newWidth, newHeight, null);  
	    ImageIO.write(image, format, os);  
	    os.flush();  
	    is.close();  
	    os.close();  
	}  
	
	/**
	 * 根据视频文件截取图片，获取缩略图
	 * @param videoLocation
	 * @param imageLocation
	 */
	public static void receiveImage(String videoLocation, String imageLocation, String time)
	{
		// 低精度
		List commend = new java.util.ArrayList();
		commend.add("D:\\ffmpeg\\ffmpeg.exe");//视频提取工具的位置
		commend.add("-i");  //
		commend.add(videoLocation);  //设置视频提取工具截取缩略图的视频的路劲
		commend.add("-y");   
		commend.add("-f");
		commend.add("image2");
		commend.add("-ss");
		commend.add(time);  //设置视频播放多长时间后截取图片，可以自己设置
		commend.add("-t");
		commend.add("0.001");  
		commend.add("-s");
		commend.add("236x133"); //设置输出的图片的大小
		commend.add(imageLocation);  //输出的图片的路径
		try 
		{
			ProcessBuilder builder = new ProcessBuilder();
			builder.command(commend);
			builder.start();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
}
