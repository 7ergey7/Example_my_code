<? //страница одной щёлкнутой новости, куда в заголовке передаётся её id, по которому она выводится
if(isset($_POST["id_news"])) { $id_news=$_POST["id_news"]; } 
if(isset($_POST["nlist_news"])) { $nlist_news=$_POST["nlist_news"]; } 
else die("Что-то пошло не так. Не получилось вывести новость. Надеемся, разработчик узнает об этой ошибке и поправит.");

$q=$mysqli->prepare("SELECT date_format(dateadd,'%d.%m.%Y') dateadd,note,color,hnews,news 
                          FROM news WHERE id=?;");
$q->bind_param('i',$id_news);
$q->execute();
unset($row);	
$q->bind_result($row["dateadd"],$row["note"],$row["color"],$row["hnews"],$row["news"]);
$q->fetch();
if($row['note']<>'') $note=" &nbsp;<span style='color:#".$row['color'].";'>".$row['note']."</span>"; else $note="";
print "<article><div>".$row["dateadd"].$note."</div>
                <div><strong>".$row["hnews"]."</strong></div>
     		    <div>".$row["news"]."</div></article>
                <p id='p_back'><span id='p_arrow'><</span> <span id='p_back_txt' onClick='back_currnewslist()'>назад</span></p>";
print "<form name='p_form_news' method='post' action='index.php'>
        <input type='hidden' name='page' value=''>
	    <input type='hidden' name='fautz_who' value=''>
	    <input type='hidden' name='nlist_news' value='".$nlist_news."'>
       </form>";
$q->close();			
?>
