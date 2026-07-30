import { useTranslation } from 'react-i18next'

function Herramientas() {
  const { t } = useTranslation()

  return (
    <section className="flex flex-grow flex-col items-center justify-center gap-[18px] px-5 pt-8 pb-6 lg:gap-[25px] lg:p-0">
      <h1 className="my-5 text-[36px] font-medium tracking-[-1.68px] text-neutral-950 lg:my-8 lg:text-[56px]">
        {t('herramientas.title')}
      </h1>
      <p>{t('herramientas.subtitle')}</p>
    </section>
  )
}
export default Herramientas
