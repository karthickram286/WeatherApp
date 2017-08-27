var ip;
$(document).ready(function(){
  var apikey = "8b1012b90fe38fa35ec7b8f881c0aa36";
  var weatherkey = "5948d67048ff25ca";
  var lat;
  var long;
  var place;
  var weather;
  var fTemp;
  var cTemp;
  var tStatus = 0;
  $.getJSON("https://api.ipify.org/?format=json", function(address){
    ip = address.ip;
    var api = "https://freegeoip.net/json/";
    $.getJSON('https://freegeoip.net/json/'+ ip, function(coord){
      lat =  coord.latitude;
      long = coord.longitude;
      var api = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+apikey;
      $.getJSON(api, function(data){
        place = data.name + ", " + data.sys.country;
        $("#place").html(place);
        weather = data.weather[0].main;
        $("#weather").html(weather);
        fTemp = ((9/5)*(data.main.temp - 273) + 32).toFixed(1) + "&#8457";
        cTemp = (data.main.temp - 273).toFixed(1) + "&#8451";
        $("#temp").html(fTemp);
        $("#temp").click(function() {
          if(tStatus == 1) {
            $("#temp").html(fTemp);
            tStatus = 0;
          }
          else {
            $("#temp").html(cTemp);
            tStatus = 1;
          }
        });
        var imgurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var img = document.createElement("IMG");
        img.src = imgurl;
        $("#image").html(img);
      });
    });
  });
});