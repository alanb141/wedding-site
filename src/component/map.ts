export function initMap(containerId: string) {
    const container = document.createElement('div');
    container.className = "main_secondary";
    container.id = containerId;

    container.innerHTML = `
    <div class="ceremony_location">
        <h2>Where is it happening?</h2>
        <p>Join us at the <strong>Great National Hotel</strong>, Ballina</p>
        <p>If you plan on staying at the Great National Hotel, let them know you are attending the wedding of Alan and Ava to get a special rate on the room.</p>
        <p>The hotel can be reached by phone on: (096) 23600</p>
    </div>
    <div class="directions-form">
        <div class="directions-group">
            <input id="origin-input" type="text" placeholder="Enter your location" />
            <button id="use-location-btn" title="Use current location">📍</button>
        </div>
        <div id="get-directions-btn">Get Directions</div>
    </div>
    <div>
        <a id="view-directions" href="https://www.google.com/maps/dir/?api=1&destination=Great+National+Hotel+Ballina,+Rathnaconeen,+Ballina,+Co.+Mayo,+F26+X5P3" target="_blank">View directions in maps</a>
    </div>
    <div id="weddingLocation"></div>
    `;
    initGoogleMap();

    return container;
}

async function initGoogleMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { DirectionsRenderer, DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;

    const mapContainer = document.getElementById('weddingLocation');
    const originInput = document.getElementById('origin-input') as HTMLInputElement;
    const directionsBtn = document.getElementById('get-directions-btn');
    const locationBtn = document.getElementById('use-location-btn');
    
    const venueLocation = { lat: 54.08697830637561, lng: -9.16583603131756 };

    if (mapContainer) {
        const map = new Map(mapContainer, {
            center: venueLocation,
            zoom: 14,
            gestureHandling: 'greedy'
        });

        // Directions
        const directionsRenderer = new DirectionsRenderer();
        directionsRenderer.setMap(map);

        const directionsService = new DirectionsService();

        const calculateRoute = (origin: string | google.maps.LatLngLiteral) => {
            directionsService.route(
                {
                    origin: origin,
                    destination: venueLocation,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === 'OK' && response) {
                        directionsRenderer.setDirections(response);
                    } else {
                        window.alert("Directions request failed due to " + status)
                    }
                }
            );
        }
        directionsBtn?.addEventListener('click', () => calculateRoute(originInput.value));
        locationBtn?.addEventListener('click', () => {
            if(!navigator.geolocation) {
                alert("Geolocation is not supported by your browser.");
                return;
            }
            locationBtn.innerText = "⌛";
            navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                originInput.value = "My Location";
                calculateRoute(userPos);
                locationBtn.innerText = "📍";
            },
            () => {
                alert("Unable to retrieve your location. Please type your address in manually.");
                locationBtn.innerText = "📍";
            });
        });
    }
}