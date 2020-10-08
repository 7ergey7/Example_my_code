//Главные функции: кнопок меню и всех ссылок в шапке и некоторых постоянных ссылок в боковой панеле.
var i_e_hd; var i_currpage='';
function i_get_PS() {
  //получение текущих постоянно используемых данных для вывода её при авторизации и выходе
  i_e_hd = document.getElementById('i_hidden_data');
  i_currpage = i_e_hd.getAttribute('data-i_currpage');
}
//Переход по небольшим ссылкам (здесь переход к заявкам для Родителей и Студентов)
function i_golink(p_page) {
  document.forms['i_uniforma'].page.value=p_page;
  document.forms['i_uniforma'].submit();
}

//открытие в новом окне (уже не помню, но кажется это вывод какого-то сообщения-подсказки или небольшого меню)
function i_opennewin_contmenu(pp_e,pp_w,pp_h,pp_ie,pp_du) {
  if(!document.getElementById('icme_modalwindow')) { //если окно уже открыто, чтобы не открывал копии
  //получение вьюпорта (видимой части окна браузера), и координат щелчка мыши, с учётом прокрутки и без
  var i_html = document.documentElement;
  var i_viewport_w=i_html.clientWidth;  //длина видимой части
  var i_viewport_h=i_html.clientHeight; //высота
  var i_scroll_X=window.pageXOffset;    //расстояние до левого края экрана с учётом прокрутки
  var i_scroll_Y=window.pageYOffset;    //до верхнего
  var i_clX=pp_e.clientX;  //расстояние в пикселях от левого края экрана
  var i_clY=pp_e.clientY;  //верхнего
  var i_pageX=pp_e.pageX;  //..страницы
  var i_pageY=pp_e.pageY;
  var i_showX=i_showY=-1;
  //корректировка положения и размеров блока сообщения в зависимости от того где нажато и влезает ли оно
  if(i_viewport_w<(pp_w+20)) {pp_w=i_viewport_w-20; i_showX=i_scroll_X+10;} //если переданный размер заведомо > (<)
  if(i_viewport_h<(pp_h+20)) {pp_h=i_viewport_h-20; i_showY=i_scroll_Y+10;}
  if(i_showX==-1) {if(i_clX+pp_w<i_viewport_w) i_showX=i_pageX;     //если места хватает, то сообщение выводится с того
                   else {if(i_clX>pp_w) i_showX=i_pageX-pp_w;       //места, где щёлкнуто, иначе до него, но тоже, если 
                         else i_showX=i_scroll_X+i_viewport_w-pp_w;}}      //хватит места, иначе с минимальным смещением влево
  if(pp_du=='d')  { //сначала внизу, потом, насколько возможно внизу
     if(i_showY==-1) {if(i_clY+pp_h<i_viewport_h) i_showY=i_pageY; //и так же по высоте.
                      else i_showY=i_scroll_Y+i_viewport_h-pp_h;}} else
  if(pp_du=='u')  { //сначала вверху, потом, насколько возможно вверху
     if(i_showY==-1) {if(i_clY>pp_h) i_showY=i_pageY-pp_h;
                      else i_showY=i_scroll_Y+pp_h;}} else
  if(pp_du=='du') { //сначала внизу, потом вверху, потом, насколько возможно внизу
     if(i_showY==-1) {if(i_clY+pp_h<i_viewport_h) i_showY=i_pageY;
                      else {if(i_clY>pp_h) i_showY=i_pageY-pp_h;
                            else i_showY=i_scroll_Y+i_viewport_h-pp_h;}}} else
  if(pp_du=='ud') { //сначала вверху, потом внизу, потом, насколько возможно, вверху
     if(i_showY==-1) {if(i_clY>pp_h) i_showY=i_pageY-pp_h;
                      else {if(i_clY+pp_h<i_viewport_h) i_showY=i_pageY
                            else i_showY=i_scroll_Y+pp_h;}}}
  //Создаётся окно сообщения
  var icme_parent=document.getElementsByTagName('body')[0]; //Получим первый элемент тега body
  var icme_obj=icme_parent.firstChild;                       //чтобы вставить наш блокирующий фон в самое начало тега body
  icme_win=document.createElement('div');
  icme_win.id='icme_modalwindow';
  icme_win.style.padding='3px 3px';
  icme_win.style.cssText='position:absolute; background:#eeeeee; border:1px solid #bbbbbb; box-shadow:-1px -1px 3px #000000; z-index:11;';
  icme_parent.insertBefore(icme_win, icme_obj);
  //его длина, высота и общая структура
  icme_win.style.width = pp_w + 'px';   //Установим ширину окна
  icme_win.style.height= pp_h + 'px';  //и высоту
  icme_win.style.display='inline';   //Зададим CSS-свойство
  icme_win.innerHTML='<div style="width:100%; height:'+(pp_h-26)+'px; font:11px/1.2 Verdana,Tahoma,Arial; color:#000000; background:#f9f9f9; padding:2px 2px 2px 2px; text-align:center; vertical-align:top; overflow-y:auto;"><p style="height:100%; width:100%; padding-top:12px; background-color:#eeeeee; cursor:hand; cursor:pointer;" id="icme_fnw">В новом окне?</p></div> \
                      <div style="width:100%; height:24px; font:bold 11px/1 Verdana,Tahoma,Arial; color:#ffffff; background:#bbbbbb; text-align:center; padding-top:6px; cursor:hand; cursor:pointer;" id="icme_x">закрыть</div>'; //Добавим нужный HTML-текст в наше диалоговое окно
  //выравнивание
  icme_win.style.left=i_showX + 'px'; //Позиция по горизонтали
  icme_win.style.top =i_showY + 'px'; //Позиция по вертикали
  //удаляется вместе с фоном по щелчку на кнопку закрытия
  var icme_x=document.getElementById('icme_x');
  icme_x.onclick=function() {icme_parent.removeChild(document.getElementById('icme_modalwindow'));}
  var icme_fnw=document.getElementById('icme_fnw');
  icme_fnw.onmouseover=function() {icme_fnw.style.backgroundColor='#dddddd';}
  icme_fnw.onmouseout=function() {icme_fnw.style.backgroundColor='#eeeeee';}
  icme_fnw.onclick=function() {document.i_uniforma.target='_blank'; pp_ie.click(); document.i_uniforma.target='_self'; }
  }
}

