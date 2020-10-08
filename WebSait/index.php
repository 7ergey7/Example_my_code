<?
  session_start(); //запуск сессии, и принятие (не из сессии, а просто со ссылок через отправку данных в заголовке...

  require("lp.php"); //файл с хостом, логином, паролем и названием базы, ниже они используются для подключения.
  $mysqli = new mysqli($host,$l,$p,$db);
  if($mysqli->connect_errno) {
     die("Не удалось соединиться с базой данных. Попробуйте зайти другим эксплорером или зайти попозже.");
  }
  $mysqli->query("SET NAMES 'utf8';"); //для вывода из базы в русском utf8
  
  //define("HEIGHTANKTEXT",90); //константа задаёт высоту текста в блоке <div...> в функции вывода анкеты. Т.к. эта высота изменяется кнопкой раскрытия/сворачивания, нужно передавать  вф-ю её изначальное значение. Лучше способа получить его я не нашёл. получить по месту - не удаётся, грузит поиск сильнее, сохранять в базе - так же и менее универсально, самое простое - константа в indexe - хотя и влияет на скорость всех страниц, но ничтожно, зато универсально и всегда под рукой.
  if(isset($_POST["page"])) { $page=$_POST["page"]; } else $page="nav2_news"; //... - имени страницы. Все страницы называются одинаково, отличается лишь назначение (.php, .js, .css, например: nav2_news - передаётся в заголовке, получаем и подгружаем nav2_news.css, nav2_news.js и nav2_news.php)
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <title>Друзья путешественника!</title>
    <meta charset="utf-8" />
    <meta name="description" content="Хорошая домашняя семейная гостиница в одном из самых приятных районов Иркутска! Можно приехать всей семьёй - квартира специально оборудованна для семьи с детьми, очень удобна и безопасна! Удобное расположение, транспортная развязка, есть всё что нужно! Добро пожаловать к нам!" />
    <meta name="keywords" content="гостиница, посуточная, посуточно, аренда, квартира, отель, аппартаменты, vip, люкс, качество" />
    <link rel="shortcut icon" href="img/img_index/icon.gif" type="image/x-icon" />
	<link rel="stylesheet" href="css/tfcommon.css" />
	<script src="js/main.js"></script>
	<? //подключаемые для определённых страниц
       //подсказки по щелчку:
       if($page=="nav1_about_us_our_work") {
    	  print "<script src='includes/opentitle_this_page.js'></script>"; }  
       //окно просмотра фотографий с листалкой фото:
       if(strpos(" ".$page, "nav2_home")>0) {
    	  print "<link rel='stylesheet' href='includes/for_modal_foto.css' />
	             <script src='includes/for_modal_foto.js'></script>"; }  
       //это css и js для загруженной страницы, а сама страница в части main
       print "<link rel='stylesheet' href='css/".$page.".css' />"; 
	   print "<script src='js/".$page.".js'></script>";
    ?>   
  </head> 
  <body>
   <!--универсальная форма, через которую осуществляется множество разных мелких передачь с разных страниц-->
   <form name="i_uniforma" method="post" action="index.php">
    <input type="hidden" name="page" value="">
	<input type="hidden" name="any" value="">
   </form>  
   <div id="i_wrapper">
      <header id="i_main_header">
	    <div id="i_h_picture"><img src="img/img_index/<? print mt_rand(1,7); ?>.jpg" id="i_h_pic"></div>
   	    <div id="i_h_wall" class="i_nbsp_min">&nbsp;</div>
   	    <div id="i_h_up">
          <a href="https://vk.com/travelfriends_irk" target="_blank"><img src="img/img_index/h_beauti_pic_with_balloon.jpg" id="i_img_baloon_tf"></a>
        </div>
   	    <div id="i_h_down">
		  <table align="left" valign="top" id="i_hd_table">
		  <tr><td id="i_hd_tdnavs" oncontextmenu="function (){return false};">
		  <nav id="i_nav1">
		    <ul>
			 <li id="i_nav1_b1"><img src="img/img_index/h_nav1b1.gif" id="i_img_nav1b1">
			 <li id="i_nav1_b2"><img src="img/img_index/h_nav1b2.gif" id="i_img_nav1b2">
			 <li id="i_nav1_b3"><img src="img/img_index/h_nav1b3.gif" id="i_img_nav1b3">
			 <li id="i_nav1_b4"><img src="img/img_index/h_nav1b4.gif" id="i_img_nav1b4">
			</ul>
		  </nav>
		  <nav id="i_nav2">
		    <ul>
			 <li id="i_nav2_b1"><img src="img/img_index/h_nav2b1.gif" id="i_img_nav2b1">
			 <li id="i_nav2_b2"><img src="img/img_index/h_nav2b2.gif" id="i_img_nav2b2">
			 <li id="i_nav2_b3"><img src="img/img_index/h_nav2b3.gif" id="i_img_nav2b3">
			 <li id="i_nav2_b4"><img src="img/img_index/h_nav2b4.gif" id="i_img_nav2b4">
			</ul>
		  </nav>
		  </td><td id="i_hd_tdorg" oncontextmenu="function (){return false};">
               <? $i_org12=mt_rand(1,2); 
                  print "<img src='img/img_index/7cvetik".$i_org12.".png' style='position:absolute; top:".(($i_org12==1) ? "47" : "49")."px; left:".(($i_org12==1) ? "83" : "33")."px; z-index:7; cursor:hand; cursor:pointer;' id='i_img_7cvetik'>"; ?>
               <img src="img/img_index/h_organizations<? print $i_org12; ?>.jpg" id="i_img_organizations">
          </td></tr>
		  </table>
        </div>
	</header>
	<div id="i_inf_content">
	  <div id="i_inf_content_tr">
	    <main role="main" id="i_inf_main">
        <div id="i_hidden_data" data-i_currpage="<? print $page; ?>"></div>
		 <?
		   require($page.".php");
	     ?>
	    </main>
	    <div id="i_inf_wall" class="i_nbsp_min">&nbsp;</div>
	    <aside id="i_inf_aside">
	    </aside>
	  </div>
	</div>
	</div>
  </body>
</html>
<? $mysqli->close(); ?>