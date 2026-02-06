import './reset.css'
import './style.scss'
import { Carousel } from './component/carousel';
import { Rsvp } from './component/rsvp';
import { initMap } from './component/map';
import { Activities } from './component/activities';
import { Invite } from './component/invite';

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  app.appendChild(Carousel("splideCarousel"));
  app.appendChild(Invite("invite_msg"));
  app.appendChild(Rsvp('rsvp_form'));
  app.appendChild(Activities("schedule"));
  app.appendChild(initMap('map'));

  app.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const rsvpBtn = target.closest('.rsvp_btn');
    const closeRsvp = target.closest('#invite_mask');
    if (rsvpBtn || closeRsvp) {
      handleRSVPClick();
    }
  })
}
const handleRSVPClick = () => {
  const app = document.querySelector('#app');
  const form = document.querySelector('#rsvp_form');

  if (app && form) {
      form.classList.toggle('form_open');
      form.classList.toggle('form_closed');
  }
}