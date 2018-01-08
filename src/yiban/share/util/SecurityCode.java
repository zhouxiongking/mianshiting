package yiban.share.util;

public class SecurityCode
{
	public static String getSecurityCode()
	{
		return obtainCode(4, true);
	}

	/**
	 * 获取图片上的数字或者字母
	 * 
	 * @param length
	 *            表示生成的图片上数字或者字母的个数
	 * @param isCanRepeat
	 *            数字或者字母是否可以重复
	 * @return
	 */
	public static String obtainCode(int length, boolean isCanRepeat)
	{
		// 字符集合(除去易混淆的数字0、数字1、字母l、字母o)
		char[] codes =
		{ '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
				'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't',
				'u', 'v', 'w', 'x', 'y', 'z' };
		// 字符集合的长度
		int n = codes.length;
		// 存放抽取出来的字符
		char[] result = new char[length];
		// 判断能否出现重复的字符
		if (isCanRepeat)
		{
			for (int i = 0; i < result.length; i++)
			{
				// 索引 0 and n-1
				int r = (int) (Math.random() * n);

				// 将result中的第i个元素设置为codes[r]存放的数值
				result[i] = codes[r];
			}
		}
		else
		{
			for (int i = 0; i < result.length; i++)
			{
				// 索引 0 and n-1
				int r = (int) (Math.random() * n);

				// 将result中的第i个元素设置为codes[r]存放的数值
				result[i] = codes[r];

				// 必须确保不会再次抽取到那个字符，因为所有抽取的字符必须不相同。
				// 因此，这里用数组中的最后一个字符改写codes[r]，并将n减1
				codes[r] = codes[n - 1];
				n--;
			}
		}

		return String.valueOf(result);
	}
}
