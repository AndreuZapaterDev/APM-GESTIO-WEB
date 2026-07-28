import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import oficina from '../assets/oficina.jpg'
import { Reveal, itemVariants } from '../components/Reveal'

function QuienesSomos() {
  const { t } = useTranslation()

  const paragraphs = t('quienesSomos.paragraphs', { returnObjects: true }) as unknown as string[]

  return (
    <>
      <Reveal className="flex flex-col items-center gap-4 px-5 py-16 text-center lg:px-0 lg:py-20">
        <motion.h1
          variants={itemVariants}
          className="text-[36px] font-medium tracking-[-1.68px] text-neutral-950 lg:text-[56px]"
        >
          {t('quienesSomos.title')}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg font-semibold tracking-wide text-accent">
          {t('quienesSomos.tagline')}
        </motion.p>
      </Reveal>

      <Reveal className="px-5 pb-20 lg:px-0">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <motion.div variants={itemVariants} className="flex flex-col gap-4 text-left text-neutral-600">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
          <motion.img
            variants={itemVariants}
            src={oficina}
            alt={t('quienesSomos.title')}
            className="aspect-video w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </Reveal>
    </>
  )
}

export default QuienesSomos
