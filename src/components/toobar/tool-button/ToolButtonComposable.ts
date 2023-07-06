import { ref, type Ref } from 'vue';
import type { MassObservables } from '@/components/hexagon-canvas/hexagon-classes/HexagonGrid';
import type { Observer } from '@/base-classes/Observable';
import type Hexagon from '@/components/hexagon-canvas/hexagon-classes/Hexagon';

export function useToolButtonComposable(observables: MassObservables, observer: Observer<Hexagon>, observableKeys: Array<keyof MassObservables>): {
  brushActivated: Ref<boolean>;
  toggle: () => void;
} {
  const brushActivated = ref(false);

  const toggle = () => {
    brushActivated.value = !brushActivated.value;
    if (brushActivated.value) {
      observableKeys.forEach(observableKey => { observables[observableKey].attach(observer) });
    } else {
      observableKeys.forEach(observableKey => { observables[observableKey].detach(observer) });
    }
  }

  return { toggle, brushActivated };
}
