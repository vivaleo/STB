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
//��ҳ��ʵ��ԭ��
//1.��ȡ���ݱ����ܼ�¼��
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
//ÿҳ��ʾ����
$pagesize=5;
//�ܹ��м�ҳ
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
$sql1="select * from user {$where} order by id desc {$limit}"; //�˴�����id����
$res=mysql_query($sql1);
?>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>�û�������ʾ</title>
</head>
<body>
<form action="searchpage.php" method="get">
id��<input type="text" name="id" value="<?php echo $_GET['id']?>" size="8">
�û���<input type="text" name="username" value="<?php echo $_GET['username']?>" size="8">
���䣺<input type="text" name="age" value="<?php echo $_GET['age']?>" size="8">
 <input type="button" value="�鿴ȫ��" onclick="window.location='searchpage.php'">
 <input type="submit" value="����">
</form>
<br/>
<table border="1" width="500" >
 <tr>
 <td>���</td>
 <td>�û���</td>
 <td>����</td>
 <td>�Ա�</td>
 <td>�绰</td>
 <td>��ַ</td>
 </tr>
<?php while($row= mysql_fetch_assoc($res)){?>
<tr>
 <td><?php echo $row['id'] ?></td>
 <td><?php echo $row['username'] ?></td>
 <td><?php echo $row['age'] ?></td>
 <td><?php if($row['sex']){echo '��';}else{echo 'Ů';} ?></td>
 <td><?php echo $row['phone'] ?></td>
 <td><?php echo $row['address'] ?></td>
 </tr>
<?php }?>
<tr>
 <td colspan="6">
<?php
 echo " ��ǰ{$page}/{$maxpage}ҳ ��{$totalnum}��";
echo " <a href='searchpage.php?page=1{$url}'>��ҳ</a> ";
echo "<a href='searchpage.php?page=".($page-1)."{$url}'>��һҳ</a>";
echo "<a href='searchpage.php?page=".($page+1)."{$url}'>��һҳ</a>";
echo " <a href='searchpage.php?page={$maxpage}{$url}'>βҳ</a> ";
?>
</td>
 </tr>
</table>
</body>
</html>