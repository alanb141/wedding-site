export function alternativeAccom(containerId: string) {
    const container = document.createElement('div');
    container.className = "main_primary";
    container.id = containerId;

    container.innerHTML = `
    <div class="alternative_location">
        <h2>Alternative places to stay</h2>
        <p>If the <strong>Great National Hotel</strong> is booked up or you would prefer somewhere closer to town, we have listed a couple of alternative hotels to stay. Please note, that there is no special rate when staying with any of these locations.</p>
        <p>Alternative transport will also be needed to get to the Great National Hotel from any of these options.</p>
        <ul>
            <li>
                <div>
                    <h3>The Diamond Coast Hotel</h3>
                    <a class="webLink" href="https://www.diamondcoast.ie/" target="_blank">Website</a>
                    <a class="altDirection" href="https://www.google.com/maps/dir/?api=1&destination=Diamond+Coast+Hotel,+Bartragh,+Enniscrone,+Co.+Sligo,+F26+E9F9" target="_blank">Directions</a>
                </div>
            </li>
            <li><hr></li>
            <li>
                <div>
                    <h3>Ballina Manor Hotel</h3>
                    <a class="webLink" href="https://www.ballinamanorhotel.ie/" target="_blank">Website</a>
                    <a class="altDirection" href="https://www.google.com/maps/dir/?api=1&destination=Ballina+Manor+Hotel,+Barrett+St,+Ballina,+Co.+Mayo,+F26+HY84" target="_blank">Directions</a>
                </div>
            </li>
            <li><hr></li>
            <li>
                <div>
                    <h3>The Moy Hotel</h3>
                    <a class="webLink" href="https://www.moyhotel.com/" target="_blank">Website</a>
                    <a class="altDirection" href="https://www.google.com/maps/dir/?api=1&destination=The+Moy+Hotel,+Main+St,+Foxford,+Co.+Mayo,+F26+X2V4" target="_blank">Directions</a>
                </div>
            </li>
        </ul>
    </div>
    `;
    return container;
}

// async function initAltMap() {
//     const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
//     const mapElement = document.querySelector("gmp-map") as google.maps.MapElement;
    
//     const venueLocations = [
//         { lat: 54.20436571734085, lng: -9.10327107058846, title: "The Diamond Coast Hotel", color: "#3d4e3d", border: "#fff", scale: 1, label: "A" },
//         { lat: 54.11256478678921, lng: -9.153821636918499, title: "Ballina Manor Hotel", color: "#3d4e3d", border: "#fff", scale: 1, label: "B" },
//         { lat: 54.08686879289913, lng: -9.163848822509467, title: "The Great National Hotel", color: "#fff", border: "#f848c7", scale: 1.5, label: "❤️" },
//         { lat: 53.98087385479496, lng: -9.114900982258137, title: "The Moy Hotel", color: "#3d4e3d", border: "#fff", scale: 1, label: "C" }
//     ];
// // f848c7
//     if (mapElement) {
//         const innerMap = mapElement.innerMap;
//         innerMap.setOptions({
//             mapTypeControl: false,
//         });
//         venueLocations.forEach(loc => {
//             // let glyphLabel = document.createElement("div");
//             // glyphLabel.classList.add('altLabel');
//             // glyphLabel.innerText = loc.title;
//             // let iconImage = new google.maps.marker.PinElement({
//             //     glyph: glyphLabel,
//             // });

//             const pinScale = new PinElement({
//                 scale: loc.scale,
//                 background: loc.color,
//                 borderColor: loc.border,
//                 glyphColor: loc.border,
//                 //@ts-ignore
//                 glyphText: loc.label
//             })
//             const newMarker = new AdvancedMarkerElement({
//                 position: {lat: loc.lat, lng: loc.lng},
//                 // map: innerMap,
//                 // content: iconImage.element
//             });
//             newMarker.append(pinScale);
//             mapElement.append(newMarker);
//         });
//     }
// }