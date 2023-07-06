import Color from 'Color';

const worldBuilderColors = [
  {
    id: "forrestGreen",
    color: Color("#228B22"),
    name: "Forrest Green",
    description: "A dark, rich green reminiscent of lush forests.",
  },
  {
    id: "grasslands",
    color: Color("#7CFC00"),
    name: "Grasslands",
    description: "A bright, vibrant green that represents open grasslands.",
  },
  {
    id: "desertSand",
    color: Color("#F5DEB3"),
    name: "Desert Sand",
    description: "A light, sandy color reminiscent of desert landscapes.",
  },
  {
    id: "oceanBlue",
    color: Color("#0077BE"),
    name: "Ocean Blue",
    description: "A deep, cool blue that represents the ocean and other bodies of water.",
  },
  {
    id: "mountainGrey",
    color: Color("#A9A9A9"),
    name: "Mountain Grey",
    description: "A neutral grey that can represent rocky mountains and cliffs.",
  },
  {
    id: "snowWhite",
    color: Color("#FFFFFF"),
    name: "Snow White",
    description: "A pure, bright white that represents snow and ice.",
  },
  {
    id: "sunsetOrange",
    color: Color("#FFA07A"),
    name: "Sunset Orange",
    description: "A warm, vibrant orange that represents the colors of a sunset.",
  },
  {
    id: "skyBlue",
    color: Color("#87CEEB"),
    name: "Sky Blue",
    description: "A light, airy blue that represents the sky and clouds.",
  },
  {
    id: "jungleGreen",
    color: Color("#2E8B57"),
    name: "Jungle Green",
    description: "A deep, rich green that represents the lush foliage of a jungle.",
  },
  {
    id: "canyonRed",
    color: Color("#FF7F50"),
    name: "Canyon Red",
    description: "A deep, earthy red that can represent canyons and other rocky formations.",
  },
];

function createColorObject(colors: { id: string; color: Color }[]) {
  return colors.reduce((obj, { id, color }) => {
    obj[id] = color.hex();
    return obj;
  }, {} as { [key: string]: string });
}

export const colorObject = createColorObject(worldBuilderColors);
export const colorArray = worldBuilderColors;
