import { motion } from "framer-motion";
import MatrixElement from "../common/MatrixElement/MatrixElement";
import { PageProps } from "./common/PageProps";

const Index = ({ id }: PageProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <MatrixElement id={`${id}`} effect="fx1">
        <h1>
          Hello my name is <b>Dani Aziz</b>
        </h1>
        <p className="text-base">I am a full stack web developper.</p>
        <motion.div
          className="border-2 border-green-600 border-dashed rounded-md text-sm w-fit mx-auto p-1 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ delay: 1 }}
        >
          <div className="flex">
            <p className="uppercase font-bold mr-2"> Status: </p>
            <p>Actively looking for work</p>
          </div>
        </motion.div>
      </MatrixElement>
    </div>
  );
};

export default Index;
