import { animate, motion, motionValue, useInView } from "framer-motion";
import MovingPage from "./MovingPage";
import { ReactNode, useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Index from "../../pages/Index";
import About from "../../pages/About";
import PagesGrid, { Direction, Grid } from "./utils";

const WIDTH = 3;
const HEIGHT = 3;
const PAGES_GRID_CONFIG: Grid<ReactNode> = [
  [null, { label: "about", element: <About id={"about"} /> }, null],
  [
    null,
    { label: "index center", element: <Index id={"index"} /> },
    { label: "index right", element: <Index id={"index3"} /> },
  ],
  [null, { label: "index down", element: <Index id={"index2"} /> }, null],
];

const PAGES_GRID = new PagesGrid(WIDTH, HEIGHT, PAGES_GRID_CONFIG);

const MainLayout = () => {
  const { width, height } = useWindowDimensions();
  const x = motionValue(-width);
  const y = motionValue(-height);
  const [isOpenContactForm, setIsOpenContactForm] = useState(false);

  useEffect(() => console.log(width, height), [width, height]);

  const handleMove = (dir: Direction) => {
    switch (dir) {
      case "UP":
        animate(y, y.get() + height, { type: "spring", bounce: 0 });
        break;
      case "DOWN":
        animate(y, y.get() - height, { type: "spring", bounce: 0 });
        break;
      case "LEFT":
        animate(x, x.get() + width, { type: "spring", bounce: 0 });
        break;
      case "RIGHT":
        animate(x, x.get() - width, { type: "spring", bounce: 0 });
        break;
    }
  };

  const pages: ReactNode[][] = PAGES_GRID.gridWithDirections.map(
    (gridRow, gridY) =>
      gridRow.map((gridCell, gridX) => {
        console.log(gridX, gridY);
        return (
          <div
            style={{ width: width, height: height }}
            key={`pages-grid-${gridX}-${gridY}`}
            className={`bg-black text-green-600 text-4xl text-center font-matrix selection:bg-green-600 selection:text-black`}
          >
            {gridCell && (
              <MovingPage
                directions={gridCell.directions}
                onMove={handleMove}
                id={`pages-grid-${gridX}-${gridY}`}
                pageWidth={width}
                pageHeight={height}
              >
                {gridCell.element}
              </MovingPage>
            )}
          </div>
        );
      })
  );

  return (
    <div style={{ height, width, overflow: "hidden" }}>
      <motion.div
        style={{ x, y, height: height * 3, width: width * 3 }}
        className="grid grid-cols-3 grid-rows-3 bg-black relative cursor-default"
      >
        {pages}
      </motion.div>
    </div>
  );
};

export default MainLayout;
