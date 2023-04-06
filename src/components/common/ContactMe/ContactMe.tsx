import { Variants, motion } from "framer-motion";

interface Props {
  x: number;
  y: number;
  x2: number;
  y2: number;
  variant: "1" | "2";
}

const ContactMe = ({ x, y, x2, y2, variant }: Props) => {
  return <motion.div>contact me</motion.div>;
};

export default ContactMe;
