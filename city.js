var getUrl = window.location;
var url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
var city = getUrlParameter('city');

$(document).ready(function(){
  loadHotel();
  loadCity();
});
function loadHotel(){  
  $.getJSON('hotel.json', function(data) {
    var html = "";
    $.each(data, function(increment, element){
      if(element.city.toLowerCase() == city){
        console.log(city);
        var star = '';
          for(var i=0; i<element.rating; i++){
            star += '<i class="fa fa-star"></i>';
          }
          html += '<div class="col-3 col-md-4 col-sm-6 col-xs-12">\
            <a href="'+url+'/hotel.html?id='+element._id+'" class="content__list__item">\
              <div class="content__list__item--image" style="background-image: url(\''+element.picture+'\')"></div>\
              <div class="content__list__item--title">\
                '+element.name+'\
              </div>\
              <div class="content__list__item--price">Rp. '+element.price+'</div>\
              <div class="content__list__item--star">'+star+'</div>\
            </a>\
          </div>';
          $('.content__list__item--container').html(html);
      }
    });
  });
}
function loadCity(){
  $.getJSON('city.json', function(data) {
    $.each(data, function(increment, element){
      if(element.url == city){
        $('.banner').css('background-image','url('+element.image+')');
        $('.banner--title').text(element.name);
      }
    });
  });
  
}