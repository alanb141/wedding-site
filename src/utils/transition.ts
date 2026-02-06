import { Splide, EventInterface } from '@splidejs/splide';
// Use 'import type' for definitions that only exist in TypeScript
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
        // Removes the transition property
        cancel();

        // Calls the `done` callback
        endCallback();
      }
    });
  }

  function start(index: number, done: () => void): void {
    // Converts the index to the position
    const destination = Move.toPosition(index, true);

    // Applies the CSS transition
    // Note: You can customize the timing and easing here
    list.style.transition = 'transform 800ms cubic-bezier(.44,.65,.07,1.01)';

    // Moves the carousel to the destination
    Move.translate(destination);

    // Keeps the callback to invoke later
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