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
  delay?: number;
}

const MatrixElement = ({ id, effect, children, delay }: Props) => {
  const [typeshuffle, setTypeshuffle] = useState<TypeShuffle>();
  const element_id = `matrix-element-${id}`;
  const [hidden, setHidden] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const textElement = document.getElementById(element_id);
    setTypeshuffle(new TypeShuffle(textElement));

    if (delay) {
      setTimeout(() => {
        setRender(true);
      }, delay);
    } else {
      setRender(true);
    }
  }, []);

  useEffect(() => {
    render && typeshuffle && typeshuffle.trigger(effect);
    typeshuffle && render && setHidden(false);
  }, [render, typeshuffle]);

  return (
    <div id={element_id} style={{ opacity: hidden ? 0 : 1 }}>
      {children}
    </div>
  );
};

export default MatrixElement;
