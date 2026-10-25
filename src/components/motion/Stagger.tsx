'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = 0.08,
  className = '',
}: StaggerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
