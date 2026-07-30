import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ReceiptEuro, FileText, Landmark, Building2, ClipboardList, Users } from 'lucide-react'
import { itemVariants, listContainerVariants } from './Reveal'
import { fiscalObligations, getNextOccurrence } from '../data/fiscalCalendar'

const icons: Record<string, typeof ReceiptEuro> = {
  iva: ReceiptEuro,
  retenciones: FileText,
  pagoFraccionado: Landmark,
  resumenIva: ClipboardList,
  sociedades: Building2,
  segurosSociales: Users,
}

interface ObligationText {
  title: string
  description: string
}

export function FiscalCalendar() {
  const { t, i18n } = useTranslation()
  const items = t('home.calendar.items', { returnObjects: true }) as unknown as ObligationText[]

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(i18n.resolvedLanguage, { day: 'numeric', month: 'long' }),
    [i18n.resolvedLanguage],
  )

  const deadlines = useMemo(() => {
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    return fiscalObligations
      .map((obligation, index) => {
        const nextDate = getNextOccurrence(obligation.rule, today)
        const daysRemaining = Math.round((nextDate.getTime() - startOfToday.getTime()) / 86_400_000)
        return { ...obligation, ...items[index], nextDate, daysRemaining }
      })
      .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime())
  }, [items])

  return (
    <motion.div variants={listContainerVariants} className="mx-auto grid max-w-4xl gap-6 text-left sm:grid-cols-2">
      {deadlines.map((deadline) => {
        const Icon = icons[deadline.id] ?? FileText
        const dueLabel =
          deadline.daysRemaining <= 0
            ? t('home.calendar.today')
            : deadline.daysRemaining === 1
              ? t('home.calendar.tomorrow')
              : t('home.calendar.inDays', { count: deadline.daysRemaining })

        return (
          <motion.div
            key={deadline.id}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-soft transition-shadow hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                {dueLabel}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-950">{deadline.title}</h3>
            <p className="text-sm text-neutral-600">{deadline.description}</p>
            <p className="mt-auto text-sm font-semibold text-accent capitalize">
              {dateFormatter.format(deadline.nextDate)}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
