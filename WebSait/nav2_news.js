function other_newslist(nl) { //просмотр другого списка новостей (под другим номером)
  document.p_form_news.page.value='nav2_news'; 
  document.p_form_news.nlist_news.value=nl; 
  document.p_form_news.submit();
}
function show_this_news(id,nl) { //подключение страницы одной новости
  document.p_form_news.page.value='nav2_news_current'; 
  document.p_form_news.nlist_news.value=nl; 
  document.p_form_news.id_news.value=id; 
  document.p_form_news.submit();
}