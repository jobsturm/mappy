type Map = string[][];

const colors = ['green', 'yellow', 'blue'];

export const map = [...Array(1000)].map(() =>
  [...Array(1000)].map(() => colors[Math.floor(Math.random() * colors.length)])
);

export const baseMap = [] as Map;