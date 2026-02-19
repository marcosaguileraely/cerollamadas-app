/**
 * This file may contain code that uses generative AI for code assistance, unit testing and/or entire functions.
 * The generative model(s) used may be a combination of GitHub Copilot, OpenAI ChatGPT or others.
 */

const companies = [
  {
    category: 'telco',
    name: 'Claro Colombia',
    description: 'Proveedor de servicios móviles y telecomunicaciones',
    country: 'co',
    emails: ['consumidor@claro.com.co', 'proteccion.datos@claro.com.co'],
    privacyDisclaimerUrl: 'https://www.claro.com.co/personas/privacidad',
  },
  {
    category: 'telco',
    name: 'Movistar Colombia',
    description: 'Proveedor de servicios móviles',
    country: 'co',
    emails: ['atencion.cliente@movistar.co', 'proteccion.datos@movistar.co'],
    privacyDisclaimerUrl: 'https://www.movistar.co/privacidad',
  },
  {
    category: 'telco',
    name: 'Tigo Colombia',
    description: 'Proveedor de servicios móviles',
    country: 'co',
    emails: ['atencion@tigo.com.co', 'datos@tigo.com.co'],
    privacyDisclaimerUrl: 'https://www.tigo.com.co/privacidad',
  },
  {
    category: 'bank',
    name: 'Bancolombia',
    description: 'Entidad financiera',
    country: 'co',
    emails: ['proteccion.datos@bancolombia.com.co'],
    privacyDisclaimerUrl: 'https://www.bancolombia.com/privacidad',
  },
  {
    category: 'bank',
    name: 'Davivienda',
    description: 'Entidad financiera',
    country: 'co',
    emails: ['proteccion.datos@davivienda.com'],
    privacyDisclaimerUrl: 'https://www.davivienda.com/privacidad',
  },
]

const COUNTRY_CO = 'co'
const MAX_SELECTION = 5

const filterByCountry = (list, country) =>
  list.filter((c) => c.country === country)

const getCompaniesForCountry = (country = COUNTRY_CO) =>
  filterByCountry(companies, country)

module.exports = { companies, getCompaniesForCountry, COUNTRY_CO, MAX_SELECTION }
