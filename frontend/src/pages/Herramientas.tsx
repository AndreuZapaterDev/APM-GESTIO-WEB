import { useTranslation } from 'react-i18next'

function Herramientas() {
  const { t } = useTranslation()

  return (
    <section id="center">
      <h1>{t('herramientas.title')}</h1>
      <p>{t('herramientas.subtitle')}</p>
    </section>
  )
}

export default Herramientas
