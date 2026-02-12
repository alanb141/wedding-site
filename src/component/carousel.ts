import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide-core.min.css'
import { isMobile } from '../utils/device';

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * i) + 1;
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function Carousel(containerId: string) {
    const container = document.createElement('div');
    container.className = "main_dark";
    container.id = containerId;

    const render = () => {
        const desktopModules = import.meta.glob('../assets/images/desktop/*.*', {
            eager: true,
            query: '?url',
            import: 'default'
        });
        
        const mobileModules = import.meta.glob('../assets/images/mobile/*.*', {
            eager: true,
            query: '?url',
            import: 'default'
        });
        const mainUrl = isMobile() ? '/assets/m1.webp' : '/assets/d1.webp';
        const chosenModules = isMobile() ? mobileModules : desktopModules;
        const defaultImageUrls = Object.values(chosenModules) as string[];
        const filteredUrls = defaultImageUrls.filter(url => !url.includes('m1.webp') && !url.includes('d1.webp'));
        const imageUrls = [mainUrl, ...shuffleArray([...filteredUrls])];

        const hasSubmitted = !!localStorage.getItem(`guest_submitted`);

        container.innerHTML = `
            <div class="carousel_msg">
                <div class="top_msg">
                    <h1>Alan &#38; Ava</h1>
                    <p>17<span class="ordinal">th</span> October, 2026 | Ballina</p>
                    ${!hasSubmitted ? `<div id="trigger_rsvp_form" class="rsvp_btn">RSVP</div>` : ``}
                </div>
            </div>
            <section class="splide">
                <div class="splide__track">
                        <ul class="splide__list">
                            ${imageUrls.map((url, i) => `
                                <li class="splide__slide">
                                    <img
                                        src="${url}"
                                        alt="Carousel Image"
                                        width=${isMobile() ? "721" : "1300" }
                                        height=${isMobile() ? "1397" : "950" }
                                        ${i === 0 ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}
                                    />
                                </li>
                            `).join('')}
                        </ul>
                </div>
            </section>
        `;
        setTimeout(() => {
            const splideElement = container.querySelector('.splide');
            if (splideElement) {
                new Splide(splideElement as HTMLElement, {
                    type: 'fade',
                    autoplay: true,
                    interval: 4500,
                    arrows: false,
                    rewind: true,
                    pagination: false
                }).mount();
            }
        }, 0);
    }
    window.addEventListener('rsvp_submitted', render);
    render();
    return container;
}