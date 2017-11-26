<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>世投邦——助力投融新视界</title>

<!-- Bootstrap -->
<link href="css/bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="css/bootstrap-tab.css">
<link rel="stylesheet" href="css/animate.css" >
<link rel="stylesheet" href="css/owl.carousel.css">
<link rel="stylesheet" href="css/owl.theme.css">
<link rel="stylesheet" href="css/style.css" >
<link rel="stylesheet" href="css/material-bootstrap-wizard.css">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<?php include 'nav.php' ?>

<!--        导航组件结束        -->

<!--        登录功能开始        -->


      
<div class="modal fade" id="login-modal" tab-index="-1" data-backdrop="false">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		    <div class="modal-header">
		        <button class="close" data-dismiss="modal">&times;</button>
		    	<h4>用户登录</h4>
		    </div>
			<div class="modal-body">
				<form role="form" class="form-signin" name="form1" method="post" action="login/checklogin.php">
        <h2 class="form-signin-heading">请登录</h2>
        <div class="form-group">
        <label for="myusername">用户名</label>
        <input name="myusername" id="myusername" type="text" class="form-control" placeholder="输入用户名或手机号" autofocus>
        </div>
        
        <div class="form-group">
        <label for="mypassword">密码</label>
        <input name="mypassword" id="mypassword" type="password" class="form-control" placeholder="输入密码">
        </div>
        
        <!-- The checkbox remember me is not implemented yet...
        <label class="checkbox">
          <input type="checkbox" value="remember-me"> Remember me
        </label>
        -->
        <button name="Submit" id="submit" class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
	    <a href="signup.php" name="Sign Up" id="signup" class="btn btn-lg btn-primary btn-block" type="submit">创建新的账户</a>

        <div id="message"></div>
      </form>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary">提示</button>
			</div>
		</div>
	</div>
</div>   
<!--        登录功能结束        -->
<!--        注册功能开始        -->
 <div class="modal fade" id="register-modal" tab-index="-1" data-backdrop="false">  
   <div class="modal-dialog modal-lg">
		<div class="modal-content">
		    <div class="modal-header">
		        <button class="close" data-dismiss="modal">&times;</button>
		    	<h4>用户注册</h4>
		    </div>
			<div class="modal-body">   
    <form id="example-advanced-form" action="#">
    <h3>创建您的用户账号</h3>
    <fieldset>
        <legend>账户基本信息</legend>
 
        <label for="userName-2">用户名 *</label>
        <input id="userName-2" name="userName" type="text" class="required">
        <label for="password-2">密码 *</label>
        <input id="password-2" name="password" type="text" class="required">
        <label for="confirm-2">确认密码 *</label>
        <input id="confirm-2" name="confirm" type="text" class="required">
        <p>(*) 带星号的为必填项目</p>
    </fieldset>
 
    <h3>进一步设置账户的相关信息</h3>
    <fieldset>
        <legend>账户详细信息</legend>
 
        <label for="name-2">名字 *</label>
        <input id="name-2" name="name" type="text" class="required">
        <label for="surname-2">姓氏 *</label>
        <input id="surname-2" name="surname" type="text" class="required">
        <label for="email-2">电子邮件地址 *</label>
        <input id="email-2" name="email" type="text" class="required email">
        <label for="address-2">居住地址</label>
        <input id="address-2" name="address" type="text">
        <label for="age-2">年龄 (The warning step will show up if age is less than 18) *</label>
        <input id="age-2" name="age" type="text" class="required number">
        <p>(*) 带星号的为必填项目</p>
    </fieldset>
 
    <h3>警告</h3>
    <fieldset>
        <legend>您不满十八岁</legend>
 
        <p>暂不能注册账号</p>
    </fieldset>
 
    <h3>完成</h3>
    <fieldset>
        <legend>许可条款</legend>
 
        <input id="acceptTerms-2" name="acceptTerms" type="checkbox" class="required"> <label for="acceptTerms-2">我同意许可条款</label>
    </fieldset>
</form>
 </div>
			<div class="modal-footer">
				<button class="btn btn-primary">提示</button>
			</div>
		</div>
	</div>
      
</div> <!-- /container -->
<!--        登录功能结束        -->


