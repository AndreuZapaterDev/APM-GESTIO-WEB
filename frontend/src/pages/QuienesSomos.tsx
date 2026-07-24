import { useTranslation } from 'react-i18next'

function QuienesSomos() {
  const { t } = useTranslation()

  return (
    <section id="center">
      <h1>{t('quienesSomos.title')}</h1>
      <p>{t('quienesSomos.subtitle')}</p>
    </section>
  )
}

export default QuienesSomos
