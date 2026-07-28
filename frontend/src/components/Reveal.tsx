import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export const listContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

export function Reveal({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto h-0.5 w-full origin-center bg-accent"
    />
  )
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center">
      <h2 className="text-2xl font-medium text-neutral-950 lg:text-3xl">{children}</h2>
      <span className="mt-3 h-1 w-12 rounded-full bg-accent" />
    </motion.div>
  )
}
