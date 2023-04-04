import { Key, useEffect, useState } from "react";
import MatrixElement from "../common/MatrixElement/MatrixElement";
import { PageProps } from "./common/PageProps";

const About = ({ id }: PageProps) => {
  const [renderInner, setRenderInner] = useState(false);

  useEffect(() => {
    setTimeout(() => setRenderInner(true), 500);
  }, []);

  return (
    <div>
      <MatrixElement id={`${id}`} effect="fx6">
        <div>ABOUT PAGE</div>
      </MatrixElement>

      {renderInner && (
        <MatrixElement id={`${id}-inner`} effect="fx6">
          <div className="text-sm p-2">More text about me...</div>
        </MatrixElement>
      )}
    </div>
  );
};

export default About;
