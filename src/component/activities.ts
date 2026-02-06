import ceremonyImg from '../assets/images/rings_light.png';
import receptionImg from '../assets/images/cheers_light.png';
import dinnerImg from '../assets/images/dinner_light.png';
import danceImg from '../assets/images/dance_light.png';

export function Activities(containerId: string) {
    const container = document.createElement('div');
    container.className = "main_primary";
    container.id = containerId;
    container.innerHTML = `
        <div class="wedding_ceremony">
            <h2>What to expect</h2>
            <ul>
                <li><img src="${ceremonyImg}" alt="ceremony" /><span>13:30</span><p>Wedding Ceremony</p></li>
                <li><img src="${receptionImg}" alt="reception" /><span>14:45</span><p>Drinks Reception</p></li>
                <li><img src="${dinnerImg}" alt="dinner" /><span>17:00</span><p>Dinner</p></li>
                <li><img src="${danceImg}" alt="dance" /><span>19:00</span><p>Party Starts</p></li>
            </ul>
        </div>
    `;
    return container;
}