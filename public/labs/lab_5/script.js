function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const map = L.map('mapid')
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmFwZW5uaSIsImEiOiJja203ZTRkMDgweGgzMnVvZjEwYWtueXl2In0.vlqHcsHnEmcJth1_uGzcFw'
  }).addTo(map);
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const search = document.querySelector('#search');
  const filteredList = document.querySelector('#filteredList')
  const submitbutton = document.querySelector('#submit-button')
  let filteredPlaces = [];

  function findMatches(search, places) {
    return places.filter(place => {
      const regex = new RegExp(search, 'gi');
      return place.zip.match(regex)
    });
  }

  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }

  function displayMatches() {
    fetch('/api')
      .then(res => res.json())
      .then(json => {
        removeChildren(filteredList)
        filteredPlaces = []
        if (search.value !== "") {
          filteredPlaces = findMatches(search.value, json)
          filteredPlaces = filteredPlaces.slice(0,5)
          filteredPlaces.forEach(place => {
            filteredList.insertAdjacentHTML('beforeend', `<li class='card mt-4'>
              <div class="card-content">
              <div class="content">
              <p class="title is-3">${place.name}</p>
              <p class="subtitle is-5">${place.category}</p>
              <address>${place.address_line_1}<br/>${place.address_line_2}<br/>
                  ${place.city}, ${place.state}. ${place.zip}</address>
              </div>
              </div>
            </li>`)
          })
        }
        console.table(filteredPlaces)
        applyMarkers(mapObjectFromFunction)
      })
  }
  submitbutton.addEventListener('click', displayMatches)
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;