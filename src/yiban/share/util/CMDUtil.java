package yiban.share.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

public class CMDUtil {
	/**
	 * 执行cmd命令
	 */
	public void execCMD() {
		String command="ifconfig";  
	    String s="IPv4";  
	    String line = null;  
	    StringBuilder sb = new StringBuilder();  
	    Runtime runtime = Runtime.getRuntime();  
	    try {  
	    Process process = runtime.exec(command);  
	    BufferedReader  bufferedReader = new BufferedReader  
	            (new InputStreamReader(process.getInputStream()));  
	        while ((line = bufferedReader.readLine()) != null) {  
	            sb.append(line + "\n");  
	            if (line.contains(s)) {  
	                System.out.println(line);  
	            }  
	        }  
	    } catch (IOException e) {  
	        // TODO 自动生成的 catch 块  
	        e.printStackTrace();  
	    }  
	}
	
	public void execBash() {
		InputStream in = null;  
        try {  
            Process pro = Runtime.getRuntime().exec(new String[]{"/bin/sh",  
                                     "ifconfig"});  
            pro.waitFor();  
            in = pro.getInputStream();  
            BufferedReader read = new BufferedReader(new InputStreamReader(in));  
            String result = read.readLine();  
            System.out.println("INFO:"+result);  
        } catch (Exception e) {  
            e.printStackTrace();  
        } 
	}
	
	public void executeNewFlow() {
        Runtime run = Runtime.getRuntime();
        File wd = new File("/bin");
        Process proc = null;
        try {
            proc = run.exec("/bin/bash", null, wd);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (proc != null) {
            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(proc.getOutputStream())), true);
            out.println("rm -fr ~/Documents/github-test/only-for-test/test");
            out.println("exit");
            try {
                String line;
                while ((line = in.readLine()) != null) {
                    System.out.println(line);
                }
                proc.waitFor();
                in.close();
                out.close();
                proc.destroy();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
	
	public static void main(String[] args) {
		CMDUtil util = new CMDUtil();
		util.executeNewFlow();
	}
}
