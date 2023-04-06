import {
  Variant,
  Variants,
  animate,
  motion,
  motionValue,
  useAnimate,
  useInView,
} from "framer-motion";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import MatrixElement, { MatrixEffect } from "../MatrixElement/MatrixElement";
import { Direction, DirectionWithLabel } from "./utils";

const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 lg:w-16 lg:h-16"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 lg:w-16 lg:h-16"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 lg:w-16 lg:h-16"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 lg:w-16 lg:h-16"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

interface Props {
  directions: DirectionWithLabel[];
  onMove: (dir: DirectionWithLabel) => void;
  id: string;
  pageWidth: number;
  pageHeight: number;
  children?: ReactNode;
}

const MovingPage = ({
  directions,
  onMove,
  id,
  pageWidth,
  pageHeight,
  children,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [opacity, _setOpacity] = useState(motionValue(0));
  const [content, setContent] = useState<ReactNode>();
  const [scope, animate] = useAnimate();

  const trigger = true;

  useEffect(() => {
    // Performance: Children only get rendered when page is in view.
    // Also allows for !re-rendering of childeren when page is back in view.
    isInView ? setContent(children) : setContent(null);
    isInView ? animate(opacity, 100, { duration: 150 }) : animate(opacity, 0);
  }, [isInView]);

  const upDirection = directions.find((d) => d.direction == "UP");
  const downDirection = directions.find((d) => d.direction == "DOWN");
  const leftDirection = directions.find((d) => d.direction == "LEFT");
  const rightDirection = directions.find((d) => d.direction == "RIGHT");

  const navigationClasses =
    "cursor-pointer text-sm flex flex-col items-center hover:!scale-110 hover:underline-offset-4 hover:underline hover:underline-dashed";

  return (
    <motion.div
      ref={scope}
      style={{ opacity }}
      className={`grid grid-cols-12 grid-rows-full h-full w-full p-4`}
      id={id}
    >
      {/* UP */}

      <div className="col-span-full">
        <div className="flex justify-center">
          {upDirection && (
            <motion.div
              initial={{ y: pageHeight / 2, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className={navigationClasses}
              onClick={() => onMove(upDirection)}
            >
              <div className="flex flex-col items-center text-center">
                {arrowUp}
                <p>{upDirection.label}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* LEFT */}
      <div className="row-span-6">
        <div className="h-full flex flex-col justify-center items-start">
          {leftDirection && (
            <motion.div
              initial={{ x: pageWidth / 2, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ duration: 1, delay: 2.5 }}
              className={navigationClasses}
              onClick={() => onMove(leftDirection)}
            >
              <div className="flex flex-col items-center text-center">
                {arrowLeft}
                <p>{leftDirection.label}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div ref={ref} className="col-span-10 row-span-6">
        <span>{content}</span>
      </div>

      {/* RIGHT */}
      <div className="row-span-6">
        <div className="h-full flex flex-col justify-center items-end">
          {rightDirection && (
            <motion.div
              initial={{ x: pageWidth / 2, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ duration: 1, delay: 2.5 }}
              className={navigationClasses}
              onClick={() => onMove(rightDirection)}
            >
              <div className="flex flex-col items-center text-center">
                {arrowRight}
                <p>{rightDirection.label}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* DOWN */}

      <div className="col-span-full flex flex-col justify-end">
        <div className="flex justify-center items-end">
          {downDirection && (
            <motion.div
              initial={{ y: pageHeight / 2, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className={navigationClasses}
              onClick={() => onMove(downDirection)}
            >
              <div className="flex flex-col items-center text-center">
                <p>{downDirection.label}</p>
                {arrowDown}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MovingPage;
