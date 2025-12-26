import { motion } from "framer-motion";
import Image from "next/image";

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2"
    >
      <span className="block dark:hidden">
        <Image
          src="/vizyn-dark.svg"
          alt="Vizyn"
          width={100}
          height={20}
          priority
        />
      </span>
      <span className="hidden dark:block">
        <Image src="/vizyn.svg" alt="Vizyn" width={100} height={20} priority />
      </span>
    </motion.div>
  );
};

export default Logo;
