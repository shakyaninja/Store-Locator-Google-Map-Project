var map;
var markers = [];
var infoWindow;
var icons = [];
window.onload = () => {
  displayStores(); 
}

function initMap() {
  var lostAngeles = {
    lat: 34.063380, 
    lng: -118.358080};
    map = new google.maps.Map(document.getElementById('map'), {
        center: lostAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
            //for styling map
        styles:[
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#454e53"
              },
              {
                "visibility": "on"
              },
              {
                "weight": 5
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
}

function displayStores(){
  var storesHtml = '';
  for(var [index,store] of stores.entries()){
    var address = store['addressLines'];
    var phone = store['phoneNumber'];
    storesHtml += `
      <div class="store-container">
          <div class="store-info-container">
              <div class="store-address">
                  <span>${address[0]}</span> <br>
                  <span>${address[1]}</span>
              </div>
              <div class="store-phone-number">
                <span>${phone}</span> 
              </div>
          </div>
          <div class="store-number-container">
              <div class="store-number">
                  ${++index}
              </div>
          </div>
      </div>
    `
    document.querySelector('.stores-list').innerHTML = storesHtml;
    // console.log(store);
  }
}
// function for showing marker
function showStoresMarkers(){
  var bounds = new google.maps.LatLngBounds();
  for(var [index,store] of stores.entries()){

    var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]
      );
    var icon = ["./images/store_icon2.png","./images/store_icon3.png"];
    var name = store["name"];
    var address = store["addressLines"][0];
    var openStatus = store["openStatusText"];
    var phone = store["phoneNumber"];
    createMarker(latlng,name,openStatus, address,phone, index+1 ,icon[getRndInteger(0,1)]);
    bounds.extend(latlng);
  }
  map.fitBounds(bounds);
}

function createMarker(latlng, name, openStatus, address,phone, index, icons) {
  var html = ` <b>  ${name}  </b>
               <br/>            
                <span class="gray-small">${openStatus}</span>
                <hr/>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${latlng}" target="_blank">
                  <i class="fas fa-route info-icon"></i> ${address}
                </a>
                <br/>
                <i class="fas fa-phone-alt info-icon"></i> ${phone}
               `;
  // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    // label: index.toString(),
    // icon: iconBase + "parking_lot_maps.png"
    icon: icons
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}