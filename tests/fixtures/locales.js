const supportedLocalesWithCurrency = [
  { lang: 'de', geo: 'at', name: 'Austria', expect: 'US$4.99/Monat' }, // currently returns USD instead of EURO
  { lang: 'nl', geo: 'be', name: 'Belgium', expect: 'US$4.99/maand' },
  { lang: 'en-US', geo: 'ca', name: 'Canada', expect: 'US$4.99/month' },
  { lang: 'de', geo: 'ch', name: 'Switzerland', expect: 'US$4.99/Monat' },
  { lang: 'de', geo: 'de', name: 'Germany', expect: 'US$4.99/Monat' },
  { lang: 'es-US', geo: 'es', name: 'Spain', expect: 'US$4.99/month' },
  { lang: 'fr', geo: 'fr', name: 'France', expect: 'US$4.99/mois' },
  { lang: 'en-US', geo: 'gb', name: 'UK', expect: 'US$4.99/month' }, // shouldn't this be in pounds?
  { lang: 'it', geo: 'it', name: 'Italy', expect: 'US$4.99 al mese' },
  { lang: 'en-US', geo: 'my', name: 'Malaysia', expect: 'US$4.99/month' },
  { lang: 'en-US', geo: 'nz', name: 'New Zealand', expect: 'US$4.99/month' },
  { lang: 'en-US', geo: 'sg', name: 'Singapore', expect: 'US$4.99/month' },
  { lang: 'en-US', geo: 'US', name: 'United States', expect: 'US$4.99/month' },
]

const supportedLocales = [
  { lang: 'de', geo: 'at', name: 'Austria' }, // currently returns USD instead of EURO
  { lang: 'nl', geo: 'be', name: 'Belgium' },
  { lang: 'en-US', geo: 'ca', name: 'Canada' },
  { lang: 'de', geo: 'ch', name: 'Switzerland' },
  { lang: 'de', geo: 'de', name: 'Germany' },
  { lang: 'es-US', geo: 'es', name: 'Spain' },
  { lang: 'fr', geo: 'fr', name: 'France' },
  { lang: 'en-US', geo: 'gb', name: 'UK' }, // shouldn't this be in pounds?
  { lang: 'it', geo: 'it', name: 'Italy' },
  { lang: 'en-US', geo: 'my', name: 'Malaysia' },
  { lang: 'en-US', geo: 'nz', name: 'New Zealand' },
  { lang: 'en-US', geo: 'sg', name: 'Singapore' },
  { lang: 'en-US', geo: 'US', name: 'United States' },
]

module.exports = {
  supportedLocales,
  supportedLocalesWithCurrency,
}
