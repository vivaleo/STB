<?php 
  session_start(); 
  require_once('Captcha.php'); 
  
  $obj = new Captcha($sname);   # 创建Captcha类对象 
                  # $sname为保存captcha的session name,可留空,留空則为'm_captcha'
  
  $obj->create($length,$param);  #创建Captcha并输出图片 
                  # $length为Captcha长度，可留空，默认为4 
                  /* $param = array( 
                      'width' => 13    captcha 字符宽度 
                      'height' => 18    captcha 字符高度 
                      'pnum' => 100    干扰点个数
                      'lnum' => 2     干扰线条数 
                      ) 
                      可留空 
                  */
  $obj->check($captcha,$flag); # 检查用户输入的验证码是否正确，true or false 
                  # $captcha为用户输入的验证码,必填 
                  # $flag 可留空，默认为1  
                  #    1:当验证成功后自动清除captcha session 
                  #    0:挡验证成功后不清除captcha session,用于ajax检查 
?>