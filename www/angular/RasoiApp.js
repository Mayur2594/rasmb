
var RasoiApp = angular.module("RasoiApp", ['ngSanitize', 'ui.bootstrap', 'ngCordova','ngStorage']);
RasoiApp.controller('rasoiController', function($scope, $http,$window,$timeout,$cordovaGeolocation, $cordovaFacebook, $localStorage,
  $sessionStorage) {  

         
          document.addEventListener("deviceready", onDeviceReady, false);
          function onDeviceReady() {
            M.AutoInit();
          }






      $scope.formatedaddress = "Wait while getting your address from gps, do not turn off gps."
      $scope.address = true;
   
    // function geocodeLatLng(geocoder,position) {
    //     var latlng = {lat: parseFloat(position.lat), lng: parseFloat(position.long)};
    //     geocoder.geocode({'location': latlng}, function(results, status) {
    //       if (status === 'OK') {
    //         if (results[0]) {
    //           M.toast({html: results[0].formatted_address})
              
    //           $scope.address = false;
    //           $scope.formatedaddress = results[0].formatted_address;
    //           $scope.$apply();
    //         } else {
    //           alert('No results found');
    //         }
    //       } else {
    //         alert('Geocoder failed due to: ' + status);
    //       }
    //     });
    //   }
$scope.successinlocation = true;
$scope.LocationCaptured = false;
     

$scope.getaddressDetails = function(positiondata)
{

  $http({
    method  : 'POST',
  url     : 'http://103.252.7.5:8821/api/GetAddress',
  data    : positiondata,
  headers : {'Content-Type': 'application/json'} 
})
.then(function(response) {
  
  if(response.data.status === 1)
  {
    $window.localStorage["AddressDetails"] = JSON.stringify(response.data);
   M.toast({html: response.data.address})
  
   $scope.address = false;
   $scope.successinlocation = false;
   $scope.LocationCaptured = true;
        
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: positiondata.lat, lng: positiondata.long},
    zoom: 14
  });

  var marker = new google.maps.Marker({
    position: {lat: positiondata.lat, lng: positiondata.long},
    map: map,
    animation: google.maps.Animation.DROP,
    title: response.data.address,
    icon: './img/location.png'
  });
   $scope.formatedaddress = response.data.address;
  }
  if(response.data.status === 0){
    swal({
      title: "Opps!",
      text: response.data.message,
      type: "error"
    }, function() {
      location.reload();
    });
  }
}); 

   

};


    $scope.CaptuetCurrentLocation = function()
    {
      //var geocoder = new google.maps.Geocoder;


       var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
           .getCurrentPosition(posOptions)
           .then(function (position) {
             var lat  = position.coords.latitude
               var long = position.coords.longitude
               var getpossition = {lat:lat,long:long};


              //   var url =  "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=" + lat + ","+ long + "&mode=retrieveAddresses&maxresults=1&gen=9&app_id=Z5by6MlFisBCnYsNzvdM&app_code=lYxTw1xu6lj0EclSyTCntg"

              //      $http({
              //        method: 'GET'
              //        , url: url
              //       , dataType: 'jsonp',
              //  }).then(function (response) {
              //    if(response.data.Response.View[0])
              //    {
              //       var formatedaddress = response.data.Response.View[0].Result[0].Location.Address.Label+","+response.data.Response.View[0].Result[0].Location.Address.PostalCode;
              //       app.toast.show({
              //         text: 'Latitude: '          + lat         + '\n' +
              //         'Longitude: '         +long         + '\n'+
              //         'Address: '+ formatedaddress+'.',
              //       });
              //       return $scope.formatedaddress = formatedaddress;

              //   }
              //  });
              // geocodeLatLng(geocoder,getpossition)



              // temperory commented
              $scope.getaddressDetails(getpossition)

             }, function(err) {
               // error
             });   
    };



    //TABS CODE FOR MOBILE


    $scope.Sliderimage = function()
    {    
      var output = '<div class="carousel carousel-slider">';
      $scope.slidersOnject = [
		  {id:1,images:"img/food_img/1.jpg"},
		  {id:2,images:"img/food_img/2.jpg"},
		  {id:3,images:"img/food_img/3.jpg"},
		  {id:4,images:"img/food_img/4.jpg"},
		  {id:5,images:"img/food_img/5.jpg"},
		  {id:6,images:"img/food_img/6.jpg"},
		  {id:7,images:"img/food_img/7.jpg"},
		  {id:8,images:"img/food_img/8.jpg"},
		  {id:9,images:"img/food_img/9.jpg"},
		  {id:10,images:"img/food_img/10.jpg"}
    ];
    
	  $scope.slidersOnject.map(function(value,index){
		   output += ' <a class="carousel-item" href="#'+index+'!" ><img src="'+value.images+'" class="img-thumbnail fixsize"></a>'
    });
    
    output += ' </div>';
	  document.getElementById('carosel').innerHTML = output;
 
   $('.carousel.carousel-slider').carousel({
     fullWidth: true
  });
   
  autoplay();
  function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 7500);
  };
    };
    
if($window.localStorage["AddressDetails"])
{
  $scope.selectedaddress = JSON.parse($window.localStorage["AddressDetails"]).address
}

    $scope.getNearestRestrorents = function()
    {
      $http({
        method  : 'POST',
      url     : 'http://103.252.7.5:8821/api/mobile/getNearestRestrorents',
      //data    :  $window.localStorage["AddressDetails"],
      data:{"status":1,"lat":19.2262937,"lon":72.9649264,"address":"PN-144, MHADA Colony, Thane West, Thane, Maharashtra 400610, India"},
      headers : {'Content-Type': 'application/json'} 
    })
    .then(function(response) {
      $scope.RestaurentsList = response.data;
    });
    };


    $scope.FunctionofHomeTab = function()
    {
      
      $scope.Sliderimage();
      $scope.getNearestRestrorents();

    };


  

$scope.getMyCart = function()
{
  console.log('getMyCart')
}

$scope.getMyProfile = function()
{
  console.log('getMyProfile')
}
$scope.getMynerestRetrofoods = function()
{
  console.log('getMyCart')
}
    // TABS CODE FOR MOBILE


   

    $scope.SaveAddressAtLocal = function(address,type)
    {
      $window.localStorage["AddressType"] = type;
      // $localStorage.AddressType = type;
      location.href="./Home.html";
    };
   

    $scope.OffersSlider = function()
    {
		 $http({
                      method: 'GET'
                      , url: 'http://103.252.7.5:8821/api/mobile/getOffers'
                     , dataType: 'jsonp',
                }).then(function (response) {
					console.log(response.data)
			  });				  
    };
  
    $('ul.tabs').tabs();
   

    $scope.Likerestro = function(elmid,restroid)
    {

      $http({
        method: 'GET'
        , url: 'http://103.252.7.5:8821/api/mobile/Likerestro/'+restroid
       , dataType: 'jsonp',
      }).then(function (response) {
      console.log(response.data)
      });		


        var elm = document.getElementById(elmid);
        elm.innerHTML = 'favorite';
    };
    
});