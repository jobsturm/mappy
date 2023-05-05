import { baseMap as map } from "@/api/generateMap";
import type { Observer } from "@/base-classes/Observable";
import type Hexagon from "@/components/hexagon-canvas/hexagon-classes/Hexagon";

export default function(color:string): Observer<Hexagon>  {
  return {
    update(hexagon: Hexagon) {
      const { x, y } = hexagon.getMapCoordinates();
      map[y] = map[y] || [];
      map[y][x] = color;
    }
  }
}
