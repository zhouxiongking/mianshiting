package yiban.share.util;

import java.util.UUID;

public class KeyUtil
{
	/**
	  * 获取唯一主键
	  * @return　唯一主键
	  */
	 public static String getNewKey()
	 {
		 return UUID.randomUUID().toString().replace("-", "").toUpperCase();
	 }
}
