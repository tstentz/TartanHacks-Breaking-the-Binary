angular.module('starter.controllers', ['ngOpenFB'])

.controller('DashCtrl', function($scope) {
    console.log("hi");})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB, $window) {
  $scope.loginData = {};

  // currently redirects any user through to the app. 
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,public_profile,publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
              //$scope.closeLogin();
              $window.location.replace('#/tab/dash')
          } else {
              alert('Facebook login failed');
          }
      });
    };
})

.controller('GeoCtrl', function($scope, $ionicModal) {
      document.getElementById("map").style.height = "800px";
        var posOpts = {timeout: 10000, enableHighAccuracy: false};
        var latLng;
        var SSN1 = L.latLng(40.44112, -79.94247);
        var SSN2 = L.latLng(40.44234, -79.94461);
        var SSN3 = L.latLng(40.44172, -79.94646);
        var SSN4 = L.latLng(40.44323, -79.94224);
        var SSN5 = L.latLng(40.44333, -79.94225);
        var SSN6 = L.latLng(40.44290, -79.94218);

      function showPosition(position) {
            console.log(position.timestamp);
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map); 
            latLng = L.latLng(position.coords.latitude, position.coords.longitude);
        }

        function showError(error) {
            console.log("There was an error");
        }
        var obj = navigator.geolocation.getCurrentPosition(showPosition, showError, posOpts);
       L.accessToken = 'pk.eyJ1IjoidHN0ZW50eiIsImEiOiJjaWthc3I3b2kwbTNjdjlrdTdsZjVteGR3In0.DeiyyAsdV3HZdO3YvSA68g';
    // Replace 'mapbox.streets' with your map id.
      var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.accessToken, {
          attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
      });

      $ionicModal.fromTemplateUrl('templates/ping_request.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closePingRequest = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.ping_pop_up = function() {
        $scope.modal.show();
      };

      //Emergency Reporting
      $scope.emergencyReport = function() {
        console.log("Kappa Rho");
        doLogin();
      };

      //Personal Groups
      $scope.personalGroups = function() {
        console.log("Do good");
        doLogin();
      };

      //Nearest Available
      $scope.nearestAvailable = function() {
        console.log("Truth, courage, faith, power");
        doLogin();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };

      var map = L.map('map')
          .addLayer(mapboxTiles)
          .setView([40.442, -79.943], 17); 
      function onMapClick(e) {
        console.log(latLng);
        map.setView(latLng);
        
        }
      var circle1 = L.circleMarker(SSN1, { radius: 10, stroke: true,
              color: '#bd8cbf', weight: 5, opacity: 1, fill: true, fillColor:'#6a416b', fillOpacity: 1}).addTo(map);
      
      var circle2 = L.circleMarker(SSN2, { radius: 10, stroke: true,
              color: '#bd8cbf', weight: 5, opacity: 1, fill: true, fillColor:'#6a416b', fillOpacity: 1}).addTo(map);
      var circle3 = L.circleMarker(SSN3, { radius: 10, stroke: true,
              color: '#bd8cbf', weight: 5, opacity: 1, fill: true, fillColor:'#6a416b', fillOpacity: 1}).addTo(map);
      var circle4 = L.circleMarker(SSN4, { radius: 10, stroke: true,
              color: '#bd8cbf', weight: 5, opacity: 1, fill: true, fillColor:'#6a416b', fillOpacity: 1}).addTo(map);
      var circle5 = L.circleMarker(SSN5, { radius: 10, stroke: true,
              color: '#bd8cbf', weight: 5, opacity: 1, fill: true, fillColor:'#6a416b', fillOpacity: 1}).addTo(map);
      var circle6 = L.circleMarker(SSN6, { radius: 10, stroke: true,
              color: '#bd8cbf', weight: 5, opacity: 1, fill: true, fillColor:'#6a416b', fillOpacity: 1}).addTo(map);

      map.on('click', onMapClick);
      $timeout(ping_pop_up, 1000);

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});




