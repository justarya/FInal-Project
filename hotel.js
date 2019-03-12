$(document).ready(function(){
  loadHotel();

  $('.content__booking__form--night--js').on("keyup", function(){
    var price = $('.content__booking--price__number--js').attr('data-price');
    if(this.value != ""){
      var totalPrice = this.value * price; 
      $('.content__booking--price__number--js').html("Rp. "+ totalPrice);
      $('.content__booking--price__per').text('(Total Price)');
      $('.content__booking__form--price__number--js').val(totalPrice);
    }else{
      $('.content__booking--price__number--js').html("Rp. "+ price);
      $('.content__booking--price__per').text('per night');
      $('.content__booking__form--price__number--js').val(price);
    }
  });
});
function loadHotel(){
  var id = getUrlParameter('id');
  $.getJSON('hotel.json', function(data) {
    $.each(data, function(increment, element){
      if(element._id == id){
        $('.content__main--title--js').text(element.name);
        $('.content__main--place--js').html('<i class="fa fa-map-marker-alt"></i> '+element.address);
        var star = '';
        for(var j=0; j<element.rating; j++){
          star += '<i class="fa fa-star"></i>';
        }
        $('.content__main--star--js').html(star);
        $('.content__slider .slider').html('<div class="slider__item" style="background-image: url(\''+element.picture+'\'"></div>');
        $.each(element.facilities, function(i, element2){
          if(element2 == "AC"){
            var htmlFeature = '\
              <div class="content__feature--item">\
              <div class="content__feature--item--icon"><i class="fas fa-wind"></i></i></div>\
              <div class="content__feature--item--label">AC</div>\
              </div>';
          }else if(element2 == "Wifi"){
            var htmlFeature = '\
              <div class="content__feature--item">\
              <div class="content__feature--item--icon"><i class="fa fa-wifi"></i></i></div>\
              <div class="content__feature--item--label">Wifi</div>\
              </div>';
            }else if(element2 == "Pool"){
            var htmlFeature = '\
            <div class="content__feature--item">\
              <div class="content__feature--item--icon"><i class="fa fa-swimming-pool"></i></i></div>\
              <div class="content__feature--item--label">Swimming Pool</div>\
            </div>';
          }
          $('.content__feature--items--js').append(htmlFeature);
        });
        var price = element.price.replace(/,/g , '');
        $('.content__booking--price__number--js').html("Rp. "+element.price);
        $('.content__booking--price__number--js').attr("data-price",price);
        // $.each(element.picture, function(i, element2){
        //   var slider = '<div class="slider__item" style="background-image: url(\''+element2.image+'\'"></div>'
        // })
        // $('.content__slider .slider').html(slider);
      }
    });
  });
}