import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useGA4React } from 'ga-4-react'

export const GoogleAnalyticsReporter = () => {
  const location = useLocation()
  const ga4 = useGA4React()

  useEffect(() => {
    if (!ga4) return
    ga4.pageview(`${location.pathname}${location.search}`)
  }, [ga4, location.pathname, location.search])

  return null
}