<!--        轮播图组件开始        -->
<div id="carousel1" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carousel1" data-slide-to="0" class="active"></li>
    <li data-target="#carousel1" data-slide-to="1"></li>
    <li data-target="#carousel1" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" role="listbox">
    <div class="item active"><img src="images/slider/04.jpg" alt="First slide image" class="center-block">
      <div class="carousel-caption">
        <h3>世投邦，好地方</h3>
        <p>商贾云集之地</p>
      </div>
    </div>
    <div class="item"><img src="images/slider/02.jpg" alt="Second slide image" class="center-block">
      <div class="carousel-caption">
        <h3>创业投资，是要选个好平台</h3>
        <p>投融界大咖之选</p>
      </div>
    </div>
    <div class="item"><img src="images/slider/01.jpg" alt="Third slide image" class="center-block">
      <div class="carousel-caption">
        <h3>世界那么大，机会无处不在</h3>
        <p>总要有个入口吧，我们将是您的不二选择</p>
      </div>
    </div>
  </div>
  <a class="left carousel-control" href="#carousel1" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#carousel1" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>
<!--        上面部分为轮播图        -->

<div id="stb-counter" class="stb-counters stb-bg-section">
<div class="container">
  <div class="row animate">
  	<div class="col-md-3 text-center animate-box">
	    <span class="icon">
	        <i class="glyphicon glyphicon-ok-sign"></i>
	    </span>
		<span class="stb-counter js-counter" data-from="0" data-to="27539" data-speed="5000" data-refresh-interval="50"></span>
		<span class="stb-counter-label">成功的匹配</span>
	</div>
	<div class="col-md-3 text-center animate-box">
	    <span class="icon">
	        <i class="glyphicon glyphicon-briefcase"></i>
	    </span>
		<span class="stb-counter js-counter" data-from="0" data-to="27539" data-speed="5000" data-refresh-interval="50"></span>
		<span class="stb-counter-label">项目提交量</span>
	</div>
	<div class="col-md-3 text-center animate-box">
	    <span class="icon">
	        <i class="glyphicon glyphicon-heart-empty"></i>
	    </span>
		<span class="stb-counter js-counter" data-from="0" data-to="27539" data-speed="5000" data-refresh-interval="50"></span>
		<span class="stb-counter-label">资金需求数</span>
	</div>
	<div class="col-md-3 text-center animate-box">
	    <span class="icon">
	        <i class="glyphicon glyphicon-usd"></i>
	    </span>
		<span class="stb-counter js-counter" data-from="0" data-to="27539" data-speed="5000" data-refresh-interval="50"></span>
		<span class="stb-counter-label">交易总标的额</span>
	</div>		
  </div>
</div>
</div>
<!--        s以上部分为交易数据汇总展示        -->


<section class="stb-promotion">
	<div class="container">
		<div class="">
			
		</div>
	</div>	
</section>



