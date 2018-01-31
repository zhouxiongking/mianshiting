package yiban.share.util;

import java.sql.Types;

import org.hibernate.dialect.MySQL5Dialect;

public class MyUniqueSQLDialect extends MySQL5Dialect {
	public MyUniqueSQLDialect() {
		super();
		registerHibernateType(Types.LONGVARCHAR, 65535, "text");
	}
}
