import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { itemVariants } from './Reveal'

export function ContactForm({ className }: { className?: string }) {
  const { t } = useTranslation()

  return (
    <motion.form
      variants={itemVariants}
      onSubmit={(event) => event.preventDefault()}
      className={className ?? 'flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-soft'}
    >
      <label className="flex flex-col gap-1 text-left text-sm font-medium text-neutral-950">
        {t('home.contact.name')}
        <input
          type="text"
          name="name"
          required
          className="rounded-lg border border-border bg-neutral-50 px-3 py-2.5 transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-left text-sm font-medium text-neutral-950">
        {t('home.contact.email')}
        <input
          type="email"
          name="email"
          required
          className="rounded-lg border border-border bg-neutral-50 px-3 py-2.5 transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-left text-sm font-medium text-neutral-950">
        {t('home.contact.phone')}
        <input
          type="tel"
          name="phone"
          className="rounded-lg border border-border bg-neutral-50 px-3 py-2.5 transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-left text-sm font-medium text-neutral-950">
        {t('home.contact.message')}
        <textarea
          name="message"
          rows={4}
          required
          className="resize-none rounded-lg border border-border bg-neutral-50 px-3 py-2.5 transition-shadow focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </label>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 font-semibold text-white shadow-soft transition-colors hover:bg-accent/90"
      >
        {t('home.contact.submit')}
        <ArrowRight size={18} />
      </motion.button>
    </motion.form>
  )
}
