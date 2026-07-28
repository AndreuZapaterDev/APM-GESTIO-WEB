import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FileText, Check } from 'lucide-react'
import asesoria from '../../assets/asesoria.jpg'
import { Reveal, Divider, itemVariants, listContainerVariants } from '../../components/Reveal'

function Fiscal() {
  const { t } = useTranslation()
  const items = t('servicios.fiscal.items', { returnObjects: true }) as unknown as string[]

  return (
    <>
      <Reveal className="relative flex flex-col items-center gap-4 overflow-hidden px-5 py-16 text-center lg:px-0 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute top-8 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          variants={itemVariants}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"
        >
          <FileText size={28} strokeWidth={1.75} />
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="relative text-[36px] font-medium tracking-[-1.68px] text-neutral-950 lg:text-[56px]"
        >
          {t('servicios.fiscal.title')}
        </motion.h1>
        <motion.p variants={itemVariants} className="relative text-lg font-semibold tracking-wide text-accent">
          {t('servicios.fiscal.tagline')}
        </motion.p>
      </Reveal>

      <Divider />

      <Reveal className="px-5 py-16 lg:px-0">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <motion.ul
            variants={listContainerVariants}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-8 text-left text-neutral-600 shadow-sm lg:p-10"
          >
            {items.map((item) => (
              <motion.li key={item} variants={itemVariants} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.img
            variants={itemVariants}
            src={asesoria}
            alt={t('servicios.fiscal.title')}
            className="aspect-video w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </Reveal>
    </>
  )
}

export default Fiscal
