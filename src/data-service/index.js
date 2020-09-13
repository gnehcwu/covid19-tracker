import getCountryFlag from './countryFlag'

const BASE_URL = 'https://corona-api.com/'

export const getAllCountries = async () => {
  const destination = `${BASE_URL}/countries`

  try {
    const res = await fetch(destination)
    const data = res.json()
    return data.map(item => {
      return {
        name: item.name,
        code: item.code,
        flag: getCountryFlag(item.code),
        lastUpdate: item.updated_at,
        confirmedToday: item.today.confirmed,
        confirmed: item.latest_data.confirmed,
        recovered: item.latest_data.recovered,
        deaths: item.latest_data.detahs,
        deathRate: item.latest_data.calculated.death_rate
      }
    })
  } catch (error) {
    return []
  }
}

export const getGlobalTimeline = async () => {
  const destination = `${BASE_URL}/tmeline`;

  try {
    const res = await fetch(destination)
    const { data: timeline } = res.json();
    return timeline;
  } catch (error) {
    return [];
  }
}

export const getTimelineByCountry = async (slug) => {
  const destination = `${BASE_URL}/countries/${slug}`

  try {
    const res = await fetch(destination)
    const { data: { timeline } } = res.json()
    return timeline
  } catch (error) {
    return {}
  }
}
