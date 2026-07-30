export type CalendarRule =
  | { kind: 'quarterly'; days: [number, number, number, number] }
  | { kind: 'annual'; month: number; day: number }
  | { kind: 'monthlyLastDay' }

export interface FiscalObligation {
  id: string
  rule: CalendarRule
}

// Deadline months for the quarterly rule: Q1 (Apr), Q2 (Jul), Q3 (Oct), Q4 (Jan of the following year).
const QUARTER_DEADLINE_MONTHS = [4, 7, 10, 1] as const

export const fiscalObligations: FiscalObligation[] = [
  { id: 'iva', rule: { kind: 'quarterly', days: [20, 20, 20, 30] } },
  { id: 'retenciones', rule: { kind: 'quarterly', days: [20, 20, 20, 20] } },
  { id: 'pagoFraccionado', rule: { kind: 'quarterly', days: [20, 20, 20, 30] } },
  { id: 'resumenIva', rule: { kind: 'annual', month: 1, day: 30 } },
  { id: 'sociedades', rule: { kind: 'annual', month: 7, day: 25 } },
  { id: 'segurosSociales', rule: { kind: 'monthlyLastDay' } },
]

function lastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getNextOccurrence(rule: CalendarRule, from: Date): Date {
  const today = startOfDay(from)
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1)

  for (let i = 0; i < 16; i++) {
    const cursor = new Date(start.getFullYear(), start.getMonth() + i, 1)
    const year = cursor.getFullYear()
    const month = cursor.getMonth() + 1

    let day: number | null = null
    if (rule.kind === 'monthlyLastDay') {
      day = lastDayOfMonth(year, month)
    } else if (rule.kind === 'annual' && month === rule.month) {
      day = rule.day
    } else if (rule.kind === 'quarterly') {
      const quarterIndex = QUARTER_DEADLINE_MONTHS.indexOf(month as (typeof QUARTER_DEADLINE_MONTHS)[number])
      if (quarterIndex !== -1) day = rule.days[quarterIndex]
    }

    if (day !== null) {
      const candidate = new Date(year, month - 1, day)
      if (candidate.getTime() >= today.getTime()) return candidate
    }
  }

  return today
}
