const ipAddress = document.getElementById('ip-address')
const position = document.getElementById('location')
const timezone = document.getElementById('time-zone')
const isp = document.getElementById('isp')
const ipInput = document.getElementById('ip-input')
const arrowDiv = document.getElementById('arrow-div')
const apiKey = "at_spbr0WMNkHfdtTigHRFaQ6s72efRa"
const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`
let ip;
const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
let marker;
const customIcon = L.icon({
    iconUrl: 'images/icon-location.svg', 
    iconSize: [38, 38], 
    iconAnchor: [19, 38], 
    popupAnchor: [0, -38] 
});

var map = L.map('map').fitWorld();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

marker = L.marker([0, 0], {icon: customIcon}).addTo(map);
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

const getIp = async () => {
    const response = await fetch(apiUrl)
    const datas = await response.json()
    implementInfo(datas)
}

getIp()

const getInfo = async (ip) => {
    const response = await fetch(apiUrl + `&ipAddress=${ip}`)
    const datas = await response.json()
    implementInfo(datas)
}

function implementInfo(info) {
    ipAddress.textContent = info.ip
    position.textContent = info.location.city + ' ,' + info.location.region
    timezone.textContent =  info.location.timezone
    isp.textContent = info.isp
    map.setView([info.location.lat, info.location.lng], 10)
    marker.setLatLng([info.location.lat, info.location.lng]).bindPopup("You are within " + "  50 meters from this point").openPopup();
    circle.setLatLng([info.location.lat, info.location.lng])
}

arrowDiv.addEventListener('click', () => {
   enterIp()
})
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    enterIp()
  }
});


function enterIp() {
    let ip = ipInput.value.trim();
   if (!ipRegex.test(ip)) {
  alert('Please enter a valid IPv4 address.');
  return;
}
   getInfo(ip)
}






