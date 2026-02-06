export function getGuest(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('invite');
}