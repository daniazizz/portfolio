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

  return (
    <motion.div
      style={{ opacity }}
      className={`grid grid-cols-12 grid-rows-full h-full w-full p-4`}
      id={id}
    >
      {/* CONTENT */}
      <div ref={ref} className="col-span-12 row-span-6">
        <span key={forceRenderContent}>{children}</span>
      </div>
    </motion.div>
  );
};

export default MovingPage;
