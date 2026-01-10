import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function DashboardPageTransition({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
                duration: 0.25,
                ease: 'easeOut',
            }}
            className="h-full"
        >
            {children}
        </motion.div>
    );
}
