import { Key, useEffect, useState } from "react";
import MatrixElement from "../common/MatrixElement/MatrixElement";
import { PageProps } from "./common/PageProps";

const Dummy1 = ({ id }: PageProps) => {
  return (
    <div className="text-center">
      <MatrixElement id={`${id}`} effect="fx6">
        <h1 className="font-bold text-2xl">
          Veniam non consequat sit do dolor deserunt anim do sunt.
        </h1>
      </MatrixElement>

      <MatrixElement id={`${id}-inner`} effect="fx3" delay={1250}>
        <div className="text-sm">
          Aliquip quis ipsum tempor laborum exercitation. Veniam dolor ipsum
          cillum tempor eu culpa veniam officia enim in non consequat. Qui
          dolore ipsum excepteur labore enim voluptate magna ullamco ea elit.
          Incididunt irure dolor amet labore consequat non sit anim ad
          consectetur Lorem labore. Dolor quis ea adipisicing amet aliquip irure
          dolor deserunt in laboris incididunt mollit ullamco.
        </div>
      </MatrixElement>
    </div>
  );
};

export default Dummy1;
