import { useTranslation } from 'react-i18next'

function Servicios() {
  const { t } = useTranslation()

  return (
    <section id="center">
      <h1>{t('servicios.title')}</h1>
      <p>{t('servicios.subtitle')}</p>
    </section>
  )
}

export default Servicios
