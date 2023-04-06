import {
  AnimatePresence,
  motion,
  motionValue,
  useAnimate,
} from "framer-motion";
import MovingPage from "./MovingPage";
import { ReactNode, useEffect, useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Index from "../../pages/Index";
import About from "../../pages/About";
import PagesGrid, { DirectionWithLabel, Grid } from "./utils";
import ContactMeForm from "../ContactMe/ContactMeForm";
import Dummy1 from "../../pages/Dummy1";
import Dummy2 from "../../pages/Dummy2";

const INDEX_LABEL = "index";
const GRID_WIDTH = 3;
const GRID_HEIGHT = 3;

const PAGES_GRID_CONFIG: Grid<ReactNode> = [
  [null, { label: "about", element: <About id={"up"} /> }, null],
  [
    { label: "dummy1", element: <Dummy1 id={"left"} /> },
    { label: INDEX_LABEL, element: <Index id={"index"} /> },
    { label: "dummy2", element: <Dummy2 id={"right"} /> },
  ],
  [null, { label: "dummy1", element: <Dummy1 id={"down"} /> }, null],
];

const PAGES_GRID = new PagesGrid(GRID_WIDTH, GRID_HEIGHT, PAGES_GRID_CONFIG);

const MainLayout = () => {
  const { width, height } = useWindowDimensions();

  const contactMeXIndex = (width: number) => width / 2 - 40;
  const contactMeYIndex = (height: number) => height / 2 + 70;
  const contactMeXNoIndex = (width: number) => width - 300;
  const contactMeYNoIndex = (height: number) => 100;
  const [isOpenContactForm, setIsOpenContactForm] = useState(false);

  const [x, setX] = useState(motionValue(-width));
  const [y, setY] = useState(motionValue(-height));

  const [contactMeX, setContactMeX] = useState(
    motionValue(contactMeXIndex(width))
  );
  const [contactMeY, setContactMeY] = useState(
    motionValue(contactMeYIndex(height))
  );

  const [scope, animate] = useAnimate();

  useEffect(() => {
    x.set(-width);
    y.set(-height);
    contactMeX.set(contactMeXIndex(width));
    contactMeY.set(contactMeYIndex(height));
  }, [width, height]);

  const handleMove = (dir: DirectionWithLabel) => {
    switch (dir.direction) {
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

    if (dir.label === INDEX_LABEL) {
      animate(contactMeX, contactMeXIndex(width));
      animate(contactMeY, contactMeYIndex(height));
    } else {
      animate(contactMeX, contactMeXNoIndex(width));
      animate(contactMeY, contactMeYNoIndex(height));
    }
  };

  // PAGES
  const pages: ReactNode[][] = PAGES_GRID.gridWithDirections.map(
    (gridRow, gridY) =>
      gridRow.map((gridCell, gridX) => {
        return (
          <div
            style={{ width: width, height: height }}
            key={`pages-grid-${gridX}-${gridY}`}
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
    <div
      style={{ height, width, overflow: "hidden" }}
      className="relative bg-black text-green-600 font-matrix selection:bg-green-600 selection:text-black cursor-default"
    >
      <AnimatePresence>
        {isOpenContactForm && (
          <motion.div className="absolute z-10 bg-black h-screen w-screen bg-opacity-50">
            <motion.div
              className="absolute z-10"
              style={{ x: width / 2 - 180, y: height / 2 - 275 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "tween" }}
            >
              <ContactMeForm
                onExit={() => setIsOpenContactForm(false)}
                onSubmit={() => null}
                visible={true}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* MAIN SECTION */}
      <motion.div
        ref={scope}
        style={{ x, y, height: height * 3, width: width * 3 }}
        className="grid grid-cols-3 grid-rows-3 bg-black relative cursor-default"
      >
        {pages}
      </motion.div>
    </div>
  );
};

export default MainLayout;
