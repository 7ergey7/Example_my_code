function p_homenu_mover(){
    var p_e_src=event.target.src; if(p_e_src.indexOf('_s.png')==-1 && event.target.className!='hand выбран') event.target.src=p_e_src.substring(0,p_e_src.length-4)+'_s.png';}
function p_homenu_mout(){
    var p_e_src=event.target.src; if(p_e_src.indexOf('_s.png') > 0 && event.target.className!='hand выбран') event.target.src=p_e_src.substring(0,p_e_src.length-6)+'.png';}

//НАЧАЛО описание объекта и его методов - показать/закрыть/предыдущий/следующий - показывает щёлкнутую фотографию
//в крупном размере, но, если она не входит в область просмотра, то размер подгоняется под неё. просмотр можно
//закрыть, и есть листалка всех фото на странице (это методы prev и next).
var i_modalwindow_for_foto = {
    imwf_block: null,
    imwf_win: null,

    initBlock: function() {
       //создаём блокирующий фон - он создаётся каждый раз, т.к. условия просмотра могут измениться
       var parent = document.getElementsByTagName('body')[0]; //Получим первый элемент тега body
       var obj = parent.firstChild;                            //чтобы вставить наш блокирующий фон в самое начало тега body
       imwf_block = document.createElement('div');                 //Создаем элемент div
       imwf_block.id = 'i_blockscreen_for_foto';                              //Присваиваем ему наш ID
       parent.insertBefore(imwf_block, obj);                       //Вставляем в начало
       imwf_block.onclick = function() {i_modalwindow_for_foto.close();} //Добавим обработчик события по нажатию на блокирующий экран - закрыть модальное окно.
       imwf_block.style.display = 'inline';                         //CSS-свойство        
    },

    initWin: function(html, width, height, path, img_big, standart_size) {
       //создаётся окно для фото - тоже каждый раз, т.к. могут меняться условия
       var parent = document.getElementsByTagName('body')[0];
       var obj = parent.firstChild;
       imwf_win = document.createElement('div');
       imwf_win.id = 'i_modalwindow_for_foto';
       parent.insertBefore(imwf_win, obj);
       imwf_win.style.width = width + 'px';   //Установим ширину окна
       imwf_win.style.height = height + 'px'; //и высоту
       imwf_win.style.display = 'inline';     //Зададим CSS-свойство
       imwf_win.innerHTML = html;             //Добавим нужный HTML-текст в наше диалоговое окно
       //контейнер для отображения фото, кнопки: закрыть, предыдущая, следующая (листалка).
       var i_img_big_conteiner = document.getElementById('i_img_big_conteiner');
       var imwf_winclose = document.getElementById('imwf_winclose');
       var imwf_winprevfoto = document.getElementById('imwf_winprevfoto');
       var imwf_winnextfoto = document.getElementById('imwf_winnextfoto');
       //если места на экране хватает (можно вывести фото стандартного размера)
       if(standart_size=='Y') {
          //Установим позицию по центру экрана
          imwf_win.style.left = '50%'; //Позиция по горизонтали
          imwf_win.style.top = '50%';  //Позиция по вертикали
          //Выравнивание по центру путем задания отрицательных отступов
          imwf_win.style.marginTop  = -(height / 2) + 'px';
          imwf_win.style.marginLeft = -(width  / 2) + 'px';
       }
       //форматирование контейнера и кнопок
       i_img_big_conteiner.style.cssText='width:'+(width-2)+'px; height:'+(height-2)+'px; background:url("img/img_home/'+path+img_big+'.jpg") no-repeat; background-size: contain;';
       imwf_winclose.style.cssText='top:2px; left:'+(width-36)+'px;';
       imwf_winprevfoto.style.cssText='top:'+((height-2)/2-17)+'px; left:2px;';
       imwf_winnextfoto.style.cssText='top:'+((height-2)/2-17)+'px; left:'+(width-24)+'px;';
       
       var p_1_img = document.getElementById('p_1_img'); //первое (главное) фото на странице
       var p_imglist = p_1_img.getAttribute('data-p_imglist'); //список всех фото на странице
       var p_imglist_arr=p_imglist.split(','); //из списка создаётся массив имён фсех фотограифй
       //при нажатии на кнопки срабатывают соотв. процедуры
       imwf_winclose.onclick = function() { i_modalwindow_for_foto.close(); }
       imwf_winprevfoto.onclick = function() { img_big=i_modalwindow_for_foto.prev(p_imglist_arr,path,img_big,i_img_big_conteiner,width,height); }
       imwf_winnextfoto.onclick = function() { img_big=i_modalwindow_for_foto.next(p_imglist_arr,path,img_big,i_img_big_conteiner,width,height); }
    },

    close: function() { //закрытия окна просмотра фото - удаляется блокирующий фон и окно 
       var pimwf_block=document.getElementById('i_blockscreen_for_foto');
       pimwf_block.parentNode.removeChild(pimwf_block);
       var p_modal=document.getElementById('i_modalwindow_for_foto');        
       p_modal.parentNode.removeChild(p_modal);
    },

    prev: function(p_arr, path, p_img_curr, p_conteiner, p_width, p_height) { //предыдущее фото по списку
       var p_arr_l=p_arr.length;
       for(var i=0; i<p_arr_l; i++) {
          if(p_arr[i]==p_img_curr) { //в массиве ищется положение текущего фото и пока оно >0 - берётся предыдущее
             if(i>0) p_img_curr=p_arr[i-1]; else p_img_curr=p_arr[p_arr_l-1]; //а если 0 - переходит на последнее
             break; //т.е. по кругу на лево
          }
       }
       p_conteiner.style.cssText='width:'+(p_width-2)+'px; height:'+(p_height-2)+'px; background:url("img/img_home/'+path+p_img_curr+'.jpg") no-repeat; background-size: contain;';
       return p_img_curr;
    },
    
    next: function(p_arr, path, p_img_curr, p_conteiner, p_width, p_height) { //следующее фото
       var p_arr_l=p_arr.length; //здесь всё так же, только по кругу на право
       for(var i=0; i<p_arr_l; i++) {
          if(p_arr[i]==p_img_curr) {
             if(i<p_arr_l-1) p_img_curr=p_arr[i+1]; else p_img_curr=p_arr[0];
             break;
          }
       }
       p_conteiner.style.cssText='width:'+(p_width-2)+'px; height:'+(p_height-2)+'px; background:url("img/img_home/'+path+p_img_curr+'.jpg") no-repeat; background-size: contain;';
       return p_img_curr;
    },

    show: function(html, path, img_big, width, height) { //показ фото
       if(width==undefined) width=702;
       if(height==undefined) height=527;
       var p_html = document.documentElement;
       var p_viewport_w=p_html.clientWidth;  //длина видимой части
       var p_viewport_h=p_html.clientHeight; //высота
       if(p_viewport_w>=width && p_viewport_h>=height) standart_size='Y'; //если места хватает
       else {standart_size='N'; width=p_viewport_w; height=p_viewport_h;} //иначе
       //инициализация фона и окна
       i_modalwindow_for_foto.initBlock();
       i_modalwindow_for_foto.initWin(html, width, height, path, img_big, standart_size);
    }
}//Конец описания нашего объекта