<!--        以下部分为找资金        -->
<section class="funding">
  			<!-- IMAGES -->
			<div class="container">
			    <div >
			        <div class="page-header">
                      
                        <h1 class="h1"><a href="#" class="h1">找资金</a> <small class=""><a>发布投资需求</a></small></h1>
                        
                     
			    	      
				      
				      
			    	
			      </div>
			    </div>
				
				<div class="row">
				
					<div class="col-sm-12 col-lg-6 ">
			       
				     <p class="lead text-muted"></p>
						<div class="row">
						<div class="col-lg-6 col-sm-6 ">
							<a href="project_search.html" title="天使投资" class="thumbnail">
							  <img src="images/11111.jpg" alt="">
							</a>
						 </div>
						<div class="col-lg-6 col-sm-6 ">
							<a href="project_search.html" title="风险投资" class="thumbnail">
							  <img src="images/2222.jpg" alt="">
							</a>
						</div>
						<div class="col-lg-6 col-sm-6 ">
							<a href="project_search.html" title="股权投资" class="thumbnail">
							  <img src="images/3333.jpg" alt="">
							</a>
						</div>
						<div class="col-lg-6 col-sm-6 ">
							<a href="project_search.html" title="知名投资者" class="thumbnail">
							  <img src="images/4444.jpg" alt="">
							</a>
						</div>
						</div>
					</div>
				  <div class="col-sm-12 col-lg-6 ">
					<p class="text-muted"></p>
					<!-- Thumbnails container -->
					<div class="row">
					  <div class="col-lg-6 col-sm-6 ">
						<div class="thumbnail">
						  <a href="famous_investment_institutions.html" class="" title="知名投资机构"><img src="images/555555.jpg" alt="知名投资机构"></a>
						  
						</div>
					  </div>
					  <div class="col-lg-6 col-sm-6 ">
						<div class="thumbnail">
					      <a href="famous_investor.html" class="" title="知名投资人"><img src="images/6666.jpg" alt="知名投资人"></a>
						  
						  
						</div>
					  </div>
					</div>           
					</div>
				</div>
			</div>
  <div class="container">
    <div class="page-header">
    	<h2 class="h2">
    		为您精选资金
    	</h2>
    </div>
  	<div class="col-md-4 col-sm-6 text-center stb-project animate-box" data-animate-effect="fadeIn">
					<a href="./investor_minshengtouzi.html"><img src="images/investors/MinShengTouZi1.jpg" alt="民盛（上海）投资有限公司" class="img-responsive">
						<h3>民盛（上海）投资有限公司</h3>
						<span>寻求项目投资</span>
					</a>
	</div>
				<div class="col-md-4 col-sm-6 text-center stb-project animate-box" data-animate-effect="fadeIn">
					<a href="./investor_beijiguangchuangtou.html"><img src="images/investors/BeiJiGuangChuangTou.jpg" alt="北极光创业投资基金" class="img-responsive">
						<h3>北极光创业投资基金</h3>
						<span>专注于早期和成长期技术驱动型的商业机会</span>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 text-center stb-project animate-box" data-animate-effect="fadeIn">
					<a href="./investor_qimingchuangtou.html"><img src="images/investors/QiMingChuangTou.jpg" alt="启明创投" class="img-responsive">
						<h3>启明创投</h3>
						<span>专注于媒体和互联网、信息技术、消费者和零售业、医疗保健以及清洁能源等行业早期和成长期企业的投资</span>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 text-center stb-project animate-box" data-animate-effect="fadeIn">
					<a href="investor_dachenchuangtou.html"><img src="images/investors/DaChenChuangTou.jpg" alt="深圳市达晨创业投资有限公司" class="img-responsive">
						<h3>达晨创投</h3>
						<span>专注于TMT、消费服务、医疗健康、节能环保四大投资领域，和军工、大数据、智能制造等细分行业的投资</span>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 text-center stb-project animate-box" data-animate-effect="fadeIn">
					<a href="./investor_yidaziben.html"><img src="images/investors/HongYiZiBen.jpg" alt="江苏毅达股权投资基金管理有限公司" class="img-responsive">
						<h3>毅达资本</h3>
						<span>注重全产业链投资,累计投资支持了650多家创业企业</span>
					</a>
				</div>
				<div class="col-md-4 col-sm-6 text-center stb-project animate-box" data-animate-effect="fadeIn">
					<a href="./investor_shunweiziben.html"><img src="images/investors/ShunWeiZiBen.jpg" alt="顺为资本" class="img-responsive">
						<h3>顺为资本</h3>
						<span>主要投资目标为初创期及成长期的优质创业公司</span>
					</a>
				</div>
  </div>
</section>
<!--        以上部分为找资金主体        -->

<div id="fh5co-testimonial" class="fh5co-bg-section">
		<div class="container">
			<div class="row animate-box">
				<div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
					<h2>明星投资人</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md-10 col-md-offset-1">
					<div class="row animate-box">
						<div class="owl-carousel owl-carousel-fullwidth">
							<div class="item">
								<div class="testimony-slide active text-center">
									<figure>
										<img src="images/xuxiaoping.jpg" alt="user">
									</figure>
									<span>徐小平 <a href="#" class="twitter">真格基金创始人</a></span>
									<blockquote>
										<p>&ldquo;是否创业，何时创业，创什么业，是每个人自己的人生选择；但宣讲创业常识，提供创业资源，传播创业信息，是我自己的人生选择&rdquo;</p>
									</blockquote>
								</div>
							</div>
							<div class="item">
								<div class="testimony-slide active text-center">
									<figure>
										<img src="images/shennanpeng.jpg" alt="user">
									</figure>
									<span>沈南鹏 <a href="#" class="twitter">红杉资本全球执行合伙人</a></span>
									<blockquote>
										<p>&ldquo;运气都很重要。 对PE投资来讲，除了找到“好”项目以外，审慎调查的严谨性也是非常关键的&rdquo;</p>
									</blockquote>
								</div>
							</div>
							<div class="item">
								<div class="testimony-slide active text-center">
									<figure>
										<img src="images/user-1.jpg" alt="user">
									</figure>
									<span>John Doe, via <a href="#" class="twitter">Twitter</a></span>
									<blockquote>
										<p>&ldquo;Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
									</blockquote>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--        以下部分为找资金的广告        -->
