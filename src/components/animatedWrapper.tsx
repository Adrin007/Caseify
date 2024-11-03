/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, MotionProps } from "framer-motion";

interface AnimatedWrapperProps extends Omit<MotionProps, 'children'> {
    children: React.ReactNode;
    initial?: { [key: string]: unknown };
    whileInView?: { [key: string]: unknown };
    transition?: { duration?: number; ease?: string; delay?: number };
    viewport?: { once?: boolean; amount?: number };
}
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
    children,
    initial = { opacity: 0, y: 50 },
    whileInView = { opacity: 1, y: 0 },
    transition = { duration: 0.8, ease: "easeOut", delay: 0 },
    viewport = { once: false, amount: 0.2 },
    ...rest
}) => {
    return (
        <motion.div
            initial={initial}
            whileInView={whileInView}
            transition={transition}
            viewport={viewport}
            {...rest}
            className="motion-wrapper"
        >
            {children}
        </motion.div>
    );
};

export default AnimatedWrapper