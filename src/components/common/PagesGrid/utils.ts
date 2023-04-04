export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface DirectionWithLabel {
  label: string;
  direction: Direction;
}

type GridElement<T> = T;

export interface GridElementWithLabel<T> {
  label: string;
  element: GridElement<T>;
}

export interface GridElementWithDirections<T> {
  directions: DirectionWithLabel[];
  element: GridElement<T>;
}

export type Grid<T> = (GridElementWithLabel<T> | null)[][];

const getGridWithDirections = <T>(
  width: number,
  height: number,
  grid: Grid<T>
) => {
  let y = 0;
  let gridWithDirections = Array.from(Array(height), () => new Array(width));
  console.log(grid);
  console.log("Directions array:", gridWithDirections);
  while (y < height) {
    let x = 0;
    while (x < width) {
      // ONLY DO THIS FOR NON-NULL CELLS
      if (grid[y][x]) {
        const dirs: DirectionWithLabel[] = [];
        const [up, down, left, right] = [
          grid[y - 1]?.[x],
          grid[y + 1]?.[x],
          grid[y][x - 1],
          grid[y][x + 1],
        ];
        up && dirs.push({ label: up.label, direction: "UP" });
        down && dirs.push({ label: down.label, direction: "DOWN" });
        left && dirs.push({ label: left.label, direction: "LEFT" });
        right && dirs.push({ label: right.label, direction: "RIGHT" });
        console.log("inner", dirs, x, y);
        gridWithDirections[y][x] = {
          directions: dirs,
          element: grid[y][x]?.element,
        };
      } else {
        gridWithDirections[y][x] = null;
      }
      x += 1;
    }
    y += 1;
  }
  return gridWithDirections;
};

export default class PagesGrid<T> {
  constructor(width: number, height: number, grid: Grid<T>) {
    this.width = width;
    this.height = height;
    this.grid = grid;
    this.gridWithDirections = getGridWithDirections(width, height, grid);
  }
  width;
  height;
  grid;
  gridWithDirections: GridElementWithDirections<T>[][];
}
