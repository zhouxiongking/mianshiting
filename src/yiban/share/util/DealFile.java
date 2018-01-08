package yiban.share.util;

import java.io.File;

import org.apache.struts2.ServletActionContext;

public class DealFile
{
	public static void delFile(String[] urls)
	{
		if(urls != null)
		{
			File file = null;
			String path = null;
			for(String url : urls)
			{
				path = ServletActionContext.getServletContext().getRealPath("/") + url;
				file = new File(path);
				file.delete();
			}
		}
	}
}
