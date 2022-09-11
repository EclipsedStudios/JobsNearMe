var map = L.map('map').setView([46.877, -96.7898], 13);

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
  
function showPosition(position) {
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;
    var google_map_pos = new google.maps.LatLng( lat, lang );
    var google_maps_geocoder = new google.maps.Geocoder();
    google_maps_geocoder.geocode({ 'latLng': google_map_pos },
        function( results, status ) {
            var result = results[5].formatted_address;
            var town = "Fargo, ND, USA";
            if(result === town){
                console.log("You are in Fargo, nice...")
                map.setView([lat, lang], 12);
            } else {
                alert("JobsNearMe only support the Fargo community at this time!")
                map.setView([46.877, -96.7898], 13);
            }
        }
    );

}

window.addEventListener('load', getLocation());

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Theme made with MapBox',
        maxZoom: 18,
        id: 'baker651/cl7wgpucy000d14lko080s486',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmFrZXI2NTEiLCJhIjoiY2w3d2dmZXA3MGxkdDNvcjlyYTFvdm9zcyJ9.OzQHMO9aONG13-dIglXAbQ'
}).addTo(map);


L.popup()
    .setLatLng([46.8459, -96.8570])
    .setContent("CI Sport is hiring!")
    .addTo (map);

L.popup()
    .setLatLng([46.8395, -96.86098])
    .setContent("Starbucks is hiring!")
    .addTo (map);

// Handle conversion of text address to coordinates
function geocodeAddress() {
    const geocoder = new google.maps.Geocoder();
    const address = document.getElementById("autocomplete").value;

    // Search for the address with the API
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            var value = results[0].geometry.location.toString();
            value = value.replace(/[\(\)]/g,'').split(',');
            console.log(value);
            map.setView([value[0], value[1]], 14)

            var popup = L.popup()
                .setLatLng([value[0], value[1]])
                .setContent("Here it is!")
                .openOn(map);
        } else {
            alert("Geocode error: " + status);
        }
    });}

function myFunction() {
    geocodeAddress();
}


