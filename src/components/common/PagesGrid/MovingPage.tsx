import {
  Variant,
  Variants,
  animate,
  motion,
  motionValue,
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
    className="w-20 h-20"
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
    className="w-20 h-20"
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
    className="w-20 h-20"
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
    className="w-20 h-20"
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
  onMove: (dir: Direction) => void;
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
  const opacity = motionValue(100);
  const [forceRenderContent, setForceRenderContent] = useState(0);

  useEffect(() => {
    isInView ? animate(opacity, 100, { duration: 150 }) : opacity.set(0);
    isInView && setForceRenderContent(() => forceRenderContent + 1);
  }, [isInView]);

  const upDirection = directions.find((d) => d.direction == "UP");
  const downDirection = directions.find((d) => d.direction == "DOWN");
  const leftDirection = directions.find((d) => d.direction == "LEFT");
  const rightDirection = directions.find((d) => d.direction == "RIGHT");

  const navigationClasses = "cursor-pointer text-sm hover:!scale-110";

  return (
    <motion.div
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
              onClick={() => onMove("UP")}
            >
              <div>
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
              onClick={() => onMove("LEFT")}
            >
              <div>
                {arrowLeft}
                <p>{leftDirection.label}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div ref={ref} className="col-span-10 row-span-6">
        <span key={forceRenderContent}>{children}</span>
      </div>

      {/* RIGHT */}
      <div className="row-span-6">
        <div className="h-full flex flex-col justify-center items-end">
          {rightDirection && (
            <motion.div
              initial={{ x: -pageWidth / 2, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ duration: 1, delay: 2.5 }}
              className={navigationClasses}
              onClick={() => onMove("RIGHT")}
            >
              {arrowRight}
              <p>{rightDirection.label}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* DOWN */}
      <div className="col-span-full flex flex-col justify-end">
        <div className="flex justify-center">
          {downDirection && (
            <motion.div
              initial={{ y: -pageHeight / 2, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ duration: 1, delay: 2.5 }}
              className={navigationClasses}
              onClick={() => onMove("DOWN")}
            >
              <p>{downDirection.label}</p>
              {arrowDown}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MovingPage;
