export function Invite(containerId: string) {
    const container = document.createElement('div');
    container.className = "main_secondary";
    container.id = containerId;
    let timerInterval: number | null = null;

    const render = () => {
        if (timerInterval) clearInterval(timerInterval);

        const hasSubmitted = !!localStorage.getItem('guest_submitted');
        const weddingDate = new Date('2026-10-17T09:00:00').getTime();

        container.innerHTML = `
            <h2>We're getting married!</h2>
            <p>
            We're excited to celebrate our wedding this year and would love for you to attend!
            </p>
            ${hasSubmitted ? 
                `<div id="countdown" class="countdown_timer"></div>`
                :
                `<div class="rsvp_btn">RSVP</div>`
            }
        `;
        
        if (hasSubmitted) {
            const timerElement = container.querySelector('#countdown');
            const updateTimer = () => {
                const now = new Date().getTime();
                const distance = weddingDate - now;
                const oneDayInMs = 24 * 60 * 60 * 1000;
                
                if (distance <= 0 && distance > -oneDayInMs) {
                    if (timerElement) timerElement.innerHTML = "Today is the day! 🥂";
                    if (timerInterval) clearInterval(timerInterval);
                    return;
                } else if (distance < 0) {
                    if (timerElement) timerElement.innerHTML = "We're Married! ❤️";
                    if (timerInterval) clearInterval(timerInterval);
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (timerElement) {
                    timerElement.innerHTML = `<span>${days}d</span>:<span>${hours}h</span>:<span>${minutes}m</span>:<span>${seconds}s</span>`;
                }
            };

            updateTimer();
            timerInterval = window.setInterval(updateTimer, 1000);
        }
    }
    window.addEventListener('rsvp_submitted', render);
    render();
    return container;
}