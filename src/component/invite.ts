export function Invite(containerId: string) {
    const container = document.createElement('div');
    container.className = "main_secondary";
    container.id = containerId;

    container.innerHTML = `
    <h2>We're getting married!</h2>
    <p>
    We're excited to celebrate our wedding this year and would love for you to attend!
    </p>
    <div class="rsvp_btn">RSVP</div>
    `;

    return container;
}