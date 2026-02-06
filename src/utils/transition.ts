import { Splide, EventInterface } from '@splidejs/splide';
import type { Components, TransitionComponent } from '@splidejs/splide';

/**
 * Custom Transition Component for Splide
 */
export function MyTransition(
  splide: Splide, 
  components: Components
): TransitionComponent {
  const { bind } = EventInterface(splide);
  const { Move } = components;
  const { list } = components.Elements;

  let endCallback: (() => void) | undefined;

  function mount(): void {
    bind(list, 'transitionend', (e: TransitionEvent) => {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }

  function start(index: number, done: () => void): void {
    const destination = Move.toPosition(index, true);
    list.style.transition = 'transform 800ms cubic-bezier(.44,.65,.07,1.01)';

    Move.translate(destination);
    endCallback = done;
  }

  function cancel(): void {
    list.style.transition = '';
  }

  return {
    mount,
    start,
    cancel,
  };
}