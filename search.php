<?php
$wherelist=array();
$urlist=array();
if(!empty($_GET['id']))
{
$wherelist[]=" id like '%".$_GET['id']."%'";
$urllist[]="id=".$_GET['id'];
  
}
if(!empty($_GET['username']))
{
$wherelist[]=" username like '%".$_GET['username']."%'";
$urllist[]="username=".$_GET['username'];
}if(!empty($_GET['age']))
{
$wherelist[]=" age like '%".$_GET['age']."%'";
$urllist[]="age=".$_GET['age'];
}
$where="";
if(count($wherelist)>0)
{
$where=" where ".implode(' and ',$wherelist);
$url='&'.implode('&',$urllist);
}
//分页的实现原理
//1.获取数据表中总记录数
$mysql_server_name='localhost:3306'; 
$mysql_username='root'; 
$mysql_password='MinSheng123'; 
$mysql_db_name='demo';
$conn= new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_db_name);
$conn -> set_charset("utf8");
$conn -> close();

mysql_query("set names 'utf8'");
mysql_select_db("aaa");
$sql="select * from user $where "; 
$result=mysql_query($sql);
$totalnum=mysql_num_rows($result);
//每页显示条数
$pagesize=5;
//总共有几页
$maxpage=ceil($totalnum/$pagesize);
$page=isset($_GET['page'])?$_GET['page']:1;
if($page <1)
{
$page=1;
}
if($page>$maxpage)
{
$page=$maxpage;
}
$limit=" limit ".($page-1)*$pagesize.",$pagesize";
$sql1="select * from user {$where} order by id desc {$limit}"; //此处加了id降序
$res=mysql_query($sql1);
?>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>用户资料显示</title>
</head>
<body>
<form action="searchpage.php" method="get">
id：<input type="text" name="id" value="<?php echo $_GET['id']?>" size="8">
用户名<input type="text" name="username" value="<?php echo $_GET['username']?>" size="8">
年龄：<input type="text" name="age" value="<?php echo $_GET['age']?>" size="8">
 <input type="button" value="查看全部" onclick="window.location='searchpage.php'">
 <input type="submit" value="搜索">
</form>
<br/>
<table border="1" width="500" >
 <tr>
 <td>编号</td>
 <td>用户名</td>
 <td>年龄</td>
 <td>性别</td>
 <td>电话</td>
 <td>地址</td>
 </tr>
<?php while($row= mysql_fetch_assoc($res)){?>
<tr>
 <td><?php echo $row['id'] ?></td>
 <td><?php echo $row['username'] ?></td>
 <td><?php echo $row['age'] ?></td>
 <td><?php if($row['sex']){echo '男';}else{echo '女';} ?></td>
 <td><?php echo $row['phone'] ?></td>
 <td><?php echo $row['address'] ?></td>
 </tr>
<?php }?>
<tr>
 <td colspan="6">
<?php
 echo " 当前{$page}/{$maxpage}页 共{$totalnum}条";
echo " <a href='searchpage.php?page=1{$url}'>首页</a> ";
echo "<a href='searchpage.php?page=".($page-1)."{$url}'>上一页</a>";
echo "<a href='searchpage.php?page=".($page+1)."{$url}'>下一页</a>";
echo " <a href='searchpage.php?page={$maxpage}{$url}'>尾页</a> ";
?>
</td>
 </tr>
</table>
</body>
</html>