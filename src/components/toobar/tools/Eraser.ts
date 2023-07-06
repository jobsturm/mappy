import Brush, { type BrushConfigurables } from './base/brush/Brush';
import { HEX_DEFAULT_COLOR } from '@/components/hexagon-canvas/hexagon-classes/Hexagon';
import BrushRadiusInput from './base/brush/components/BrushRadiusInput.vue';
import BrushColorInput from './base/brush/components/BrushColorInput.vue';

class Eraser extends Brush {
  configurables: BrushConfigurables;
  
  constructor() {
    super(HEX_DEFAULT_COLOR);
    this.configurables = {
      brushRadius: { value: 8, isPublic: true, inputComponent: BrushRadiusInput },
      color: { value: HEX_DEFAULT_COLOR, isPublic: false, inputComponent: BrushColorInput },
    }
  }
};

export default new Eraser();