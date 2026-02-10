export const markAsSubmitted = (storageKey: string, storageValue: string) => {
    localStorage.setItem(storageKey, storageValue);
    const event = new CustomEvent('rsvp_submitted');
    window.dispatchEvent(event);
};