<section class="stb-funding-ad container">
	<div class="container" >
            		
	</div>
</section>
<!--        以上部分为找资金的广告        -->



<?php include 'projects.php' ?>
   	
   	
   	
   	
 		<section class="stb-bg-setion" id="stb-service">
			<div class="container">
				<div class="">
					<div class="row">
						<div class="col-md-8 col-md-offset-2 text-center page-header stb-heading">
							<h1 class="h1">世投服务</h1>
							
						</div>
					</div>
						<div class="row">
							<div class="col-md-4 text-center">
								<div class="services">
									<div class="h1"><i class="glyphicon glyphicon-bell"></i></div>
									<strong class="h1"><a href="#">上市</a></strong>
									<p>Pro adiuvet, honesto foris liberiusque statuat theseo scribimus mererer percurri geometria.</p>
								</div>
							</div>
							<div class="col-md-4 text-center">
								<div class="services">
									<div class="h1"><i class="glyphicon glyphicon-screenshot"></i></div>
									<strong class="h1"><a href="#">法律服务</a></strong>
									<p>Pro adiuvet, honesto foris liberiusque statuat theseo scribimus mererer percurri geometria.</p>
								</div>
							</div>
							<div class="col-md-4 text-center">
								<div class="services">
									<div class="h1"><i class="glyphicon glyphicon-magnet"></i></div>
									<strong class="h1"><a href="#">投融资</a></strong>
									<p>Pro adiuvet, honesto foris liberiusque statuat theseo scribimus mererer percurri geometria.</p>
								</div>
							</div>
							<div class="col-md-4 text-center">
								<div class="services">
									<div class="h1"><i class="glyphicon glyphicon-tint"></i></div>
									<strong class="h1"><a href="#">帮助获取政府补贴</a></strong>
									<p>Pro adiuvet, honesto foris liberiusque statuat theseo scribimus mererer percurri geometria.</p>
								</div>
							</div>
                            <div class="col-md-4 text-center">
								<div class="services">
									<div class="h1"><i class="glyphicon glyphicon-tint"></i></div>
									<strong class="h1"><a href="#">资产管理</a></strong>
									<p>Pro adiuvet, honesto foris liberiusque statuat theseo scribimus mererer percurri geometria.</p>
								</div>
							</div>
                            <div class="col-md-4 text-center">
								<div class="services">
									<div class="h1"><i class="glyphicon glyphicon-tint"></i></div>
									<strong class="h1"><a href="#">股权交易</a></strong>
									<p>Pro adiuvet, honesto foris liberiusque statuat theseo scribimus mererer percurri geometria.</p>
								</div>
							</div>
						</div>
					</div>
			</div>
		</section>
   	
   	
   	
	<!--=========================
		Start area for Sponsor
	============================== -->
	<section id="some_sponsor" class="section_padding sponsor_area container">
		<div class="sponsor_bg"></div>
		<div class="sponsor_overlay"></div>
		
		<!-- Start Sponsor slide -->
		<div class="container sponsor_inner">
			<div class="row">
				<div class="col-md-12">
					<h3>知名投资机构，可信赖的合作伙伴</h3>
					<div id="sponsor_slide" class="owl-carousel owl-theme">
						<div class="item"><img src="images/eivato.png" alt="" /></div>
						<div class="item"><img src="images/jquery.png" alt="" /></div>
						<div class="item"><img src="images/sass.png" alt="" /></div>
						<div class="item"><img src="images/less.png" alt="" /></div>
						<div class="item"><img src="images/jquery.png" alt="" /></div>
						<div class="item"><img src="images/eivato.png" alt="" /></div>
						<div class="item"><img src="images/eivato.png" alt="" /></div>
						<div class="item"><img src="images/jquery.png" alt="" /></div>
						<div class="item"><img src="images/sass.png" alt="" /></div>
						<div class="item"><img src="images/less.png" alt="" /></div>
						<div class="item"><img src="images/jquery.png" alt="" /></div>
						<div class="item"><img src="images/eivato.png" alt="" /></div>
					</div>
				</div>
			</div>
		</div>
		
	</section><!-- End of Sponsor Area -->   	

   	
   	
   	
   	
   	