function mainlinks() {
  i_get_PS();

  document.getElementById('i_hd_tdnavs').oncontextmenu = function (){return false};
  document.getElementById('i_hd_tdorg').oncontextmenu  = function (){return false};
  //переходы по кнопкам и ссылкам на главной странице
  var i_e1 = document.getElementById('i_nav1_b1');
  i_e1.addEventListener('click',function(){ document.i_uniforma.page.value='nav1_about_us_our_work'; document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e1.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e1,'u');});
  var i_e2 = document.getElementById('i_nav1_b2');
  i_e2.addEventListener('click',function(){ document.i_uniforma.page.value='nav1_ideals';            document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e2.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e2,'u');});
  var i_e3 = document.getElementById('i_nav1_b3');
  i_e3.addEventListener('click',function(){ document.i_uniforma.page.value='nav1_usual_questions';   document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e3.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e3,'u');});
  var i_e4 = document.getElementById('i_nav1_b4');
  i_e4.addEventListener('click',function(){ document.i_uniforma.page.value='nav1_articles';          document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e4.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e4,'u');});
  var i_e5 = document.getElementById('i_nav2_b1');
  i_e5.addEventListener('click',function(){ document.i_uniforma.page.value='nav2_home';              document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e5.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e5,'d');});
  var i_e6 = document.getElementById('i_nav2_b2');
  i_e6.addEventListener('click',function(){ document.i_uniforma.page.value='nav2_armor';             document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e6.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e6,'d');});
  var i_e7 = document.getElementById('i_nav2_b3');
  i_e7.addEventListener('click',function(){ document.i_uniforma.page.value='nav2_news';              document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e7.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e7,'d');});
  var i_e8 = document.getElementById('i_nav2_b4');
  i_e8.addEventListener('click',function(){document.i_uniforma.page.value='nav2_contacts';           document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e8.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e8,'d');});
  var i_e9 = document.getElementById('i_img_organizations');
  i_e9.addEventListener('click',function(){document.i_uniforma.page.value='nav_for_organisations';   document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e9.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e9,'d');});
  var i_e10 = document.getElementById('i_img_7cvetik');
  i_e10.addEventListener('click',function(){document.i_uniforma.page.value='nav_for_organisations';  document.i_uniforma.submit(); if(document.getElementById('icme_modalwindow')) {document.getElementsByTagName('body')[0].removeChild(document.getElementById('icme_modalwindow'));}});
  i_e10.addEventListener('contextmenu',function(){i_opennewin_contmenu(event,100,55,i_e10,'d');});

  //Выделение кнопки при нажатии (простым снятием с неё ч/б фильтра)
  if(i_currpage=='nav1_about_us_our_work') {
     i_e1.setAttribute("style", "-webkit-filter:none"); i_e1.style.filter='none';}
  if(i_currpage=='nav1_ideals') {
     i_e2.setAttribute("style", "-webkit-filter:none"); i_e2.style.filter='none';}
  if(i_currpage=='nav1_usual_questions') {
     i_e3.setAttribute("style", "-webkit-filter:none"); i_e3.style.filter='none';}
  if(i_currpage=='nav1_articles') {
     i_e4.setAttribute("style", "-webkit-filter:none"); i_e4.style.filter='none';}
  if(i_currpage=='nav2_home' || i_currpage=='nav2_home_sleeping_room' || i_currpage=='nav2_home_green_room' ||
     i_currpage=='nav2_home_childrens_room' || i_currpage=='nav2_home_kitchen' || i_currpage=='nav2_home_toilet' || 
     i_currpage=='nav2_home_bathroom' || i_currpage=='nav2_home_balcony' || i_currpage=='nav2_home_corridor_vestibule' || 
     i_currpage=='nav2_home_our_district') {
     i_e5.setAttribute("style", "-webkit-filter:none"); i_e5.style.filter='none';}
  if(i_currpage=='nav2_armor') {
     i_e6.setAttribute("style", "-webkit-filter:none"); i_e6.style.filter='none';}
  if(i_currpage=='nav2_news' || i_currpage=='nav2_news_current') {
     i_e7.setAttribute("style", "-webkit-filter:none"); i_e7.style.filter='none';}
  if(i_currpage=='nav2_contacts') {
     i_e8.setAttribute("style", "-webkit-filter:none"); i_e8.style.filter='none';}
  if(i_currpage=='nav3_organizations') {
     i_e9.setAttribute("style", "-webkit-filter:none"); i_e9.style.filter='none';}
}
addEventListener('load',mainlinks);