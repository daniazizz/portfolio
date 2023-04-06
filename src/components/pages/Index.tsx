import { motion } from "framer-motion";
import MatrixElement from "../common/MatrixElement/MatrixElement";
import { PageProps } from "./common/PageProps";

const Index = ({ id }: PageProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center text-center">
      <MatrixElement id={`${id}`} effect="fx1">
        <h1 className="text-lg lg:text-4xl">
          Hello my name is <b>Dani Aziz</b>
        </h1>
        <p className="text-xs lg:text-base">
          I am a full stack web developper.
        </p>
        <motion.div
          className="border-2 border-green-600 border-dashed rounded-md text-xs lg:text-sm w-fit mx-auto p-1 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ delay: 1 }}
        >
          <div className="flex">
            <p className="uppercase font-bold mr-2"> Status: </p>
            <p>Open for new oppertuneties</p>
          </div>
        </motion.div>
      </MatrixElement>
    </div>
  );
};

export default Index;
