var getUrl = window.location;
var url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

$(document).ready(function(){
  $('.slider').slick({
  });
  loadHotel();

  $('.nav--search--js').on('keyup', function(){
    var searchField = this.value;
    var expression = new RegExp(searchField, "i");
    if(this.value != ""){ 
      $.ajax({
        type: 'GET',
        url: 'hotel.json',
        dataType: 'json',
        success: function (data){
          $.each(data, function(key, element){
            if (element.name.search(expression) != -1){
              var star = '';
              for(var j=0; j<element.rating; j++){
                star += '<i class="fa fa-star"></i>';
              }
              var html = '';
              html += '<div class="col-3 col-md-4 col-sm-6 col-sm-12">\
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
        }
        });
      }else{
        loadHotel();
      }
    });
    
});
function loadHotel(){
  $.ajax({
    type: 'GET',
    url: 'hotel.json',
    dataType: 'json',
    success: function (data){
      var html = '';
      $.each(data, function(index, element){
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
      });
    }
  });
}
function loadCity(){

}