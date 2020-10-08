<? //страница вывода новостей списком
$cnt_news_page=3; //кол-во новостей на листе
$size_td=26;      //размер ячейки для номера листа (ячейка квадратная, скруглённая - кружок)


$cnt=$mysqli->query("SELECT count(*) cnt FROM news 
                      WHERE dateadd between date_add(curdate(),interval -60 month) and curdate();", MYSQLI_USE_RESULT)->fetch_object()->cnt; //берём только новости за год
if($cnt>0){            //ceil округляет дробь в > сторону до следующего целого
   if($cnt>$cnt_news_page) { $countlist=ceil($cnt/$cnt_news_page); } 
   else $countlist=0;
}
else {die("<p class='i_anytext'>Извините, пока новостей нет.</p>");}

print "<form name='p_form_news' method='post' action='index.php'>
        <input type='hidden' name='page' value=''>
	    <input type='hidden' name='nlist_news' value=''>
	    <input type='hidden' name='id_news' value=''>
       </form>";

if(isset($_POST["nlist_news"])) { $nlist_news=$_POST["nlist_news"]; } else { $nlist_news=1; } //номер текущего листа
$l2=$cnt_news_page; $l1=($nlist_news-1)*$cnt_news_page; //с какой по какую новсти брать: второе значение - кол-во новостей - оно всегда равно кол-ву новостей на странице, а первое значение - первая новсть, с которой брать, -1 - т.к. они нумеруются с 0-ля.
$q=$mysqli->query("SELECT id,date_format(dateadd,'%d.%m.%Y') dateadd,note,color,hnews,shorttext 
                       FROM news 
			          WHERE dateadd between date_add(curdate(),interval -60 month) and curdate()
				 	  ORDER BY date_format(dateadd,'%Y%m%d') desc LIMIT ".(int)$l1.",".(int)$l2.";", MYSQLI_USE_RESULT); //берутся новости за последние 12 месяцев, в сортировке пришлось задать формат даты, иначе сортируется по цифре дней, потом месяцев и не правильно, а нужно по году и т.д., MYSQLI_USE_RESULT - чтобы запрос был небуферизированный (сразу выводились данные как взяты, без промежуточной записи в буфер (так быстрее, но это не всегда лучше, т.к. при большом объёме данных все остальные процессы ждут, а в буферезированных MYSQLI_STORE_RESULT запросах данные выводятся в фоне и страница может грузиться пока)
unset($row);	
while($row=$q->fetch_assoc()) { //вывод данных
  if($row['note']<>'') $note=" &nbsp;<span style='color:#".$row['color'].";'>".$row['note']."</span>"; else $note="";
  print "<article><div><span>".$row["dateadd"]."</span>".$note."</div>
                  <div><strong><span onClick='show_this_news(".$row["id"].",".$nlist_news.")'>".$row["hnews"]."</span></strong></div>
				  <div>".$row["shorttext"]."</div></article>"; //при щелчке на заголовок новости - переход на страницу просмотра этой новости - nav2_news_current.php
}
unset($row);

if($countlist>0) { //номера листов вывожу только если все новости не влазят на страницу ($countlist>0). Длина таблицы рассчитывается как сумма длин всех скруглённых ячеек с цифрами листов -($countlist-1)*2 -это ещё какие-то два странных отступа, на которые почему-то надо уменьшить -по одному на номер листа кроме последнего, я так и не понял в чём причина, но если этого не сдалеть, последующие (особенно последние) кружки становятся вытянутыми, а так они круги.
   $i=1;
   print "<table width=".($countlist*$size_td-($countlist-1)*2)." height=".$size_td." id='news_lists'><tr>";
   while($i<=$countlist) {
     if($i==$nlist_news) print "<td width=".$size_td." style='background:#a1d767;'>".$i."</td>";
                    else print "<td width=".$size_td." onClick='other_newslist(".$i.")'>".$i."</td>"; //при щелчке на другой лист
     $i++;  
   }
   print "</tr></table>";
}
$q->free();
?>
