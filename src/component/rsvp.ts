import { getGuest } from "../utils/url";

function syncRequiredFields (form: HTMLFormElement) {
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const dependentInput = cb.closest('div')?.querySelector('.condition_field input, .condition_field textarea') as HTMLInputElement;
        if (dependentInput) {
            dependentInput.required = cb.checked;
        }
    });
}

export function Rsvp(containerId: string) {
    const container = document.createElement('div');
    container.className = "main form_closed";
    container.id = containerId;
    const invite = getGuest() || "guest";
    const invite_array = invite.split("_");
    const invite_count = invite_array.length;
    
    let invite_thanks = invite_count < 2 ? invite_array[0] : `${invite_array[0]} & ${invite_array[1]}`;
    const storageKey = `guest_submitted`;
    const accessKey = import.meta.env.VITE_WEB3_FORM_ACCESS_KEY;
    
    if (localStorage.getItem(storageKey)) {
        container.innerHTML = `
        <div id="invite_mask"></div>
        <div id="success-box">
            <h2>Welcome back!</h2>
            <p>Your response for <b>${localStorage.getItem(storageKey)}</b> has already been received.</p>
        </div>`;
        return container;
    }
    container.innerHTML = `
    <div id="invite_mask"></div>
    <div class="invite_form">
        <h2>RSVP</h2>
        <form id="form" data-guests="${invite_count}">
            <input type="hidden" name="access_key" value="${accessKey}">
            <div>
                <label>Guest</label>
                <input type="text" name="main_guest" value="${invite_array[0]}" required>
            </div>
            <div id="guest_container">
                <label>Will ${invite_array[1] ?? 'plus one'} be joining you?</label>
                <input id="guest_check" type="checkbox" name="plus_one_check">
                <div id="plus_one" class="condition_field">
                    <label>Plus one</label>
                    <input type="text" id="plus_one_guest" name="plus_one_guest" value="${invite_array[1] ?? ''}">
                </div>
            </div>
            <div>
                <label>Any food allergies/preferences?</label>
                <textarea name="food"></textarea>
            </div>
            <div>
                <label>Do you have a song request?</label>
                <input id="song_check" type="checkbox" name="song_check">
                <div id="song_request" class="condition_field">
                    <label>Song request</label>
                    <textarea name="song_request"></textarea>
                </div>
            </div>
            <button type="submit" id="btn">Submit</button>
            <div id="result"></div>
        </form>
    <div>
    `;
    const songRequest = container.querySelector('#song_check') as HTMLInputElement;
    const plusOne = container.querySelector('#guest_check') as HTMLInputElement;
    if (plusOne) {
        plusOne.checked = invite_count > 1;
    }
    const form = container.querySelector('#form') as HTMLFormElement;
    syncRequiredFields(form);
    form.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.type === 'checkbox') {
            const wrapper = target.parentElement?.querySelector('.condition_field') || target.closest('div')?.nextElementSibling;

            if (wrapper) {
                const input = wrapper.querySelector('input, textarea') as HTMLInputElement || HTMLTextAreaElement;

                if (input) {
                    if(target.checked) {
                        input.required = true;
                    } else {
                        input.required = false;
                        input.setCustomValidity("");
                    }
                }
            }
        }
    });
    
    const result = container.querySelector('#result') as HTMLDivElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = container.querySelector('#btn') as HTMLButtonElement;

        btn.disabled = true;
        btn.innerText = "Sending...";

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        if (!plusOne.checked) {
            invite_thanks = invite_array[0];
            object.plus_one_guest = "";
        }
        if (!songRequest.checked) {
            object.song_request = "";
        }
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: json
            });

            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem(storageKey, invite_thanks);
                container.innerHTML = `
                    <div id="invite_mask"></div>
                    <div id="success-box">
                        <h2>Sent!</h2>
                        <p>Thanks for the RSVP, ${invite_thanks}!</p>
                    </div>
                `;
            } else {
                result.innerHTML = data.message;
                btn.disabled = false;
            }
        } catch (error) {
            result.innerHTML = "Something went wrong, reload and try again";
            btn.disabled = false;
        }
    });
    return container;
}