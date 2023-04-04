import { Key, ReactNode, useEffect, useRef, useState } from "react";
import { TypeShuffle } from "./typeShuffle";

export type MatrixEffect =
  | "fx1"
  | "fx2"
  | "fx3"
  | "fx4"
  | "fx5"
  | "fx6"
  | undefined;

interface Props {
  id: Key;
  effect: MatrixEffect;
  children: ReactNode;
}

const MatrixElement = ({ id, effect, children }: Props) => {
  const [ts, setTs] = useState<TypeShuffle>();
  const element_id = `matrix-element-${id}`;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    console.log("matric element rendered");
    const textElement = document.getElementById(element_id);
    setTs(new TypeShuffle(textElement));
  }, []);

  useEffect(() => {
    ts && ts.trigger(effect);
    ts && setHidden(false);
  }, [ts]);

  return (
    <div id={element_id} hidden={hidden}>
      {children}
    </div>
  );
};

export default MatrixElement;
