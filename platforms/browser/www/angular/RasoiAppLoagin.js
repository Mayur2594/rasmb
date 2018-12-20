var RasoiApp = angular.module("RasoiApp", ['ngSanitize', 'ui.bootstrap', 'ngCordova','ngStorage']);


RasoiApp.controller('rasoiController', function($scope, $http,$window,$timeout,$cordovaGeolocation,  $localStorage,
  $sessionStorage) {  

	

          document.addEventListener("deviceready", onDeviceReady, false);
          function onDeviceReady() {
						M.AutoInit();
					 };
					 

					 
					 $scope.AuthCustomer = function(){

						$http({
							method  : 'POST',
						url     : 'http://103.252.7.5:8821/api/mobile/AuthCustomer',
						data:$scope.user,
						headers : {'Content-Type': 'application/json'} 
					})
					.then(function(response) {
						if(response.status === 0)
						{
						swal({
							title: response.data.title,
							text: response.data.message,
							type: response.data.type
						}, function() {
							location.href="Signin.html";
						});
						}
						else
						{
							console.log(response);
								$window.localStorage["mobile"] = response.data[0].mobile;
    		 					 $window.localStorage["username"] = response.data[0].name;
     						 $window.localStorage["userid"] = response.data[0].id;
 							location.href="Location.html";
						}
					});
			
					 };


					 $scope.NewMemberRegister = function(){

						$http({
							method  : 'POST',
						url     : 'http://103.252.7.5:8821/api/mobile/NewMemberRegister',
						data:$scope.user,
						headers : {'Content-Type': 'application/json'} 
					})
					.then(function(response) {
						swal({
							title: response.data.title,
							text: response.data.message,
							type: response.data.type
						}, function() {
							location.href="Signin.html";
						});
					});
					 };


					 $scope.NextToLocation = function()
					 {
					   var myVar = setTimeout(function(){ 
						 clearTimeout(myVar);
						 if($window.localStorage["mobile"] && $window.localStorage["userid"] && $window.localStorage["username"])
						 {
						   location.href="./Location.html"; 
						 }
						 else
						 {
						   location.href="./Signin.html"; 
						 }
						 
					   }, 6000);
					 };

});