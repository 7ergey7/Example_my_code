//просмотр высплывающих подсказок по щелчку в отдельной вкладке (для планшетов)
function i_opentitle_this_page(pp_e,pp_txt,pp_lj,pp_w,pp_h) {
  if(!document.getElementById('ite_modalwindow')) { //если окно уже открыто, чтоыб не открывал копии
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
  if(i_showY==-1) {if(i_clY+pp_h<i_viewport_h) i_showY=i_pageY;     //и так же по высоте.
                   else {if(i_clY>pp_h) i_showY=i_pageY-pp_h;
                         else i_showY=i_scroll_Y+i_viewport_h-pp_h;}}
  //Создаётся окно сообщения
  var ite_parent=document.getElementsByTagName('body')[0]; //Получим первый элемент тега body
  var ite_obj=ite_parent.firstChild;                       //чтобы вставить наш блокирующий фон в самое начало тега body
  ite_win=document.createElement('div');
  ite_win.id='ite_modalwindow';
  ite_win.style.padding='3px 3px';
  ite_win.style.cssText='position:absolute; background:#7ecb7a; border:2px solid #7ecb7a; border-radius:5px; -webkit-border-radius:5px; box-shadow:0 0 25px #000000; z-index:11;';
  ite_parent.insertBefore(ite_win, ite_obj);
  //его длина, высота и общая структура
  ite_win.style.width = pp_w + 'px';   //Установим ширину окна
  ite_win.style.height= pp_h + 'px';  //и высоту
  ite_win.style.display='inline';   //Зададим CSS-свойство
  //выравнивание
  ite_win.style.left=i_showX + 'px'; //Позиция по горизонтали
  ite_win.style.top =i_showY + 'px'; //Позиция по вертикали
  ite_win.innerHTML='<div style="width:100%; height:'+(pp_h-22)+'px; font:11px/1.2 Verdana,Tahoma,Arial; color:#000000; background:#c7ffbf; padding:1px 4px 0px 3px; text-align:'+pp_lj+'; vertical-align:top; overflow-y:auto; border-radius:6px; -webkit-border-radius:6px;">'+pp_txt+'</div> \
                     <div style="width:100%; height:18px; font:bold 11px/1 Verdana,Tahoma,Arial; color:#ffffff; background:#7ecb7a; text-align:center; padding-top:3px; border-bottom-left-radius:3px; -webkit-border-bottom-left-radius:3px; border-bottom-right-radius:3px; -webkit-border-bottom-right-radius:3px; cursor:hand; cursor:pointer;" id="ite_x">закрыть</div>'; //Добавим нужный HTML-текст в наше диалоговое окно
  //удаляется вместе с фоном по щелчку на кнопку закрытия
  var ite_x=document.getElementById('ite_x');
  ite_x.onclick=function() {ite_parent.removeChild(document.getElementById('ite_modalwindow'));}
  }
}