<!--        以下部分为世投讲堂模块的内容        -->   

	
		
			
<div class="container"> <h2>世投讲堂</h2></div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8">
                <div class="">
                    <div class="embed-responsive embed-responsive-16by9" id="lecture-video">
                        <iframe class="embed-responsive-item" src="images/demo1.jpg"></iframe>
                    </div>
                    <div class="float">
                        <div id="lecture-slide" class="owl-carousel owl-theme">
                            
                                <div class="thumbnail"><img src="images/demo1.jpg" class="item" /></div>
                                <div class="thumbnail"><img src="images/demo11.jpg" class="item" /></div>
                                <div class="thumbnail"><img src="images/demo1.jpg" class="item" /></div>
                                <div class="thumbnail"><img src="images/demo11.jpg" class="item" /></div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
                <div class="notice-board">
                    <div class="panel panel-default">
                        <h4 class="h4">
                            讲堂公告
                                <a class="pull-right" href="#"><small>更多</small></a>
                        </h4>

                        <img class="img-responsive" src="images/demo2.jpg"/>
                        <strong><a href="">如何看待商业票据项目</a></strong>
                        <div class="panel-body">
                        <ul>
                            <li><a href="#"><span>微信微分销系统怎么提高微商城的市场盈利</span></a></li>
                            <li><a href="#"><span>保理公司是怎么操作的</span></a></li>
                            <li><a href="#"><span>价值投资的商业之道</span></a></li>
                            <li><a href="#"><span>如何选择投资机构呢</span></a></li>
                            <li><a href="#"><span>基金公司的成立条件和运作方式</span></a></li>
                            <li><a href="#"><span>2017经济年报反映了哪些内容</span></a></li>
                            <li><a href="#"><span>财务报表分析，需要注意哪些内容？</span></a></li>

                        </ul>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div> 
	
				


    
    
    
<!--        以下部分为世投讲堂模块的广告        -->
<section class="stb-invest-ad container">
	<div class="container">
		<div class="">
			
		</div>
	</div>
</section>
<!--        以上部分为世投讲堂模块的广告        -->
    
    
    

    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4">
                <div class="panel panel-default">
                    <h4 class="h4">
                        世投资讯
                        <em>
                            <a class="pull-right"
                             href="#"><small>更多</small><i></i></a>
                        </em>
                    </h4>
                    <img class="img-responsive" src="images/demo4.jpg"/>
                    <ul class="list-group">
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，这是新闻标题</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
                <div class="panel panel-default">
                    <h4 class="h4">
                        世投视角
                        
                            <a class="pull-right" href="#"><small>更多</small><i ></i></a>
                        
                    </h4>
                    <img class="img-responsive" src="images/demo5.jpg" />
                    <ul class="list-group">
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                        <li class="list-group-item"><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
                <div class="lt-tabs">

                    <div class="tabbable">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="tab111" data-toggle="tab">国内指数</a></li>
                            <li class=""><a href="tab112 " data-toggle="tab">国际指数动态</a></li>

                        </ul>

                        <div class="tab-content">
                            <div class="tab-pane" id="tab111">
                                <ul class="list-group">
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                </ul>
                            </div>
                            <div class="tab-pane" id="tab112">
                                <ul class="list-group">
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                    <li><a href="#"><span>这是新闻标题，一句话新闻动态</span><i>2016-06-16</i></a></li>
                                </ul>
                            </div>
  
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>





										
						



<?php include 'footer.php' ?>
	

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/jquery.countTo.js"></script>
<script type="text/javascript" src="js/jquery.waypoints.min.js"></script>
<script type="text/javascript" src="js/jquery.isotope.min.js"></script>
<script src="js/owl.carousel.js"></script>
<script type="text/javascript"	src="js/main.js"></script>
<script type="text/javascript" src="js/script.js"></script>
    <script type="text/javascript">
        var noticeimg = document.getElementById("noticeimg");
        var imgslider = document.querySelectorAll(".imgslider");
        var index = 0;
        for (var i = 0; i < imgslider.length; i++) {
            imgslider[i].index = i;
            imgslider[i].onclick = function () {
                index = this.index;
                var herf = imgslider[index].getAttribute('data-clstag');
                var src = imgslider[index].getAttribute('src');
                noticeimg.children[0].setAttribute('href', herf);
                noticeimg.getElementsByTagName("img")[0].setAttribute('src', src);
            }
        }






    </script>
</body>
</html>
