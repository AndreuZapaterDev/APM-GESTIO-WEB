import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  Users,
  BarChart3,
  Landmark,
  HeartHandshake,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Quote,
} from 'lucide-react'
import logo from '../assets/APMGESTIO_LOGO.png'
import { Reveal, Divider, SectionHeading, containerVariants, itemVariants } from '../components/Reveal'

const serviceIcons = [FileText, Users, BarChart3]
const serviceSlugs = ['fiscal', 'laboral', 'contable']
const rateIcons = [Landmark, Landmark]

interface ServiceItem {
  title: string
}

interface RateItem {
  title: string
  description: string
}

function Home() {
  const { t } = useTranslation()

  const introParagraphs = t('home.intro', { returnObjects: true }) as unknown as string[]
  const serviceItems = t('home.services.items', { returnObjects: true }) as unknown as ServiceItem[]
  const rateItems = t('home.rates.items', { returnObjects: true }) as unknown as RateItem[]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-b-4xl bg-accent px-5 py-12 text-white lg:rounded-b-[3rem] lg:px-0 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative flex flex-col items-center gap-5 text-center"
        >
          <motion.img
            variants={itemVariants}
            src={logo}
            alt="APM Gestión"
            className="h-20 w-auto brightness-0 invert lg:h-28"
          />
          <motion.h1
            variants={itemVariants}
            className="text-[36px] font-medium tracking-[-1.68px] lg:text-[64px]"
          >
            {t('home.title')}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg font-semibold tracking-wide text-white/90">
            {t('home.tagline')}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contacto"
              className="rounded-lg bg-white px-5 py-2.5 font-semibold text-neutral-950 transition-transform hover:scale-[1.03]"
            >
              {t('home.hero.ctaPrimary')}
            </a>
            <Link
              to="/quienes-somos"
              className="rounded-lg border border-white/30 px-5 py-2.5 font-semibold text-white transition-colors hover:border-white"
            >
              {t('home.hero.ctaSecondary')}
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-4 flex flex-wrap items-center justify-center gap-8 border-t border-white/30 pt-4"
          >
            {serviceItems.map((service, index) => {
              const Icon = serviceIcons[index] ?? FileText
              return (
                <Link
                  key={service.title}
                  to={`/servicios/${serviceSlugs[index]}`}
                  className="flex items-center gap-2 text-lg font-semibold text-white/80 no-underline transition-colors hover:text-white"
                >
                  <Icon size={26} strokeWidth={1.75} />
                  {service.title}
                </Link>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Bienvenida */}
      <Reveal className="px-5 py-16 text-center lg:px-0">
        <motion.div
          variants={itemVariants}
          className="mx-auto flex max-w-2xl flex-col gap-4 text-neutral-600 [&_strong]:font-bold [&_strong]:text-accent"
        >
          {introParagraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </motion.div>
      </Reveal>

      <Divider />

      {/* Nuestros servicios */}
      <Reveal className="px-5 py-16 text-center lg:px-0">
        <div className="mx-auto max-w-5xl rounded-3xl bg-neutral-50 px-6 py-14 lg:px-16">
          <SectionHeading>{t('home.services.heading')}</SectionHeading>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
            {serviceItems.map((service, index) => {
              const Icon = serviceIcons[index] ?? FileText
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative flex flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <span className="absolute top-2 right-4 text-5xl font-bold text-neutral-100 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={26} strokeWidth={1.75} />
                  </div>
                  <h3 className="relative text-lg font-semibold text-neutral-950">{service.title}</h3>
                  <Link
                    to={`/servicios/${serviceSlugs[index]}`}
                    className="group relative inline-flex items-center gap-1 text-sm font-medium text-accent"
                  >
                    {t('home.services.readMore')}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Reveal>

      <Divider />

      {/* Tarifas y tablas */}
      <Reveal className="px-5 py-16 text-center lg:px-0">
        <SectionHeading>{t('home.rates.heading')}</SectionHeading>
        <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-2">
          {rateItems.map((rate, index) => {
            const Icon = rateIcons[index] ?? Landmark
            return (
              <motion.div
                key={rate.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex flex-col items-start gap-3 rounded-xl border border-border border-l-4 border-l-accent bg-white p-8 text-left shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-950">{rate.title}</h3>
                <p className="text-neutral-600">{rate.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Reveal>

      <Divider />

      {/* Profesionalidad y valor humano */}
      <Reveal className="px-5 py-16 text-center lg:px-0">
        <div className="mx-auto max-w-5xl rounded-3xl bg-neutral-50 px-6 py-14 lg:px-16">
          <SectionHeading>{t('home.value.heading')}</SectionHeading>
          <motion.div variants={itemVariants} className="relative mx-auto max-w-2xl">
            <Quote size={40} strokeWidth={1.5} className="mx-auto mb-2 text-accent/30" />
            <p className="text-xl leading-relaxed text-neutral-700 italic lg:text-2xl">
              {t('home.value.description')}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-accent">
              <HeartHandshake size={22} strokeWidth={1.75} />
            </div>
          </motion.div>
        </div>
      </Reveal>

      <Divider />

      {/* Calendario */}
      <Reveal className="px-5 py-16 text-center lg:px-0">
        <SectionHeading>{t('home.calendar.heading')}</SectionHeading>
        <motion.div
          variants={itemVariants}
          className="mx-auto flex h-48 max-w-3xl flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-neutral-50 text-neutral-400"
        >
          <CalendarDays size={32} strokeWidth={1.5} />
          <span>{t('home.calendar.placeholder')}</span>
        </motion.div>
      </Reveal>

      <Divider />

      {/* Datos de contacto */}
      <Reveal className="px-5 py-16 lg:px-0">
        <motion.div
          variants={itemVariants}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl bg-neutral-950 px-8 py-12 text-center text-white lg:flex-row lg:justify-between lg:text-left"
        >
          <div>
            <p className="text-lg font-semibold tracking-wide">APM GESTIÓ</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-neutral-300 lg:justify-start">
              <MapPin size={16} />
              <span>Lluís Companys Nº 2, Lleida 25003</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-stretch">
            <a
              href="tel:+34973230643"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 font-medium transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone size={16} />
              973 230 643
            </a>
            <a
              href="mailto:info@apmgestio.es"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 font-medium transition-colors hover:border-white hover:bg-white/10"
            >
              <Mail size={16} />
              info@apmgestio.es
            </a>
          </div>
        </motion.div>
      </Reveal>

      <Divider />

      {/* Solicitud de contacto */}
      <Reveal id="contacto" className="px-5 py-16 lg:px-0">
        <SectionHeading>{t('home.contact.heading')}</SectionHeading>
        <motion.form
          variants={itemVariants}
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto flex max-w-md flex-col gap-4 rounded-2xl border border-border bg-white p-8 shadow-sm"
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
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
          >
            {t('home.contact.submit')}
            <ArrowRight size={18} />
          </motion.button>
        </motion.form>
      </Reveal>
    </>
  )
}

export default Home
