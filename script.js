let ipAddress = document.querySelector(".ip-r");
let region = document.querySelector(".location-r");
let time = document.querySelector(".timezone-r");
let serviceProvider = document.querySelector(".isp-r");
let button = document.querySelector(".btn");
let locationData = {};

//Adds the map and Marker
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmlsdGh5Y2FzdWFsIiwiYSI6ImNrZXUxc2llODFqMGcydXF4cDI5a3h3bDYifQ.RgoGTB1B7treZln9T1Qb-A'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);


//Searches for Ip and location on button click
button.addEventListener('click', ipLookUp)

function ipLookUp() {
    let search = document.querySelector(".search-bar").value;

    //Fetches searched IP and info
    fetch(`http://ip-api.com/json/${search}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: "query",
            regionName: "regionName",
            city: "city",
            lat: "lat",
            lon: "lon",
            timezone: "timezone",
            isp: "isp",
        })
    })
        .then(res => {
            return res.json()
        })

        //Places response data into empty object
        .then(data => locationData = data)
        .catch(error => alert('Please enter a valid ip address'))

        setTimeout(addLocation, 2000)
}

//Fetches user IP and info

fetch('http://ip-api.com/json/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: "query",
            regionName: "regionName",
            city: "city",
            lat: "lat",
            lon: "lon",
            timezone: "timezone",
            isp: "isp",
        })
    })
        .then(res => {
            return res.json()
        })
        .then(data => locationData = data)
        .catch(error => alert('Please enter a valid ip address'))


//Time delay to allow data to be passed into variables before displaying
setTimeout(addLocation, 2000)

function addLocation() {
    let ip = locationData.query
    let city = locationData.city;
    let regionName = locationData.regionName;
    let timezone = locationData.timezone;
    let isp = locationData.isp;

    //Displays search info
    ipAddress.innerHTML = ip;
    region.innerHTML = `${city}, ${regionName}`;
    time.innerHTML = timezone;
    serviceProvider.innerHTML = isp;


    //Changes Map and Marker location
    mymap.setView([locationData.lat, locationData.lon], 13);
    marker.setLatLng([locationData.lat, locationData.lon]).addTo(mymap);

}

