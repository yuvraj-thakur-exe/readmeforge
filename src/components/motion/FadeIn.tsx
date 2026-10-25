'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

export interface FadeInProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  className = '',
  direction = 'up',
  ...props
}: FadeInProps) {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 16, x: 0 };
      case 'down':
        return { y: -16, x: 0 };
      case 'left':
        return { x: 16, y: 0 };
      case 'right':
        return { x: -16, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...offset }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
